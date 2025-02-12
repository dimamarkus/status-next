import { FC } from "react";

interface Props {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}

export const SidebarButton: FC<Props> = ({ text, icon, onClick }) => {
  return (
    <button
      className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-2 text-[12.5px] leading-3 text-secondary transition-colors duration-200 hover:bg-gray-500/10"
      onClick={onClick}
    >
      {icon}
      <span className="text-neutral-500 dark:text-neutral-content">{text}</span>
    </button>
  );
};

export default SidebarButton;
