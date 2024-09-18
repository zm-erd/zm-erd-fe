import { DnDProvider } from '@/components/erd/_components/dnd-context';
import { ReactFlowProvider } from '@xyflow/react';
import React from 'react';
import DndFlow from '@/components/erd/_components/dnd-flow';
import '@/components/erd/index.css';

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
