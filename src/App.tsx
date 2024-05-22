import { DragEvent, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactFlow, {
  Controls,
  Node,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import EditMessageNode from "./EditMessageNode";
import { FlowContext, FlowProvider } from "./FlowBuilder";
import MessageNode from "./MessageNode";
import Sidebar from "./Sidebar";

const nodeTypes = {
  message: MessageNode,
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

function ReactFlowPro() {
  const {
    nodes,
    edges,
    setNodes,
    onEdgesChange,
    onNodesChange,
    onConnect,
    editingNode,
    setEditingNodeId,
    checkAllNodesAreConnected,
  } = useContext(FlowContext);
  const { screenToFlowPosition } = useReactFlow();

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    const position = screenToFlowPosition({
      x: event.clientX - 80,
      y: event.clientY - 20,
    });
    const newNode: Node = {
      id: `${Date.now()}`,
      type,
      position,
      data: { label: `${type}` },
    };

    setNodes((prev) => [...prev, newNode]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end border-b px-4 py-2">
        <button
          onClick={checkAllNodesAreConnected}
          className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 bg-blue-100"
        >
          Save
        </button>
      </div>
      <div className="wrapper h-full">
        <div className="react-flow-wrapper h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onPaneClick={() => setEditingNodeId(null)}
          >
            <Controls />
          </ReactFlow>
        </div>
        {editingNode ? <EditMessageNode /> : <Sidebar />}
      </div>
      <ToastContainer />
    </div>
  );
}

export default function Flow() {
  return (
    <ReactFlowProvider>
      <FlowProvider>
        <ReactFlowPro />
      </FlowProvider>
    </ReactFlowProvider>
  );
}
