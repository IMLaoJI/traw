import { TDPage } from '@tldraw/tldraw';
import classNames from 'classnames';
import React from 'react';
import SvgViewer from '../../icons/viewer';
import SlideThumbnail from './SlideThumbnail';

export enum SlideListItemState {
  DEFAULT = 'DEFAULT',
  TARGETED = 'TARGETED',
  SELECTED = 'SELECTED',
}

interface SlideListItemProps {
  page: TDPage;
  index: number;
  type: 'list' | 'preview';
  viewerCount?: number;
  selectState?: SlideListItemState;
  setRef?: (ref: HTMLLIElement) => void;
  handleClick?: (slideId: string) => void;
  classnames?: string;
}

const slideSizes = {
  list: 'w-[105px] sm:w-[105px]',
  preview: 'w-[375]',
};

export const SlideListItem = ({
  page,
  index,
  viewerCount,
  selectState = SlideListItemState.DEFAULT,
  type,
  setRef,
  handleClick,
  classnames,
}: SlideListItemProps) => {
  const handleSelectSlide = () => {
    handleClick && handleClick(page.id);
  };

  return (
    <li
      ref={(el: HTMLLIElement) => {
        setRef && setRef(el);
      }}
      key={page.id}
      onClick={handleSelectSlide}
      className={classNames(`flex aspect-video  relative cursor-pointer rounded-xl ${slideSizes[type]} ${classnames}}`)}
    >
      <div
        className={classNames(
          'absolute top-0 bottom-0 left-0 right-0 w-full h-full z-[101] flex flex-col justify-between outline outline-1 outline-offset-[-1px] rounded-xl',
          {
            'outline-transparent ': selectState === SlideListItemState.DEFAULT,
            'outline-traw-purple ': selectState === SlideListItemState.SELECTED,
            'outline-traw-grey ': selectState === SlideListItemState.TARGETED,
            'outline-traw-sky': type === 'preview',
          },
        )}
      >
        {type === 'list' && (
          <div
            className={classNames(
              'flex items-center justify-center ml-auto w-10 rounded-bl-xl rounded-tr-xl text-right text-[10px] py-0.5 gap-1 select-none',
              {
                'bg-traw-purple text-white': selectState === SlideListItemState.SELECTED,
                'bg-traw-grey-50 text-traw-grey-100 ':
                  selectState === SlideListItemState.DEFAULT || selectState === SlideListItemState.TARGETED,
              },
            )}
          >
            <SvgViewer className="fill-current h-3 w-4 " />
            {viewerCount}
          </div>
        )}
        {type === 'list' && <div className="ml-auto text-[10px] text-traw-grey-100 pr-2 pb-1 select-none">{index}</div>}
      </div>
      <SlideThumbnail page={page} />
    </li>
  );
};

export default SlideListItem;
