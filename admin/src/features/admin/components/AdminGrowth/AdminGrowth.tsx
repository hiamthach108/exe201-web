import { useQuery } from '@tanstack/react-query';
import { getRevenueGrowth, getUserGrowth } from '../../api';
import { CardBody, Skeleton } from '@nextui-org/react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { useMemo } from 'react';

const AdminGrowth = () => {
  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ['revenue-growth'],
    queryFn: async () => {
      const response = await getRevenueGrowth();

      return response.data;
    },
  });

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['user-growth'],
    queryFn: async () => {
      const response = await getUserGrowth();

      return response.data;
    },
  });

  const growthData = useMemo(() => {
    if (!revenueData || !userData) return null;

    const data = revenueData.data.map((revenue) => {
      const user = userData.data.find((user) => user.period === revenue.period);

      return {
        period: revenue.period,
        revenue: revenue.value,
        users: user?.value,
      };
    });

    return { data };
  }, [revenueData, userData]);

  console.log(growthData);

  const isLoading = revenueLoading || userLoading;

  if (isLoading) return <Skeleton className="h-[400px]" />;

  return (
    <CardBody className="h-[400px]">
      <h3 className="text-xl font-semibold mb-4">Growth Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={growthData?.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="users" stroke="#8884d8" name="Users" />
          <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue" />
        </LineChart>
      </ResponsiveContainer>
    </CardBody>
  );
};

export default AdminGrowth;
