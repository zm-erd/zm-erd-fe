import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useDnD } from './dnd-context';

// import Sidebar from '@/components/erd/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Sheet, Trash2 } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useOnSelectionChange } from '@xyflow/react';

const TopRightPanel = () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onChange = useCallback(({ nodes, edges }) => {
    setSelectedNodes(nodes.map((node) => node.id));
    setSelectedEdges(edges.map((edge) => edge.id));
    console.log('onChange...');
    console.log(JSON.stringify(nodes));

    if (nodes != null && nodes.length > 0) {
      setSelectedNode(nodes[0]);
    }
  }, []);

  useOnSelectionChange({
    onChange,
  });
  return (
    <>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={25}>
          <div>
            <div className="flex gap-1">
              <div
                onClick={() => {
                  alert('드래그앤드롭!!!');
                }}
                onDragStart={(event) => onDragStart(event, 'tableNode')}
                draggable
              >
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => {
                    alert('컬럼추가');
                  }}
                >
                  <Sheet className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    alert('테이블 삭제');
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <div>
                <p>{selectedNode && selectedNode?.id}</p>
                <p>{selectedNode && selectedNode?.type}</p>
                <p>
                  {selectedNode && (
                    <Input
                      type="email"
                      placeholder="테이블명"
                      value={selectedNode && selectedNode?.data?.tableName}
                      onChange={(e) => {
                        console.log('onChange...');
                        console.log(e.target.value);
                      }}
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
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
    </>
  );
};

export default TopRightPanel;
