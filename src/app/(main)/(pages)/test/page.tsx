'use client';
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Handle,
  NodeProps,
  Position,
  MiniMap,
  Controls,
  Panel,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { GetMiniMapNodeAttribute } from '@xyflow/react/dist/esm/additional-components/MiniMap/types';
import { NodeType } from 'yaml/dist/nodes/Node';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  {
    id: '4',
    type: 'custom',
    data: { label: 'Custom Node' },
    position: { x: 400, y: 200 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
];

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: NodeProps) => {
  return (
    <>
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
      />
      {data?.label}
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      />
    </>
  );
};

CustomNode.displayName = 'CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const nodeColor = (node: GetMiniMapNodeAttribute<NodeType>) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    default:
      return '#ff0072';
  }
};

const Page = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges],
  );

  const [variant, setVariant] = useState<BackgroundVariant>(
    BackgroundVariant.Cross,
  );

  return (
    <div className="h-full">
      {/*<EditorProvider>*/}
      {/*  <ConnectionsProvider>*/}
      {/*<EditorCanvas />*/}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Panel position="top-left">
          <Button onClick={() => setVariant(BackgroundVariant.Dots)}>
            dots
          </Button>
          <Button onClick={() => setVariant(BackgroundVariant.Lines)}>
            lines
          </Button>
          <Button onClick={() => setVariant(BackgroundVariant.Cross)}>
            cross
          </Button>
        </Panel>
        <Panel position="top-center">top-center</Panel>
        <Panel position="top-right">top-right</Panel>
        <Panel position="bottom-left">bottom-left</Panel>
        <Panel position="bottom-center">bottom-center</Panel>
        <Panel position="bottom-right">bottom-right</Panel>
        <Background color="#ccc" variant={variant} />
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
      {/*</ConnectionsProvider>*/}
      {/*</EditorProvider>*/}
    </div>
  );
};

export default Page;
