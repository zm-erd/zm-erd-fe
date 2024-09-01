import React, { useCallback, useState } from 'react';
import { useDnD } from './dnd-context';
import { useOnSelectionChange } from '@xyflow/react';
import { Sheet, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

function SelectionDisplay() {
  // const [selectedNodes, setSelectedNodes] = useState([]);
  // const [selectedEdges, setSelectedEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onChange = useCallback(({ nodes, edges }) => {
    // setSelectedNodes(nodes.map((node) => node.id));
    // setSelectedEdges(edges.map((edge) => edge.id));
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
    <div>
      <p>{selectedNode && selectedNode?.data?.tableName}</p>
      <p>{selectedNode && selectedNode?.id}</p>
      <p>{selectedNode && selectedNode?.type}</p>
    </div>
  );
}

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
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
        <SelectionDisplay />
      </div>
    </div>
  );
};
