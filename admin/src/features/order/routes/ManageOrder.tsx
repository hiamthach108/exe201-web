import { Chip } from '@nextui-org/react';
import OrderTable from '../components/OrderTable';
import { useState } from 'react';
export default function ManageOrder() {

  const [total, setTotal] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-y-6 py-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-[700] leading-[32px]">Order Management</h1>
          {total !== null && <Chip>{total}</Chip>}
        </div>
      </div>

      <OrderTable
        onChangeData={(data) => setTotal(data.total)}
        onEdit={(data) => {
          console.log(data)
        }}
        onDelete={async (ids) => {
          console.log(ids)
        }}
      />
    </div>
  );
}
