import React from 'react';
import { useDnD } from './dnd-context';

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, 'tableNode')}
        draggable
      >
        테이블 생성
      </div>
    </aside>
  );
};
