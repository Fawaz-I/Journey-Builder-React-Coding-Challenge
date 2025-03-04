import React, { useMemo, useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
  ConnectionLineType,
  OnNodesChange,
  applyNodeChanges,
  NodeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { BlueprintGraphResponse } from '../../types';
import FormNode from './FormNode';

interface JourneyGraphProps {
  data: BlueprintGraphResponse;
  onNodeSelect: (nodeId: string) => void;
  selectedNodeId: string | null;
}

const JourneyGraph: React.FC<JourneyGraphProps> = ({
  data,
  onNodeSelect,
  selectedNodeId,
}) => {
  // Convert API nodes to React Flow nodes
  const initialNodes: ReactFlowNode[] = useMemo(() => {
    return data.nodes.map((node) => ({
      id: node.id,
      position: node.position,
      data: {
        ...node.data,
        label: data.forms.find((form) => form.id === node.id)?.name || node.id,
        isSelected: node.id === selectedNodeId,
      },
      type: node.type === 'form' ? 'form' : 'default',
    }));
  }, [data, selectedNodeId]);

  const [nodes, setNodes] = useState<ReactFlowNode[]>(initialNodes);

  // Update nodes when data or selection changes
  React.useEffect(() => {
    setNodes(
      initialNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isSelected: node.id === selectedNodeId,
        },
      }))
    );
  }, [initialNodes, selectedNodeId]);

  // Convert API edges to React Flow edges
  const edges: ReactFlowEdge[] = useMemo(() => {
    return data.edges.map((edge, index) => ({
      id: `edge-${index}`,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: false,
    }));
  }, [data]);

  // Register custom node types
  const nodeTypes = useMemo(() => ({ form: FormNode }), []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const handleNodeClick = (_event: React.MouseEvent, node: ReactFlowNode) => {
    if (node.type === 'form') {
      onNodeSelect(node.id);
    }
  };

  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: '600px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onNodeClick={handleNodeClick}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default JourneyGraph;
