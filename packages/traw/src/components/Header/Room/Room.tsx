import React from 'react';
import Participants from '../Participants/Participants';
import CallButton from './CallButton';
import CallControl from './CallControl';
import JoinCallButton from './JoinCallButton';
import StartCallButton from './StartButton';

export interface RoomProps {
  isBrowser: boolean;
  isMicMuted?: boolean;
  isInCall: boolean;
  inCallparticipants: any[];
  outCallparticipants: any[];
  isConnecting: boolean;
  canJoinCall: boolean;

  handleStartCall: () => void;
  onToggleMic: () => void;
  onEndCall: () => void;
}

const Room = ({
  isBrowser,
  isMicMuted = false,
  isInCall,
  inCallparticipants,
  outCallparticipants,
  isConnecting,
  canJoinCall,
  handleStartCall,
  onToggleMic,
  onEndCall,
}: RoomProps) => {
  return (
    <>
      {inCallparticipants.length > 0 && (
        <div className="border border-traw-purple flex items-center justify-center gap-1 py-1 px-2 rounded-full w-fit ">
          {isInCall && <CallControl isMicMuted={isMicMuted} onEndCall={onEndCall} onToggleMic={onToggleMic} />}
          <div className="flex gap-1 items-center">
            {!isInCall && (
              <CallButton isConnecting={canJoinCall && isConnecting}>
                <JoinCallButton isBrowser={isBrowser} onClick={handleStartCall} />
              </CallButton>
            )}
            <Participants isBrowser={isBrowser} participants={inCallparticipants} />
          </div>
        </div>
      )}
      {inCallparticipants.length === 0 && (
        <CallButton isConnecting={canJoinCall && isConnecting}>
          <StartCallButton isBrowser={isBrowser} onClick={handleStartCall} />
        </CallButton>
      )}

      <Participants isBrowser={isBrowser} participants={outCallparticipants} />
    </>
  );
};

export default Room;
