import { ConversationsFolder } from "#/app/chat/lib/types";
import { FC } from "react";
import { Folder } from "./Folder";

interface Props {
  searchTerm: string;
  folders: ConversationsFolder[];
}

export const Folders: FC<Props> = ({ searchTerm, folders }) => {
  return (
    <ul className="flex flex-col gap-2 border-b border-neutral-500/20 py-2">
      {folders.map((folder, index) => (
        <Folder key={index} searchTerm={searchTerm} currentFolder={folder} />
      ))}
    </ul>
  );
};