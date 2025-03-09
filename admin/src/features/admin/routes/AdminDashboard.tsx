import {
  Card,
  CardBody,
  Button,
  Avatar,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import { Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import AdminOverview from '../components/AdminOverview';
import AdminGrowth from '../components/AdminGrowth';
import AdminWeeklyPerformance from '../components/AdminWeekyPerformance/AdminWeeklyPerformance';

interface Booking {
  id: number;
  user: string;
  house: string;
  date: string;
  amount: string;
}

const AdminDashboard = () => {
  // Sample data for house availability
  const houseData = [
    { name: 'Rented', value: 35 },
    { name: 'Available', value: 21 },
  ];

  // Recent bookings data
  const recentBookings: Booking[] = [
    { id: 1, user: 'Thành Nhân', house: 'Căn hộ Quận 2', date: '2025-02-17', amount: '10,000,000' },
    { id: 2, user: 'Văn Hùng', house: 'Căn hộ Quận 3', date: '2025-02-17', amount: '8,500,000' },
    { id: 3, user: 'Văn A', house: 'Nhà trọ Thủ Đức', date: '2025-02-16', amount: '4,000,000' },
    { id: 4, user: 'Vân Anh', house: 'Nhà trung tâm thành phố', date: '2025-02-16', amount: '6,900,000' },
    { id: 5, user: 'Văn Thanh', house: 'Nhà Gò Vấp', date: '2025-02-15', amount: '3,500,000' },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex gap-3">
          <Button color="primary" variant="flat">
            Download Report
          </Button>
        </div>
      </div>

      <AdminOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="w-full">
          <AdminGrowth />
        </Card>

        <Card className="w-full">
          <AdminWeeklyPerformance />
        </Card>

        <Card className="w-full">
          <CardBody className="h-[400px]">
            <h3 className="text-xl font-semibold mb-4">House Availability</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={houseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {houseData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Recent Posts</h3>
              <Button size="sm" variant="flat">
                View All
              </Button>
            </div>
            <Table aria-label="Recent bookings table">
              <TableHeader>
                <TableColumn>USER</TableColumn>
                <TableColumn>HOUSE</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>PRICE</TableColumn>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar size="sm" src={`https://i.pravatar.cc/150?u=${booking.id}`} />
                        {booking.user}
                      </div>
                    </TableCell>
                    <TableCell>{booking.house}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
