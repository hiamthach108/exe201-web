import { moneyTextFormat } from '@/libs/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { FiUsers, FiHome, FiDollarSign, FiAward } from 'react-icons/fi';
import { getOverview } from '../../api';
import { Card, CardBody, Skeleton } from '@nextui-org/react';

const AdminOverview = () => {
  const { data: overviewData, isLoading: overviewLoading } = useQuery({
    queryKey: ['overview'],
    queryFn: async () => {
      const data = await getOverview();

      return data.data;
    },
  });

  const stats = useMemo(() => {
    if (!overviewData || !overviewData.data) return [];

    return [
      {
        title: 'Total Users',
        value: overviewData.data.totalUsers,
        icon: <FiUsers className="w-6 h-6" />,
        color: 'primary',
      },
      {
        title: 'Total Houses',
        value: overviewData.data.totalHouses,

        icon: <FiHome className="w-6 h-6" />,
        color: 'success',
      },
      {
        title: 'Revenue',
        value: moneyTextFormat(overviewData.data.totalRevenue) + 'đ',
        icon: <FiDollarSign className="w-6 h-6" />,
        color: 'secondary',
      },
      {
        title: 'Subscription',
        value: overviewData.data?.totalSubscriptions,
        icon: <FiAward className="w-6 h-6" />,
        color: 'warning',
      },
    ];
  }, [overviewData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {overviewLoading && [...Array(4)].map((_, index) => <Skeleton className="h-20 rounded-xl" key={index} />)}

      {stats.map((stat) => (
        <Card key={stat.title} className="w-full">
          <CardBody className="flex flex-row items-center justify-between p-4">
            <div>
              <p className="text-sm text-default-500">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-lg bg-${stat.color}/20`}>{stat.icon}</div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default AdminOverview;
