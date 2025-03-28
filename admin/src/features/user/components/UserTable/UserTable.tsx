import { UserStatusEnum } from '@/common/enum/user';
import { IPagination, NextUIColor, TableHeaderItem } from '@/common/types';
import { IUser, useGetUsers } from '@/features/user';
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
  User,
} from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { TbAdjustmentsHorizontal, TbSortAscending } from 'react-icons/tb';

const statusColorMap: Record<UserStatusEnum, NextUIColor> = {
  [UserStatusEnum.NotVerified]: 'warning',
  [UserStatusEnum.Active]: 'success',
  [UserStatusEnum.Disabled]: 'danger',
};

export default function UserTable({ onChangeData }: { onChangeData?: (data: IPagination<IUser>) => void }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filter, setFilter] = useState<Partial<IUser>>({ fullName: '' });
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<string>([]));

  const columns: TableHeaderItem[] = useMemo(
    () => [
      { key: 'fullName', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'phone', label: 'Phone' },
      { key: 'status', label: 'Status' },
      { key: 'lastLogin', label: 'Last Login', sortable: true },
      { key: 'createdAt', label: 'Created At', sortable: true },
    ],
    [],
  );

  const { data: users, isFetching } = useGetUsers({
    page: page - 1,
    pageSize,
    filter,
    sortOrder: sortDescriptor?.direction === 'ascending' ? 'asc' : 'desc',
    sortBy: sortDescriptor?.column as string,
  });

  useEffect(() => {
    if (onChangeData && users) {
      onChangeData(users);
    }
  }, [users, onChangeData]);

  useEffect(() => setPage(1), [filter, pageSize]);

  const renderCell = useCallback((user: IUser, columnKey: keyof IUser) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case 'fullName':
        return (
          <User
            className="min-w-48 justify-start"
            classNames={{ name: 'line-clamp-2' }}
            avatarProps={{
              radius: 'lg',
              size: 'lg',
              src: user.avatar,
              className: 'flex-shrink-0',
            }}
            name={cellValue}
          />
        );
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {
              {
                [UserStatusEnum.NotVerified]: 'Not Verified',
                [UserStatusEnum.Active]: 'Active',
                [UserStatusEnum.Disabled]: 'Disabled',
              }[user.status]
            }
          </Chip>
        );
      case 'lastLogin':
      case 'createdAt':
        return cellValue ? new Date(cellValue).toLocaleString() : '';
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-end gap-3">
          <Input
            value={filter.fullName}
            onChange={(e) => setFilter((filter: any) => ({ ...filter, fullName: e.target.value }))}
            className="w-fit"
            placeholder="Search by name..."
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
            <SelectItem key="20">20</SelectItem>
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
        aria-label="User table with dynamic content"
        bottomContent={
          users && users.total > 0 ? (
            <div className="flex w-full justify-center gap-6">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={Math.ceil(users.total / pageSize) > 0 ? Math.ceil(users.total / pageSize) : 1}
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
          {users
            ? users.data.map((row: IUser) => (
                <TableRow key={row.id}>
                  {(columnKey) => <TableCell>{renderCell(row, columnKey as keyof IUser)}</TableCell>}
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
    </>
  );
}
