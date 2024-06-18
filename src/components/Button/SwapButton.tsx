import cn from "classnames";

type SwapButtonProps = {
  canSwap: boolean;
  isWrap: boolean;
  handleWrap: () => void;
  handleUnwrap: () => void;
  isWalletDisconnected: boolean;
  isFetchingBalance: boolean;
  isFetchingBalanceError: boolean;
  amountIsZero: boolean;
};

const SwapButton: React.FC<SwapButtonProps> = ({
  canSwap,
  isWrap,
  handleWrap,
  handleUnwrap,
  isWalletDisconnected,
  isFetchingBalance,
  isFetchingBalanceError,
  amountIsZero,
}) => {
  const buttonClasses = cn(
    "transition duration-500 ease-in-out delay-150 border border-gray-300 p-3 rounded-3xl w-full",
    {
      "text-white": canSwap,
      "bg-black": canSwap,
      "text-black": !canSwap,
      "bg-gray-100": !canSwap,
    }
  );

  let buttonText = "Enter Amount...";
  if (isWalletDisconnected) {
    buttonText = "Please Connect Wallet";
  } else if (isFetchingBalance) {
    buttonText = "Loading";
  } else if (canSwap) {
    buttonText = isWrap ? "Wrap" : "Unwrap";
  } else if (amountIsZero) {
    buttonText = "Enter Amount...";
  } else {
    buttonText = "Insufficient Balance";
  }

  return (
    <button
      onClick={isWrap ? handleWrap : handleUnwrap}
      className={buttonClasses}
      disabled={
        !canSwap || amountIsZero || isFetchingBalance || isFetchingBalanceError
      }
    >
      {buttonText}
    </button>
  );
};

export default SwapButton;
