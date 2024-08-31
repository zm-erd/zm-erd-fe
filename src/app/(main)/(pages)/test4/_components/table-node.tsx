import { useCallback, useEffect } from 'react';
import { Handle, Position, useReactFlow, useStore } from '@xyflow/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const handleStyle = { left: 10 };

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
      {/*{isSelected && (*/}
      {/*  <div className="flex justify-end space-x-2 bg-gray-100 p-2">*/}
      {/*    <Button size="sm">편집</Button>*/}
      {/*    <Button size="sm" variant="destructive">*/}
      {/*      삭제*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*)}*/}
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
