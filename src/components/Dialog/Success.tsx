import React, { useEffect, useRef } from "react";
import { type UseWaitForTransactionReceiptReturnType } from "wagmi";

interface SuccessDialogProps {
  open: boolean;
  receipt: UseWaitForTransactionReceiptReturnType["data"];
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  receipt,
}) => {
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
      <div className="bg-white p-4 rounded shadow-lg max-w-sm mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Transaction successful!</h2>
        <p className="mb-4">Transaction hash: {receipt?.transactionHash}</p>
        <button
          onClick={() => dialogRef.current?.close()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </dialog>
  );
};
