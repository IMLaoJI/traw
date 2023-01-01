import classNames from 'classnames';
import { useTrawApp } from 'hooks';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo } from 'react';
import { TrawSnapshot } from 'types';
import { UserAvatar } from '../Avatar/Avatar';

export interface BlockItemProps {
  userId: string;
  blockId: string;
  date: string | number;
  blockText: string;
  isVoiceBlock: boolean;
  handlePlayClick: (blockId: string) => void;
  setRef: (ref: any) => void;
}

export const BlockItem = ({
  userId,
  blockId,
  date,
  isVoiceBlock,
  blockText,
  handlePlayClick,
  setRef,
}: BlockItemProps) => {
  const trawApp = useTrawApp();

  const user = trawApp.useStore((state: TrawSnapshot) => state.users[userId]);

  const dateStr = useMemo(() => {
    if (typeof date === 'string') {
      return date;
    } else {
      return moment(date).format('hh:mm A');
    }
  }, [date]);

  const onClick = useCallback(() => {
    handlePlayClick(blockId);
  }, [blockId, handlePlayClick]);

  useEffect(() => {
    async function fetchAndSetUser() {
      if (trawApp.requestUser) {
        const user = await trawApp.requestUser(userId);
        if (user) {
          trawApp.addUser(user);
        }
      }
    }

    if (!user) {
      fetchAndSetUser();
    }
  }, [trawApp, user, userId]);

  return (
    <li
      className="bg-white w-full"
      ref={(el: HTMLLIElement) => {
        setRef(el);
      }}
    >
      <div className="flex flex-1 flex-row items-center w-full grow gap-1">
        <div className="flex relative">
          {user && <UserAvatar avatarUrl={user.profileUrl} userName={user.name} size={15} />}
        </div>
        {user && <div className="font-bold text-[13px] text-traw-grey-dark">{user.name}</div>}
        <div className="text-traw-grey-100 text-[10px]">{dateStr}</div>
      </div>
      <span
        className={classNames('mt-2', 'text-xs', 'rounded-md', 'py-1', 'px-0.5', 'transition-colors', {
          'cursor-pointer': isVoiceBlock,
          'hover:bg-traw-grey-50': isVoiceBlock,
        })}
        onClick={onClick}
      >
        {blockText || '[Empty]'}
      </span>
    </li>
  );
};

export default BlockItem;
