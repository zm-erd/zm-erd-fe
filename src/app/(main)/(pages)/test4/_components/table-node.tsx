import { useCallback, useEffect } from 'react';
import { useReactFlow, useStore } from '@xyflow/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function TableNode({ id, data, isConnectable, selected }) {
  const style = {
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 5,
    background: selected ? '#ffe' : '#fff',
    borderColor: selected ? '#fb0' : '#ddd',
    boxShadow: selected ? '0 0 10px #fb0' : 'none',
    transition: 'all 0.3s ease',
  };

  const { setNodes } = useReactFlow();
  const isSelected = useStore(
    useCallback(
      (store) => store.selectedElements?.some((el) => el.id === id),
      [id],
    ),
  );

  useEffect(() => {
    console.log('TableNode', id, selected);
  }, [id, selected]);

  return (
    <div style={style}>
      <Table className="border-collapse">
        <TableCaption>테이블설명</TableCaption>
        <TableHeader>
          <TableRow className="border-black">
            <TableHead colSpan={5} className="border-black">
              테이블명
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-black">
            <TableCell className="border-black font-medium">PK</TableCell>
            <TableCell className="border-black font-medium">컬럼</TableCell>
            <TableCell className="border-black font-medium">코멘트</TableCell>
            <TableCell className="border-black font-medium">컬럼타입</TableCell>
            <TableCell className="text-right">NotNull여부</TableCell>
          </TableRow>
          <TableRow className="border-black">
            <TableCell className="border-black font-medium">PK</TableCell>
            <TableCell className="border-black font-medium">컬럼</TableCell>
            <TableCell className="border-black font-medium">코멘트</TableCell>
            <TableCell className="border-black font-medium">컬럼타입</TableCell>
            <TableCell className="text-right">NotNull여부</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default TableNode;
