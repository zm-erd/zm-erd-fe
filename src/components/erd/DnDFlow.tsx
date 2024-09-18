import React, { useCallback, useRef, useState } from 'react';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { useDnD } from '@/components/erd/dnd-context';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import Sidebar from '@/components/erd/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

const DnDFlow = ({ initialNodes, nodeTypes, nodeColor, getId }) => {
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

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
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
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={25}>
                <Sidebar />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75}>
                <ScrollArea className="h-full w-full rounded-md border p-1">
                  테이블 관리 보드
                  <div className="flex gap-1">
                    <div>
                      <Button
                        variant="default"
                        size="icon"
                        onClick={() => {
                          alert('컬럼추가');
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          alert('컬럼삭제');
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>컬럼트리 영역</div>
                </ScrollArea>
              </ResizablePanel>
            </ResizablePanelGroup>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default DnDFlow;
