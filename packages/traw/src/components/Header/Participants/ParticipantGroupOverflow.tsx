import React, { Children, useState } from "react";

export interface ParticipantOverflowGroupProps {
  children: React.ReactNode;
}

export default function ParticipantGroupOverflow({
  children,
}: ParticipantOverflowGroupProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleOpen = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <button onClick={handleOpen}>{Children.count(children)}</button>
      <div>
        {Children.map(children, (child) => (
          <div>{child}</div>
        ))}
      </div>
    </>
  );
}
