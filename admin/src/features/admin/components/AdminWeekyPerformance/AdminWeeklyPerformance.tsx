import { useQuery } from '@tanstack/react-query';
import { getRevenueGrowth } from '../../api';
import { CardBody, Skeleton } from '@nextui-org/react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
  TooltipProps,
} from 'recharts';
import { useMemo } from 'react';

const AdminWeeklyPerformance = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['revenue-growth'],
    queryFn: async () => {
      const response = await getRevenueGrowth();
      return response.data;
    },
  });

  const growthData = useMemo(() => {
    if (!data) return null;

    return {
      data: data.data
        .filter((item) => item.value >= 50000)
        .sort((a, b) => {
          const splittedA = a.period.split(' ');
          const splittedB = b.period.split(' ');
          return Number(splittedA[1]) - Number(splittedB[1]);
        }),
    };
  }, [data]);

  if (isLoading) return <Skeleton className="h-[400px]" />;

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#82ca9d]" />
            <p className="text-sm font-medium">{data.period}</p>
          </div>
          <p className="text-sm font-semibold text-[#82ca9d]">{`${data.value.toLocaleString()}đ`}</p>
        </div>
      </div>
    );
  };

  return (
    <CardBody className="h-[400px]">
      <h3 className="text-xl font-semibold mb-4">Revenue Growth</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={growthData?.data}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="period" interval={0} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" name="Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </CardBody>
  );
};

export default AdminWeeklyPerformance;
