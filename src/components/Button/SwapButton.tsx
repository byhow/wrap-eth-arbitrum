import { ButtonText } from "@/lib/constants";
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

  let buttonText = ButtonText.ENTER_AMOUNT;
  if (isWalletDisconnected) {
    buttonText = ButtonText.PLEASE_CONNECT_WALLET;
  } else if (isFetchingBalance) {
    buttonText = ButtonText.LOADING;
  } else if (canSwap) {
    buttonText = isWrap ? ButtonText.WRAP : ButtonText.UNWRAP;
  } else if (amountIsZero) {
    buttonText = ButtonText.ENTER_AMOUNT;
  } else {
    buttonText = ButtonText.INSUFFICIENT_BALANCE;
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
