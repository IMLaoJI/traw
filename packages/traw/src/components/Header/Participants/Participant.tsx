import React, { PointerEventHandler, useCallback, useMemo } from "react";
import { UserAvatar } from "../../Avatar/Avatar";
import { RoomState } from "./Participants";

export interface ParticipantProps {
  userId: string | undefined;
  color: string;
  roomState: RoomState;
  isAudience: boolean;
  isPresenter: boolean;
  isInCall: boolean;
  handlePointerDown?: PointerEventHandler;
  isMuted: boolean;
  tooltip?: string;
  followUser: (userId: string) => void;
}

const Participant = ({
  userId,
  color,
  roomState,
  isAudience,
  isPresenter,
  isInCall,
  isMuted,
  tooltip,
  followUser,
  handlePointerDown,
}: ParticipantProps) => {
  const onClick = useCallback(() => {
    userId && followUser(userId);
  }, [userId, followUser]);

  const button = useMemo(
    () => (
      <button onClick={onClick} onPointerDown={handlePointerDown}>
        <UserAvatar userName={userId} avatarUrl={undefined} />
      </button>
    ),
    [handlePointerDown, onClick, userId]
  );

  if (isInCall) {
    if (roomState === "connected") {
      if (isMuted) {
        return <div>{button}</div>;
      } else return <div>{button}</div>;
    } else {
      return button;
    }
  }
  return button;
};

export default Participant;
