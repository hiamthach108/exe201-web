import { useQuery } from '@tanstack/react-query';
import { getRevenuePerformance } from '../../api';
import { CardBody, Skeleton, Tooltip } from '@nextui-org/react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from 'recharts';

const AdminWeeklyPerformance = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['revenue-performance'],
    queryFn: async () => {
      const response = await getRevenuePerformance();

      return response.data;
    },
  });

  if (isLoading) return <Skeleton className="h-[400px]" />;

  return (
    <CardBody className="h-[400px]">
      <h3 className="text-xl font-semibold mb-4">Weekly Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data?.data}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" name="Revenue ($)" />
        </BarChart>
      </ResponsiveContainer>
    </CardBody>
  );
};

export default AdminWeeklyPerformance;
