import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { TbClipboard } from "react-icons/tb";

export default function CopyButton({ clipboard }: { clipboard: string }) {
  const [text, setText] = useState("Copy");

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(clipboard);
        setText("Copied!");
      }}
      className="flex cursor-pointer gap-1 items-center justify-center"
    >
      <TbClipboard></TbClipboard>
      <span>{text}</span>
    </button>
  );
}
