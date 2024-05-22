import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { DragEvent } from "react";

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

const Sidebar = () => {
  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className=" flex text-base p-4 from-neutral-950 border rounded-md "
        onDragStart={(event: DragEvent) => onDragStart(event, "message")}
        draggable
      >
        <ChatBubbleIcon className="w-6 h-6 text-blue-700" />
        <span className="px-2">Message Node</span>
      </div>
    </aside>
  );
};

export default Sidebar;
