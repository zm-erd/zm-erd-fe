import React, { useRef, useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  MiniMap,
  BackgroundVariant,
  Node,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import './dnd-flow.css';
// import '@/components/erd/_components/nodes/table-node.css';

import TableNode from '@/components/erd/_components/nodes/table-node';
import { useDnD } from '@/components/erd/_components/dnd-context';
import TopRightPanel from '@/components/erd/_components/top-right-panel';

const initialNodes = [
  {
    id: 'node-1',
    type: 'tableNode',
    position: { x: 0, y: 0 },
    data: {
      tableName: '테이블이름1',
      tableComment: '테이블설명1',
      columns: [
        {
          columnType: 'PK',
          columnName: '컬럼1',
          columnComment: '컬럼설명1',
          columnDataType: 'VARCHAR',
          notNull: true,
          sortOrder: 1,
        },
      ],
    },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeColor = (node: Node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    default:
      return '#ff0072';
  }
};

const nodeTypes = { tableNode: TableNode };

const DndFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const [variant, setVariant] = useState<BackgroundVariant>(
    BackgroundVariant.Cross,
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          tableName: '테이블이름2',
          tableComment: '테이블설명2',
          columns: [
            {
              columnType: 'PK',
              columnName: '컬럼2',
              columnComment: '컬럼설명2',
              columnDataType: 'VARCHAR',
              notNull: true,
              sortOrder: 1,
            },
          ],
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

  const onSelectionChange = useCallback((elements) => {
    console.log('Selection changed:', elements);
  }, []);

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onSelectionChange={onSelectionChange}
          selectNodesOnDrag={false}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#ccc" variant={variant} />
          <Controls position={'top-left'} />
          <MiniMap
            nodeColor={nodeColor}
            nodeStrokeWidth={3}
            position={'bottom-left'}
            zoomable
            pannable
          />
          <Panel
            position="top-right"
            className="m-4 flex h-[calc(100vh-7rem)] max-h-[calc(100vh-7rem)] w-96 flex-col rounded-lg border-2 border-rose-500 bg-white p-1"
          >
            <TopRightPanel />
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default DndFlow;
