import { useContext } from "react";
import { FlowContext } from "./FlowBuilder";

function EditMessageNode() {
  const { editingNode, editNode } = useContext(FlowContext);

  return (
    <aside>
      <div className="description">Edit Message Node</div>
      <textarea
        rows={5}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your message here..."
        value={editingNode?.data.text || ""}
        onChange={(e) => {
          if (editingNode?.id) {
            editNode(editingNode.id, { text: e.target.value });
          }
        }}
      />
    </aside>
  );
}

export default EditMessageNode;
