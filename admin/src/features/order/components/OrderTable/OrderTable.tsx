import { IPagination, NextUIColor, TableHeaderItem } from '@/common/types';
import { PaymentStatusEnum, IOrder, useGetOrders, PaymentProviderEnum } from '@/features/order'; // Updated imports
import {
  Button,
  Chip,
  Input,
  Pagination,
  Select,
  Selection,
  SelectItem,
  SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import get from 'lodash/get';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { TbAdjustmentsHorizontal, TbSortAscending } from 'react-icons/tb';

const statusColorMap: Record<PaymentStatusEnum, NextUIColor> = {
  [PaymentStatusEnum.Success]: 'success',
  [PaymentStatusEnum.Pending]: 'warning',
  [PaymentStatusEnum.Cancelled]: 'danger',
  [PaymentStatusEnum.Failed]: 'danger',
};

export default function OrderTable({
  onChangeData,
  onDelete,
  onEdit,
}: {
  onChangeData?: (data: IPagination<IOrder>) => void;
  onDelete?: (ids: string[]) => void;
  onEdit?: (data: IOrder) => void;
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setFilter] = useState<Partial<IOrder>>({});
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<string>([]));

  const columns: TableHeaderItem[] = useMemo(
    () => [
      { key: 'orderCode', label: 'Order Code', sortable: true },
      { key: 'amount', label: 'Price' },
      { key: 'description', label: 'Description' },
      { key: 'status', label: 'Status' },
      { key: 'provider', label: 'Provider' },
      { key: 'createdAt', label: 'Created At', sortable: true },
    ],
    [],
  );

  const { data: Orders, isFetching } = useGetOrders({
    page: page - 1,
    pageSize,
    filter,
    sortOrder: sortDescriptor?.direction === 'ascending' ? 'asc' : 'desc',
    sortBy: sortDescriptor?.column as string,
  });

  useEffect(() => {
    if (onChangeData && Orders) {
      onChangeData(Orders.data);
    }
  }, [Orders, onChangeData]);

  useEffect(() => setPage(1), [filter, pageSize]);

  const renderCell = useCallback(
    (Order: IOrder, columnKey: keyof IOrder | 'actions') => {
      const cellValue = Order[columnKey as keyof IOrder];
      switch (columnKey) {
        case 'status':
          return (
            <Chip className="capitalize" color={statusColorMap[Order.status]} size="sm" variant="flat">
              {
                {
                  [PaymentStatusEnum.Success]: 'Success',
                  [PaymentStatusEnum.Pending]: 'Pending',
                  [PaymentStatusEnum.Cancelled]: 'Cancelled',
                  [PaymentStatusEnum.Failed]: 'Failed',
                }[Order.status]
              }
            </Chip>
          );
        case 'provider':
          return (
            <Chip className="capitalize" color={'primary'} size="sm" variant="flat">
              {
                {
                  [PaymentProviderEnum.None]: 'None',
                  [PaymentProviderEnum.PayOS]: 'PayOS',
                  [PaymentProviderEnum.ZaloPay]: 'ZaloPay',
                  [PaymentProviderEnum.MoMo]: 'MoMo',
                  [PaymentProviderEnum.VNPay]: 'VNPay',
                  [PaymentProviderEnum.PayPal]: 'PayPal',
                }[Order.provider]
              }
            </Chip>
          );
        case 'createdAt':
          return cellValue ? new Date(cellValue as string).toLocaleString() : '';
        case 'amount':
          return cellValue ? `$${Number(cellValue).toLocaleString()}` : '';
        default:
          return cellValue ? String(cellValue) : '';
      }
    },
    [onDelete, onEdit, selectedKeys],
  );

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-end gap-3">
          <Input
            value={filter?.description}
            onChange={(e) => setFilter((filter: any) => ({ ...filter, description: e.target.value }))}
            className="w-fit"
            placeholder="Search..."
            endContent={<IoIosSearch size={16} className="text-default-400" />}
          />
          <Button
            size="sm"
            className="bg-default-100 text-default-800"
            startContent={<TbAdjustmentsHorizontal size={16} className="text-default-400" />}
          >
            Filter
          </Button>
          <Button
            size="sm"
            className="bg-default-100 text-default-800"
            startContent={<TbSortAscending size={16} className="text-default-400" />}
          >
            Sort
          </Button>
        </div>
        <div className="flex items-center gap-3 text-default-400 text-small">
          <label className="flex-shrink-0">Rows per page:</label>
          <Select
            defaultSelectedKeys={[pageSize.toString()]}
            multiple={false}
            className="bg-transparent outline-none text-default-400 text-small"
            classNames={{ mainWrapper: 'w-16' }}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <SelectItem key="5">5</SelectItem>
            <SelectItem key="10">10</SelectItem>
            <SelectItem key="15">15</SelectItem>
          </Select>
        </div>
      </div>

      <Table
        isHeaderSticky
        classNames={{ wrapper: 'max-h-[calc(100vh-200px)]' }}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => keys instanceof Set && setSelectedKeys(keys)}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        aria-label="Order table with dynamic content"
        bottomContent={
          Orders && Orders.data.total > 0 ? (
            <div className="flex w-full justify-center gap-6">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={Math.ceil(Orders.data.total / pageSize) > 0 ? Math.ceil(Orders.data.total / pageSize) : 1}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              className="font-semibold uppercase"
              align={column.key === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
              key={column.key}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isFetching}
          loadingContent={<Spinner color="warning" label="Loading..." />}
          emptyContent={'No data'}
        >
          {Orders
            ? get(Orders, 'data.data', []).map((row: IOrder) => (
                <TableRow key={row.id}>
                  {(columnKey) => <TableCell>{renderCell(row, columnKey as keyof IOrder)}</TableCell>}
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </>
  );
}
