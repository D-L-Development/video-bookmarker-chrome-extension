import FileComponent from "../../popup/pages/file-system-page/file/file.component";
import React from "react";
import { FileSystemContent } from "../../popup/pages/file-system-page/file-system-page.styles";
import FolderComponent from "../../popup/pages/file-system-page/folder/folder.component";

const FILES = [
  {
    name: "Lecture 01",
    uuid: "645a2b31-1b15-4f9f-9c1d-4f8e6f12e3a1",
    selected: false,
    date: "2023-07-16",
  },
  {
    name: "Lecture 02",
    uuid: "9e0b301c-1b2f-4c5c-8c07-7ebd9ef48014",
    selected: false,
    date: "2023-07-14",
  },
  {
    name: "Lecture 03",
    uuid: "5df4e1b2-3cb6-453a-a457-808b25b50e23",
    selected: false,
    date: "2023-07-13",
  },
];
const FOLDERS = [
  {
    name: "History",
    uuid: "05de1ac6-dcc4-42f7-ae3a-6f17c609bd20",
    selected: false,
  },
  {
    name: "Math",
    uuid: "f6bda92d-71b2-46c9-8c11-62f4e94fb43e",
    selected: false,
  },
  {
    name: "Science",
    uuid: "82bf6d2b-4b7c-4265-98e1-67d7e39d0847",
    selected: false,
  },
  {
    name: "Literature",
    uuid: "5bf7e721-66c5-42e7-b29b-6a7e620049ab",
    selected: false,
  },
  {
    name: "Art",
    uuid: "c5f21a4a-7772-4b22-b811-bf4e0f2c5362",
    selected: false,
  },
  {
    name: "Music",
    uuid: "9c5e2d2a-dfb2-4d7a-9d17-bc416c13793f",
    selected: false,
  },
  {
    name: "Computer Science",
    uuid: "9e8f27f0-38a4-4ea0-a0e5-32ac54e8ac53",
    selected: true,
  },
  {
    name: "Foreign Languages",
    uuid: "9f8f3e0d-5a4b-4b5f-8d02-63ab52ec81eb",
    selected: false,
  },
];

export const renderFileSystem = () => (
  <FileSystemContent shadow={true} grid={true} maxWidth={"27rem"} br={"1rem"}>
    {FOLDERS.map((file) => (
      <FolderComponent
        name={file.name}
        uuid={file.uuid}
        key={file.uuid}
        selected={file.selected}
        grid={true}
        handleClick={null}
      />
    ))}
    {FILES.map((file) => (
      <FileComponent
        name={file.name}
        uuid={file.uuid}
        key={file.uuid}
        selected={file.selected}
        date={file.date}
        grid={true}
        handleClick={null}
      />
    ))}
  </FileSystemContent>
);
