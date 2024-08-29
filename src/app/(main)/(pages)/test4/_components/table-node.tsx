import { useCallback } from 'react';
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

function TableNode({ id, data, isConnectable }) {
  const { setNodes } = useReactFlow();
  const isSelected = useStore(
    useCallback(
      (store) => store.selectedElements?.some((el) => el.id === id),
      [id],
    ),
  );

  return (
    <div
      className={`border border-black bg-white ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      {isSelected && (
        <div className="flex justify-end space-x-2 bg-gray-100 p-2">
          <Button size="sm">편집</Button>
          <Button size="sm" variant="destructive">
            삭제
          </Button>
        </div>
      )}
      <Table className="border-collapse">
        <TableCaption>커스텀 테이블 노드 입니다만?</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-black">
            <TableHead colSpan={2} className="w-1/2 border-r border-black">
              <Input type="text" placeholder="테이블명" className="w-full" />
            </TableHead>
            <TableHead colSpan={2} className="w-1/2">
              <Input type="text" placeholder="테이블설명" className="w-full" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b border-black">
            <TableCell className="border-r border-black font-medium">
              키표시(PK, FK)
            </TableCell>
            <TableCell className="border-r border-black font-medium">
              컬럼명
            </TableCell>
            <TableCell className="border-r border-black font-medium">
              컬럼타입
            </TableCell>
            <TableCell className="text-right">설명</TableCell>
          </TableRow>
          <TableRow className="border-b border-black">
            <TableCell className="border-r border-black font-medium">
              키표시(PK, FK)
            </TableCell>
            <TableCell className="border-r border-black font-medium">
              컬럼명
            </TableCell>
            <TableCell className="border-r border-black font-medium">
              컬럼타입
            </TableCell>
            <TableCell className="text-right">설명</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default TableNode;
