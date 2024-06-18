import type { Address } from "viem";
import ErrorDialog from "../Dialog/Error";
import SuccessDialog from "../Dialog/Success";

type TransactionStatusProps = {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  receipt: any;
  userAddress?: Address;
};

const TransactionStatus: React.FC<TransactionStatusProps> = ({
  isFetching,
  isSuccess,
  isError,
  receipt,
  userAddress,
}: TransactionStatusProps) => {
  if (isFetching) return <p>Waiting for transaction to be confirmed...</p>;
  if (isSuccess) return <SuccessDialog open={isSuccess} receipt={receipt} />;
  if (isError) return <ErrorDialog open={isError} address={userAddress} />;
  return null;
};

export default TransactionStatus;
