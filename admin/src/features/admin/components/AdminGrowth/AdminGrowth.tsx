import { useQuery } from '@tanstack/react-query';
import { getUserGrowth } from '../../api';
import { CardBody, Skeleton } from '@nextui-org/react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { useMemo } from 'react';

const AdminGrowth = () => {
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['user-growth'],
    queryFn: async () => {
      const response = await getUserGrowth();
      return response.data;
    },
  });

  const growthData = useMemo(() => {
    if (!userData) return null;

    return {
      data: userData.data.sort((a, b) => {
        const splittedA = a.period.split(' ');
        const splittedB = b.period.split(' ');
        return Number(splittedA[1]) - Number(splittedB[1]);
      }),
    };
  }, [userData]);

  if (userLoading) return <Skeleton className="h-[400px]" />;

  return (
    <CardBody className="h-[440px]">
      <h3 className="text-xl font-semibold mb-4">User Growth</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={growthData?.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" name="Users" />
        </LineChart>
      </ResponsiveContainer>
    </CardBody>
  );
};

export default AdminGrowth;
