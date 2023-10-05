import {
    Table as NextuiTable,
    TableBody,
    TableHeader,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
    Spinner,
} from '@nextui-org/react';
import { Key } from 'react';

interface TableProps<T> {
    columns: { key: string; label: string }[];
    rows: Array<{ key: string } & T>;
    isLoading?: boolean;
    renderCell?: (item: T, columnKey: Key) => React.ReactNode;
}

const Table = <T,>({
    columns,
    rows,
    isLoading = false,
    renderCell,
}: TableProps<T>) => {
    return (
        <NextuiTable className="max-w-fit" aria-label="Dynamic Content">
            <TableHeader columns={columns}>
                {(column: any) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={rows}
                emptyContent={'No data found.'}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
            >
                {(item: any) => (
                    <TableRow
                        className={item?.currentUser ? 'bg-gray-300/25' : ''}
                        key={item.key}
                    >
                        {(columnKey) => (
                            <TableCell>
                                {renderCell
                                    ? renderCell(item, columnKey)
                                    : getKeyValue(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </NextuiTable>
    );
};

export default Table;
