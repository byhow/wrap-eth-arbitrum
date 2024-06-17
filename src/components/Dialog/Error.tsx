import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { type Address } from "viem";

interface ErrorDialogProps {
  open: boolean;
  address?: Address;
}

export const ErrorDialog: React.FC<ErrorDialogProps> = ({ open, address }) => {
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
        <h2 className="text-2xl font-bold mb-4">Transaction failed!</h2>
        <div className="mb-4">
          Something is really wrong.
          {address && (
            <>
              Check the transactions of your address on{" "}
              <Link
                href={`https://arbiscan.io/address/${address}`}
                className="hover:text-emerald-300 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Arbitrum Scan
              </Link>
            </>
          )}
        </div>
        <button
          onClick={() => dialogRef.current?.close()}
          className="px-4 py-2 bg-emerald-300 text-white rounded hover:bg-emerald-600"
        >
          Close
        </button>
      </div>
    </dialog>
  );
};
