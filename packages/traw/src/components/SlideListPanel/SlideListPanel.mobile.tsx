import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PlusIcon } from '@radix-ui/react-icons';

import { DMContent, DMItem } from 'components/Primitives/DropdownMenu';
import { SlideListItemState } from 'components/SlideListPanel/SlideListItem';
import { useTrawApp } from 'hooks';
import { useTldrawApp } from 'hooks/useTldrawApp';
import SvgCheck from 'icons/check';
import * as React from 'react';
import { styled } from 'stitches.config';

export const SlideListPanelMobile = React.memo(function SlideListPanelMobile() {
  const app = useTrawApp();
  const tldrawApp = useTldrawApp();
  const state = tldrawApp.useStore();
  const { document, appState } = state;
  const { currentPageId } = appState;
  const pages = document.pages;

  const currentPageIndex = Object.keys(pages).indexOf(currentPageId) + 1;

  const handleSlideClick = (slideId: string) => {
    app.selectSlide(slideId);
  };

  const handleAddSlide = () => {
    app.createSlide();
  };

  return (
    <DropdownMenu.Root modal={false} dir="ltr">
      <StyledSlideListPanelContainer id="Slide-list">
        <div className="text-traw-grey-dark">Pages</div>
        <div className="text-traw-purple ml-1">{currentPageIndex}p</div>
      </StyledSlideListPanelContainer>
      <DMContent side="bottom" align="start" overflow={true}>
        {Object.values(pages).map((page, index) => {
          const selectState = page.id === currentPageId ? SlideListItemState.SELECTED : SlideListItemState.DEFAULT;
          return (
            <React.Fragment key={`slide-${index}`}>
              <DMItem onSelect={() => handleSlideClick(page.id)} id={`slide-${index}`}>
                <div className="flex items-center gap-1 text-traw-grey-dark text-[13px] w-full my-1">
                  <div>Pages</div>
                  <div className="ml-1">{index + 1}p</div>
                  {selectState === SlideListItemState.SELECTED && (
                    <div className="text-traw-pink ml-auto stroke-inherit">
                      <SvgCheck className="fill-current !stroke-0" />
                    </div>
                  )}
                </div>
              </DMItem>
              <hr className="w-full my-1 border-traw-sky" />
            </React.Fragment>
          );
        })}
        <DMItem onSelect={handleAddSlide} id="add-slide">
          <div className="text-traw-grey-dark text-[13px]  flex items-center">
            Create Page
            <PlusIcon className="text-traw-grey ml-1.5 !stroke-0" />
          </div>
        </DMItem>
      </DMContent>
    </DropdownMenu.Root>
  );
});

const StyledSlideListPanelContainer = styled(DropdownMenu.Trigger, {
  position: 'absolute',
  top: 71,
  left: 16,
  width: 90,
  gap: '$4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 200,
  borderRadius: 15,
  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  fontSize: 13,
  height: 50,
  backgroundColor: 'white !important',
});
