import React, { ReactNode } from "react";
import Logo from "../../icons/Logo";
import Title from "./Title";

interface HeaderProps {
  // Title
  title: string;
  canEdit: boolean;
  handleChangeTitle: (name: string) => void;

  // Room
  Room: ReactNode;
}

const Header = ({ title, canEdit, handleChangeTitle, Room }: HeaderProps) => {
  return (
    <div className="flex flex-row h-14 pl-3 bg-white items-center rounded-2xl shadow-[0_10px_60px_rgba(189,188,249,0.5)]">
      <button className="flex h-9 w-9 rounded-full bg-white items-center justify-center text-xl hover:bg-traw-sky">
        <Logo />
      </button>
      <div className="ml-2">
        <Title
          title={title}
          canEdit={canEdit}
          handleChangeTitle={handleChangeTitle}
        />
      </div>
      <div className="flex flex-grow justify-end gap-1">{Room}</div>
    </div>
  );
};

export { Header };
