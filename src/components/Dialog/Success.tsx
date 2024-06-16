import React, { useEffect, useRef } from "react";

interface SuccessDialogProps {
  open: boolean;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({ open }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [open]);

  return (
    <dialog ref={dialogRef}>
      <h2>Transaction successful!</h2>
      <button onClick={() => dialogRef.current?.close()}>Close</button>
    </dialog>
  );
};
