import React from "react";
import CallButton from "./CallButton";
import CallControl from "./CallControl";
import JoinCallButton from "./JoinCallButton";
import StartCallButton from "./StartButton";

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
        <div>
          {isInCall && (
            <CallControl
              isMicMuted={isMicMuted}
              onEndCall={onEndCall}
              onToggleMic={onToggleMic}
            />
          )}
          <div>
            {!isInCall && (
              <CallButton isConnecting={canJoinCall && isConnecting}>
                <JoinCallButton
                  isBrowser={isBrowser}
                  onClick={handleStartCall}
                />
              </CallButton>
            )}
            Participants
          </div>
        </div>
      )}
      {inCallparticipants.length === 0 && (
        <CallButton isConnecting={canJoinCall && isConnecting}>
          <StartCallButton isBrowser={isBrowser} onClick={handleStartCall} />
        </CallButton>
      )}

      <div>Participants</div>
    </>
  );
};

export default Room;
