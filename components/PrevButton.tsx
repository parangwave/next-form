"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export default function PrevButton({
  children = <ArrowLeftIcon className="size-10" />,
  className,
}: ButtonProps) {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-start ${className}`}
    >
      {children}
    </button>
  );
}
