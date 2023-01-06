import { useTrawApp } from 'hooks';
import Title from 'components/HeaderPanel/Title';
import SvgLogoSmall from 'icons/Logo';
import React, { ReactNode } from 'react';

import { styled } from 'stitches.config';
import TrawTopPanel from './TrawTopPanel';

export interface TopPanelProps {
  Room?: ReactNode;
  handleChangeTitle?: (newValue: string) => void;
}

export const TopPanelMobile = React.memo(function TopPanelMobile({ Room, handleChangeTitle }: TopPanelProps) {
  const app = useTrawApp();
  const state = app.useStore();
  const { document } = state;

  return (
    <>
      <StyledTopPanelContainer>
        <StyledLeftPanelContainer>
          <button>
            <SvgLogoSmall className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            <Title title={document.name} canEdit={document.canEdit} handleChangeTitle={handleChangeTitle} />
          </div>
        </StyledLeftPanelContainer>
        <StyledRightPanelContainer>{Room || <TrawTopPanel />}</StyledRightPanelContainer>
      </StyledTopPanelContainer>
    </>
  );
});

const StyledLeftPanelContainer = styled('div', {
  paddingLeft: 11,
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
});

const StyledRightPanelContainer = styled('div', {
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  paddingRight: 9,
});

const StyledTopPanelContainer = styled('div', {
  position: 'absolute',
  top: 0,
  minHeight: 0,
  width: '100%',
  height: 60,
  gap: '3px',
  display: 'flex',
  alignItems: 'center',
  zIndex: 200,
  overflow: 'scroll',
  fontSize: 13,
  backgroundColor: '#FFF',

  '& > div > *': {
    pointerEvents: 'all',
  },
  variants: {
    bp: {
      mobile: {},
      small: {},
      medium: {},
      large: {},
    },
  },
});
