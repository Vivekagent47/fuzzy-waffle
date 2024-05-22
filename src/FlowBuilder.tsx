import React, { createContext, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { OnConnect, addEdge, useEdgesState, useNodesState } from "reactflow";

export type MessageNodeData = {
  text: string;
};

const useFlowStore = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  const editingNode = useMemo(() => {
    return nodes.find((node) => node.id === editingNodeId);
  }, [nodes, editingNodeId]);

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((prev) => addEdge(params, prev));
    },
    [setEdges]
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((prev) => prev.filter((node) => node.id !== nodeId));
      setEdges((prev) =>
        prev.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  const editNode = (nodeId: string, data: MessageNodeData) => {
    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data };
        }
        return node;
      })
    );
  };

  // Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles
  const checkAllNodesAreConnected = () => {
    const nodesWithEmptyTargetHandles = nodes.filter((node) => {
      return !edges.some((edge) => edge.target === node.id);
    });

    if (nodes.length > 1 && nodesWithEmptyTargetHandles.length > 1) {
      toast.error("All nodes must be connected to another node", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteNode,
    editingNode,
    setEditingNodeId,
    editNode,
    checkAllNodesAreConnected,
  };
};

type FlowStoreType = ReturnType<typeof useFlowStore>;
export const FlowContext = createContext({} as FlowStoreType);
export const FlowProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useFlowStore();
  return <FlowContext.Provider value={store}>{children}</FlowContext.Provider>;
};
