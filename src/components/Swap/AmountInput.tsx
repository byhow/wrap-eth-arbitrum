import cn from "classnames";
import type { ChangeEvent } from "react";

type AmountInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  currency: string;
};

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  disabled,
  currency,
}: AmountInputProps) => (
  <div className="relative">
    <input
      type="text"
      placeholder={`Amount in ${currency}`}
      value={value}
      onChange={onChange}
      className={cn("border border-gray-300 p-2 rounded-md pr-8", {
        "bg-gray-100": disabled,
      })}
      disabled={disabled}
    />
    <span className="absolute inset-y-0 right-2 flex items-center text-sm">
      {currency}
    </span>
  </div>
);

export default AmountInput;
