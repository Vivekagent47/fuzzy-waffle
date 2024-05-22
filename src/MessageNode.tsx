import { TrashIcon } from "@radix-ui/react-icons";
import { memo, useContext } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { FlowContext, MessageNodeData } from "./FlowBuilder";

const MessageNode = memo(
  ({ data, isConnectable, id }: NodeProps<MessageNodeData>) => {
    const { deleteNode, setEditingNodeId } = useContext(FlowContext);

    return (
      <div
        className="border rounded-md w-[300px] bg-white"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setEditingNodeId(id);
        }}
      >
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: "#555" }}
          isConnectable={isConnectable}
        />
        <div className="flex justify-between items-center text-base rounded-t-md from-neutral-950 bg-green-600 p-2">
          <span>Message Node</span>
          <button
            className="p-2 bg-white rounded-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              deleteNode(id);
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex text-sm from-neutral-950 p-2">
          {data.text || "Click here to Start Editing"}
        </div>
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
        />
      </div>
    );
  }
);

export default MessageNode;
