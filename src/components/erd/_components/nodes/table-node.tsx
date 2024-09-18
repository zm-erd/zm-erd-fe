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

import './table-node.css';

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
        <TableCaption>{data?.tableComment}</TableCaption>
        <TableHeader>
          <TableRow className="border-black">
            <TableHead colSpan={5} className="border-black">
              {data?.tableName}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.columns.map((column) => (
              <TableRow key={column.columnName} className="border-black">
                <TableCell className="border-black">
                  {column.columnType}
                </TableCell>
                <TableCell className="border-black">
                  {column.columnName}
                </TableCell>
                <TableCell className="border-black">
                  {column.columnComment}
                </TableCell>
                <TableCell className="border-black">
                  {column.columnDataType}
                </TableCell>
                <TableCell className="text-right">
                  {column.notNull ? 'NOT NULL' : 'NULL'}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableNode;
