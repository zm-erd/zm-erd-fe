import React, { useCallback, useState } from 'react';
import { useDnD } from './dnd-context';
import { useOnSelectionChange } from '@xyflow/react';
import { Sheet } from 'lucide-react';

import { Button } from '@/components/ui/button';
function SelectionDisplay() {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);

  const onChange = useCallback(({ nodes, edges }) => {
    setSelectedNodes(nodes.map((node) => node.id));
    setSelectedEdges(edges.map((edge) => edge.id));
  }, []);

  useOnSelectionChange({
    onChange,
  });

  return (
    <div>
      <p>Selected nodes: {selectedNodes.join(', ')}</p>
      <p>Selected edges: {selectedEdges.join(', ')}</p>
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
      <div onDragStart={(event) => onDragStart(event, 'tableNode')} draggable>
        <Button>
          <Sheet className="h-4 w-4" />
        </Button>
      </div>
      <div>
        <SelectionDisplay />
      </div>
    </div>
  );
};
