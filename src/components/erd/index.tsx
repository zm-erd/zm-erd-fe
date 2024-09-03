import { DnDProvider } from '@/components/erd/dnd-context';
import { ReactFlowProvider } from '@xyflow/react';
import React from 'react';
import DndFlow from '@/components/erd/dnd-flow';

const Erd = () => {
  return (
    <div className="h-full">
      <ReactFlowProvider>
        <DnDProvider>
          <DndFlow />
        </DnDProvider>
      </ReactFlowProvider>
    </div>
  );
};

export default Erd;
