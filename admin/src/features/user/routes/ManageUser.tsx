import { Chip } from '@nextui-org/react';
import UserTable from '../components/UserTable';
import { useState } from 'react';

export default function ManageUser() {
  const [total, setTotal] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-y-6 py-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-[700] leading-[32px]">User Management</h1>
          {total !== null && <Chip>{total}</Chip>}
        </div>
      </div>

      <UserTable onChangeData={(data) => setTotal(data.total)} />
    </div>
  );
}
