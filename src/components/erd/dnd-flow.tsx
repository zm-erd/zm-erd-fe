import React, { useRef } from 'react';

const DndFlow = () => {
  const reactFlowWrapper = useRef(null);

  return (
    <div className="dndflow">
      <h2>Erd 테스트</h2>
      <div className="reactflow-wrapper" ref={reactFlowWrapper}></div>
    </div>
  );
};

export default DndFlow;
