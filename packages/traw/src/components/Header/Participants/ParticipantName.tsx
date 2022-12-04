import React, { memo } from "react";

const ParticipantName = memo(function ParticipantName({
  username,
}: {
  username?: string;
}) {
  if (!username) {
    return <div>anonymous_user</div>;
  }
  return <div>{username}</div>;
});

export default ParticipantName;
