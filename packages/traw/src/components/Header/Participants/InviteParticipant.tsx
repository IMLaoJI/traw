import React, { memo, useState } from "react";

// const styles = {
//   inviteButton: {
//     fontSize: 17,
//     width: "30px",
//     height: "30px",
//     color: "neutral.main",
//   },
//   dialog: {
//     "& .MuiPaper-root": {
//       width: "444px",
//       borderRadius: "20px",
//       pt: "10px",
//       pb: "13px",
//       pl: "24px",
//       pr: "21px",
//     },
//     "& .MuiDialogTitle-root": {
//       display: "flex",
//       alignItems: "center",
//       fontSize: "15px",
//       fontWeight: 700,
//       pb: "16px",
//       px: 0,
//     },
//     "& .MuiDialogContent-root": {
//       pb: "14px",
//       px: 0,
//       "& .MuiDialogContentText-root": {
//         fontSize: "13px",
//         color: "text.primary",
//       },
//     },
//     "& .MuiDialogActions-root": {
//       "& .MuiButton-root": {
//         fontSize: "13px",
//         fontWeight: 700,
//       },
//     },
//   },
// };

export interface InviteParticipantProps {
  excludeIds?: string[];
  handleInviteRequest: (ids: string[]) => void;
}

export const InviteParticipant = memo(function InviteParticipant({
  excludeIds = [],
  handleInviteRequest,
}: InviteParticipantProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  const onClose = () => {
    setOpen(false);
    setSelectedMemberIds([]);
  };

  const onClickRequest = () => {
    handleInviteRequest(selectedMemberIds);
    onClose();
  };

  return (
    <button onClick={() => setOpen(true)}>
      Add
      {/* <TrawAddMemberFilled /> */}
    </button>
  );
});

export default InviteParticipant;
