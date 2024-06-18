"use client";
// FIXME: use actual icons locally. iconify only works client side
import { Icon } from "@iconify/react";

const ArrowButton = ({
  isWrap,
  onClick,
}: {
  isWrap: boolean;
  onClick: () => void;
}) => (
  <button onClick={onClick} className="border border-gray-300 rounded-3xl p-1">
    {isWrap ? (
      <Icon
        icon="mdi:arrow-down"
        className="text-3xl"
        data-testid="arrow-icon-down"
      />
    ) : (
      <Icon
        icon="mdi:arrow-up"
        className="text-3xl"
        data-testid="arrow-icon-up"
      />
    )}
  </button>
);

export default ArrowButton;
