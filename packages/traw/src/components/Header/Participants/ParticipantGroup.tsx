import ParticipantGroupOverflow from "./ParticipantGroupOverflow";
import React from "react";

export interface ParticipantsProps {
  showings: React.ReactNode[];
  hidings: React.ReactNode[];
}

export default function ParticipantGroup({
  showings,
  hidings,
}: ParticipantsProps) {
  return (
    <div className="flex gap-1 items-center justify-center">
      {showings}
      {hidings && hidings.length > 0 && (
        <ParticipantGroupOverflow>{hidings}</ParticipantGroupOverflow>
      )}
    </div>
  );
}
