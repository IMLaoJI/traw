import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from '@radix-ui/react-icons';
import * as React from 'react';
import { DMCheckboxItem, DMContent, DMRadioItem } from 'components/Primitives/DropdownMenu';
import { styled } from 'stitches.config';

import { useTldrawApp } from 'hooks/useTldrawApp';
import { defaultTextStyle, fills, strokes } from 'state/shapes/shared';
import {
  AlignStyle,
  ColorStyle,
  DashStyle,
  FontStyle,
  ShapeStyles,
  SizeStyle,
  TDShapeType,
  TDSnapshot,
} from '@tldraw/tldraw';
import { DashDrawIcon } from 'icons/DashDrawIcon';
import { DashSolidIcon } from 'icons/DashSolidIcon';
import { DashDashedIcon } from 'icons/DashDashedIcon';
import { DashDottedIcon } from 'icons/DashDottedIcon';
import { SizeSmallIcon } from 'icons/SizeSmallIcon';
import { SizeMediumIcon } from 'icons/SizeMediumIcon';
import { SizeLargeIcon } from 'icons/SizeLargeIcon';
import { CircleIcon } from 'icons/CircleIcon';
import { preventEvent } from 'utils/preventEvent';
import { breakpoints } from 'utils/breakpoints';
import { Divider } from 'components/Primitives/Divider';
import { ToolButton } from 'components/Primitives/ToolButton';

const currentStyleSelector = (s: TDSnapshot) => s.appState.currentStyle;
const selectedIdsSelector = (s: TDSnapshot) => s.document.pageStates[s.appState.currentPageId].selectedIds;

const STYLE_KEYS = Object.keys(defaultTextStyle) as (keyof ShapeStyles)[];

const DASH_ICONS = {
  [DashStyle.Draw]: <DashDrawIcon />,
  [DashStyle.Solid]: <DashSolidIcon />,
  [DashStyle.Dashed]: <DashDashedIcon />,
  [DashStyle.Dotted]: <DashDottedIcon />,
};

const SIZE_ICONS = {
  [SizeStyle.Small]: <SizeSmallIcon />,
  [SizeStyle.Medium]: <SizeMediumIcon />,
  [SizeStyle.Large]: <SizeLargeIcon />,
};

const ALIGN_ICONS = {
  [AlignStyle.Start]: <TextAlignLeftIcon />,
  [AlignStyle.Middle]: <TextAlignCenterIcon />,
  [AlignStyle.End]: <TextAlignRightIcon />,
  [AlignStyle.Justify]: <TextAlignJustifyIcon />,
};

const themeSelector = (s: TDSnapshot) => (s.settings.isDarkMode ? 'dark' : 'light');

const keepOpenSelector = (s: TDSnapshot) => s.settings.keepStyleMenuOpen;

const optionsSelector = (s: TDSnapshot) => {
  const { activeTool, currentPageId: pageId } = s.appState;
  switch (activeTool) {
    case 'select': {
      const page = s.document.pages[pageId];
      let hasText = false;
      let hasLabel = false;
      for (const id of s.document.pageStates[pageId].selectedIds) {
        if (!page.shapes[id]) continue;
        if ('text' in page.shapes[id]) hasText = true;
        if ('label' in page.shapes[id]) hasLabel = true;
      }
      return hasText ? 'text' : hasLabel ? 'label' : '';
    }
    case TDShapeType.Text: {
      return 'text';
    }
    case TDShapeType.Rectangle: {
      return 'label';
    }
    case TDShapeType.Ellipse: {
      return 'label';
    }
    case TDShapeType.Triangle: {
      return 'label';
    }
    case TDShapeType.Arrow: {
      return 'label';
    }
    case TDShapeType.Line: {
      return 'label';
    }
  }

  return false;
};

export const StyleMenu = React.memo(function ColorMenu() {
  const app = useTldrawApp();

  const theme = app.useStore(themeSelector);

  const keepOpen = app.useStore(keepOpenSelector);

  const options = app.useStore(optionsSelector);

  const currentStyle = app.useStore(currentStyleSelector);

  const selectedIds = app.useStore(selectedIdsSelector);

  const [displayedStyle, setDisplayedStyle] = React.useState(currentStyle);

  const rDisplayedStyle = React.useRef(currentStyle);

  React.useEffect(() => {
    const {
      appState: { currentStyle },
      page,
      selectedIds,
    } = app;
    let commonStyle = {} as ShapeStyles;
    if (selectedIds.length <= 0) {
      commonStyle = currentStyle;
    } else {
      const overrides = new Set<string>([]);
      app.selectedIds
        .map((id) => page.shapes[id])
        .forEach((shape) => {
          STYLE_KEYS.forEach((key) => {
            if (overrides.has(key)) return;
            if (commonStyle[key] === undefined) {
              // @ts-ignore
              commonStyle[key] = shape.style[key];
            } else {
              if (commonStyle[key] === shape.style[key]) return;
              // @ts-ignore
              commonStyle[key] = shape.style[key];
              overrides.add(key);
            }
          });
        });
    }
    // Until we can work out the correct logic for deciding whether or not to
    // update the selected style, do a string comparison. Yuck!
    if (JSON.stringify(commonStyle) !== JSON.stringify(rDisplayedStyle.current)) {
      rDisplayedStyle.current = commonStyle;
      setDisplayedStyle(commonStyle);
    }
  }, [currentStyle, selectedIds, app]);

  const handleToggleKeepOpen = React.useCallback(
    (checked: boolean | 'indeterminate') => {
      app.setSetting('keepStyleMenuOpen', checked === true);
    },
    [app],
  );

  const handleToggleFilled = React.useCallback(
    (checked: boolean | 'indeterminate') => {
      app.style({ isFilled: checked === true });
    },
    [app],
  );

  const handleDashChange = React.useCallback(
    (value: string) => {
      app.style({ dash: value as DashStyle });
    },
    [app],
  );

  const handleSizeChange = React.useCallback(
    (value: string) => {
      app.style({ size: value as SizeStyle });
    },
    [app],
  );

  const handleFontChange = React.useCallback(
    (value: string) => {
      app.style({ font: value as FontStyle });
    },
    [app],
  );

  const handleTextAlignChange = React.useCallback(
    (value: string) => {
      app.style({ textAlign: value as AlignStyle });
    },
    [app],
  );

  const handleMenuOpenChange = React.useCallback(
    (open: boolean) => {
      app.setMenuOpen(open);
    },
    [app],
  );

  return (
    <DropdownMenu.Root dir="ltr" onOpenChange={handleMenuOpenChange} open={keepOpen ? true : undefined} modal={false}>
      <DropdownMenu.Trigger asChild id="TD-Styles">
        {/* <div className="rounded-full px-1 py-1 bg-white"> */}
        <ToolButton variant="text">Styles</ToolButton>
        {/* </div> */}
      </DropdownMenu.Trigger>
      <DMContent id="language-menu" side="bottom" align="end" sideOffset={10} alignOffset={0}>
        <StyledRow variant="tall" id="TD-Styles-Color-Container">
          <span>Color</span>
          <ColorGrid>
            {Object.keys(strokes.light).map((style: string) => (
              <DropdownMenu.Item key={style} onSelect={preventEvent} asChild id={`TD-Styles-Color-Swatch-${style}`}>
                <ToolButton
                  variant="icon"
                  isActive={displayedStyle.color === style}
                  onClick={() => app.style({ color: style as ColorStyle })}
                >
                  <CircleIcon
                    size={18}
                    strokeWidth={2.5}
                    fill={displayedStyle.isFilled ? fills[theme][style as ColorStyle] : 'transparent'}
                    stroke={strokes.light[style as ColorStyle]}
                  />
                </ToolButton>
              </DropdownMenu.Item>
            ))}
          </ColorGrid>
        </StyledRow>
        <DMCheckboxItem
          variant="styleMenu"
          checked={!!displayedStyle.isFilled}
          onCheckedChange={handleToggleFilled}
          id="TD-Styles-Fill"
        >
          Fill
        </DMCheckboxItem>
        <StyledRow id="TD-Styles-Dash-Container">
          Dash
          <StyledGroup dir="ltr" value={displayedStyle.dash} onValueChange={handleDashChange}>
            {Object.values(DashStyle).map((style) => (
              <DMRadioItem
                key={style}
                isActive={style === displayedStyle.dash}
                value={style}
                onSelect={preventEvent}
                bp={breakpoints}
                id={`TD-Styles-Dash-${style}`}
              >
                {DASH_ICONS[style as DashStyle]}
              </DMRadioItem>
            ))}
          </StyledGroup>
        </StyledRow>
        <StyledRow id="TD-Styles-Size-Container">
          Size
          <StyledGroup dir="ltr" value={displayedStyle.size} onValueChange={handleSizeChange}>
            {Object.values(SizeStyle).map((sizeStyle) => (
              <DMRadioItem
                key={sizeStyle}
                isActive={sizeStyle === displayedStyle.size}
                value={sizeStyle}
                onSelect={preventEvent}
                bp={breakpoints}
                id={`TD-Styles-Dash-${sizeStyle}`}
              >
                {SIZE_ICONS[sizeStyle as SizeStyle]}
              </DMRadioItem>
            ))}
          </StyledGroup>
        </StyledRow>
        {(options === 'text' || options === 'label') && (
          <>
            <Divider />
            <StyledRow id="TD-Styles-Font-Container">
              Font
              <StyledGroup dir="ltr" value={displayedStyle.font} onValueChange={handleFontChange}>
                {Object.values(FontStyle).map((fontStyle) => (
                  <DMRadioItem
                    key={fontStyle}
                    isActive={fontStyle === displayedStyle.font}
                    value={fontStyle}
                    onSelect={preventEvent}
                    bp={breakpoints}
                    id={`TD-Styles-Font-${fontStyle}`}
                  >
                    <FontIcon fontStyle={fontStyle}>Aa</FontIcon>
                  </DMRadioItem>
                ))}
              </StyledGroup>
            </StyledRow>
            {options === 'text' && (
              <StyledRow id="TD-Styles-Align-Container">
                Align
                <StyledGroup dir="ltr" value={displayedStyle.textAlign} onValueChange={handleTextAlignChange}>
                  {Object.values(AlignStyle).map((style) => (
                    <DMRadioItem
                      key={style}
                      isActive={style === displayedStyle.textAlign}
                      value={style}
                      onSelect={preventEvent}
                      bp={breakpoints}
                      id={`TD-Styles-Align-${style}`}
                    >
                      {ALIGN_ICONS[style]}
                    </DMRadioItem>
                  ))}
                </StyledGroup>
              </StyledRow>
            )}
          </>
        )}
        <Divider />
        <DMCheckboxItem
          variant="styleMenu"
          checked={keepOpen}
          onCheckedChange={handleToggleKeepOpen}
          id="TD-Styles-Keep-Open"
        >
          Keep Open
        </DMCheckboxItem>
      </DMContent>
    </DropdownMenu.Root>
  );
});

const ColorGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, auto)',
  gap: 0,
});

export const StyledRow = styled('div', {
  position: 'relative',
  width: '100%',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  minHeight: '32px',
  outline: 'none',
  color: '$text',
  fontFamily: '$ui',
  fontWeight: 400,
  fontSize: '$1',
  padding: '$2 0 $2 $3',
  borderRadius: 4,
  userSelect: 'none',
  margin: 0,
  display: 'flex',
  gap: '$3',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  variants: {
    variant: {
      tall: {
        alignItems: 'flex-start',
        padding: '0 0 0 $3',
        '& > span': {
          paddingTop: '$4',
        },
      },
    },
  },
});

const StyledGroup = styled(DropdownMenu.DropdownMenuRadioGroup, {
  display: 'flex',
  flexDirection: 'row',
  gap: '$1',
});

const FontIcon = styled('div', {
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$3',
  variants: {
    fontStyle: {
      [FontStyle.Script]: {
        fontFamily: 'Caveat Brush',
      },
      [FontStyle.Sans]: {
        fontFamily: 'Recursive',
      },
      [FontStyle.Serif]: {
        fontFamily: 'Georgia',
      },
      [FontStyle.Mono]: {
        fontFamily: 'Recursive Mono',
      },
    },
  },
});
