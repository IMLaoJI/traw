import React, { useCallback } from "react";
import Participant from "./Participant";
// import { ParticipantWrapper } from 'traw/Header/ParticipantWrapper';
import ParticipantGroup from "./ParticipantGroup";
import ParticipantName from "./ParticipantName";

export type RoomState =
  | "preview"
  | "connecting"
  | "connected"
  | "disconnected"
  | "failed";

interface ParticipantsProps {
  isBrowser: boolean;
  participants: any[];
}

const Participants = ({ isBrowser, participants }: ParticipantsProps) => {
  const overflowLimit = isBrowser ? 5 : 1;

  const showings =
    participants.length === overflowLimit + 1
      ? participants.slice(0, overflowLimit + 1)
      : participants.slice(0, overflowLimit) || [];
  const hidings =
    participants.length === overflowLimit + 1
      ? []
      : participants.slice(overflowLimit) || [];

  const followUser = (userId: string) => {
    console.log(userId);
  };

  return (
    <ParticipantGroup
      showings={showings.map((participant) => (
        <Participant
          key={participant.connectionId}
          userId={participant.userId}
          color={participant.color}
          roomState="connected"
          isAudience={true}
          isPresenter={false}
          isInCall={true}
          isMuted={false}
          followUser={followUser}
        />
      ))}
      hidings={hidings.map((participant) => (
        <React.Fragment key={participant.connectionId}>
          <Participant
            userId={participant.userId}
            color={participant.color}
            roomState="connected"
            isAudience={true}
            isPresenter={false}
            isInCall={true}
            isMuted={false}
            followUser={followUser}
          />
          <ParticipantName username={participant.username} />
        </React.Fragment>
      ))}
    />
  );
};

export default Participants;
