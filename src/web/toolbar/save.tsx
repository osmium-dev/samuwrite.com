import { DownloadIcon } from "@primer/octicons-react";
import { DocState } from "../doc/type";
import { Editor } from "../editor/type";
import { sendHostMessage } from "../host/send";
import { ToolbarButton } from "./button/button";

interface Props extends DocState {
  editor: Editor;
}

const save = async (props: Props): Promise<void> => {
  const { doc, editor, setDoc } = props;

  const content = editor.getValue();

  const isMac = (window as any).webkit !== undefined;
  if (!isMac) {

    //@ts-ignore This API is experimental and Typescript doesn't support it yet.
    const fileHandle = doc.fileHandle ||await window.showSaveFilePicker();

    // create a FileSystemWritableFileStream to write to
    const writableStream = await fileHandle.createWritable();

    // create blog from content
    const contentBlob = new Blob([content]);

    // write our file
    await writableStream.write(contentBlob);

    // close the file and write the contents to disk.
    await writableStream.close();

    setDoc({ content, fileHandle: fileHandle });

    return;
  }

  if (doc.path === null) {
    // New file
    const { path } = await sendHostMessage("saveFileAs", { content });
    setDoc({ content, path });
  } else {
    // Current file
    await sendHostMessage("saveFile", { path: doc.path, content });
    setDoc({ ...doc, content });
  }
};

export const ToolbarSave = (props: Props): JSX.Element => {
  return (
    <ToolbarButton
      Icon={DownloadIcon}
      label="Save"
      onClick={() => save(props)}
    />
  );
};