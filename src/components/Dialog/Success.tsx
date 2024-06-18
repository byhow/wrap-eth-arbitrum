import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { type UseWaitForTransactionReceiptReturnType } from "wagmi";

interface SuccessDialogProps {
  open: boolean;
  receipt: UseWaitForTransactionReceiptReturnType["data"];
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, receipt }) => {
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
    <dialog ref={dialogRef} style={{ borderRadius: "8px" }}>
      <div className="bg-white p-4 rounded shadow-lg max-w-sm mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Transaction successful!</h2>
        <div className="mb-4">
          View transaction on{" "}
          <Link
            href={`https://arbiscan.io/tx/${receipt?.transactionHash}`}
            className="hover:text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arbitrum Scan
          </Link>
        </div>
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

export default SuccessDialog;
