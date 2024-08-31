import React, { useCallback, useState } from 'react';
import { useDnD } from './dnd-context';
import { useOnSelectionChange } from '@xyflow/react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

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
    <aside>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div
            className="dndnode output"
            onDragStart={(event) => onDragStart(event, 'tableNode')}
            draggable
          >
            테이블 생성
          </div>
          <div>
            <SelectionDisplay />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>컬럼 상세 정보</ResizablePanel>
      </ResizablePanelGroup>
    </aside>
  );
};
