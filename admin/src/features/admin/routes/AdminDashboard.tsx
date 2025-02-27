import { Card, CardBody, Button, Avatar, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FiUsers, FiHome, FiDollarSign, FiAward } from 'react-icons/fi';
import { createOrder } from '@/features/order';
import toast from 'react-hot-toast';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from "@microsoft/signalr";


import get from 'lodash/get'
import { useEffect } from 'react';
import { useAuthStore } from '@/libs/store';

interface Booking {
  id: number;
  user: string;
  house: string;
  date: string;
  amount: string;
}

const AdminDashboard = () => {

  const { accessToken } = useAuthStore()

  const stats = [
    { title: 'Total Users', value: '12', change: '+12.5%', icon: <FiUsers className="w-6 h-6" />, color: 'primary' },
    { title: 'Total Houses', value: '36', change: '+5.2%', icon: <FiHome className="w-6 h-6" />, color: 'success' },
    { title: 'Revenue', value: '10,000đ', change: '+8.1%', icon: <FiDollarSign className="w-6 h-6" />, color: 'secondary' },
    { title: 'Subscription', value: '4', change: '+40%', icon: <FiAward className="w-6 h-6" />, color: 'warning' },
  ];

  // Sample data for new users chart
  const newUsersData = [
    { name: 'Jan', users: 400, revenue: 2400 },
    { name: 'Feb', users: 700, revenue: 3600 },
    { name: 'Mar', users: 1200, revenue: 4800 },
    { name: 'Apr', users: 1500, revenue: 6000 },
    { name: 'May', users: 2100, revenue: 7200 },
    { name: 'Jun', users: 2500, revenue: 8400 },
  ];

  // Sample data for daily revenue
  const revenueData = [
    { name: 'Mon', revenue: 1200, bookings: 15 },
    { name: 'Tue', revenue: 1500, bookings: 20 },
    { name: 'Wed', revenue: 2000, bookings: 25 },
    { name: 'Thu', revenue: 1800, bookings: 18 },
    { name: 'Fri', revenue: 2400, bookings: 30 },
    { name: 'Sat', revenue: 3000, bookings: 35 },
    { name: 'Sun', revenue: 2800, bookings: 28 },
  ];

  // Sample data for house availability
  const houseData = [
    { name: 'Rented', value: 35 },
    { name: 'Available', value: 21 },
  ];

  // Recent bookings data
  const recentBookings: Booking[] = [
    { id: 1, user: 'Thành Nhân', house: 'Căn hộ Quận 2', date: '2025-02-17',  amount: '10,000,000' },
    { id: 2, user: 'Văn Hùng', house: 'Căn hộ Quận 3', date: '2025-02-17',  amount: '8,500,000' },
    { id: 3, user: 'Văn A', house: 'Nhà trọ Thủ Đức', date: '2025-02-16', amount: '4,000,000' },
    { id: 4, user: 'Vân Anh', house: 'Nhà trung tâm thành phố', date: '2025-02-16',  amount: '6,900,000' },
    { id: 5, user: 'Văn Thanh', house: 'Nhà Gò Vấp', date: '2025-02-15',  amount: '3,500,000' },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  useEffect(() => {
   const connection = new HubConnectionBuilder()
    .withUrl(`http://localhost:5000/chat`, {
      accessTokenFactory: () => accessToken ?? "", // Add your auth token here
      skipNegotiation: true,  // skipNegotiation as we specify WebSockets
      transport: HttpTransportType.WebSockets
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

    connection.start().then(() => {
      toast.success('Connection established! 🎉');
    }).catch(err => {
      console.log(err)
      toast.error('Error establishing connection 😢');
    });

    connection.on("ReceiveMessage", (user, message) => {
      console.log('ReceiveMessage', user, message)
      toast.success(`${user}: ${message}`);
    });

  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex gap-3">
          <Button color="primary" variant="flat">Download Report</Button>
          <Button color="primary"
            onClick={() => {
              const domain = window.location.origin;

              createOrder({
                "planId": "f5752a23-05fb-496a-bc04-518618c8b824",
                "returnUrl": `${domain}/manage-order`,
                "cancelUrl": `${domain}/manage-order` 
              }).then((res) => {
                console.log('Order', res)
                const  redirectUrl = get(res, 'data.order.orderData.checkoutUrl', '')
                if (redirectUrl) {
                  window.location.href = redirectUrl
                }
              })
            }}
          >Subscribe</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="w-full">
            <CardBody className="flex flex-row items-center justify-between p-4">
              <div>
                <p className="text-sm text-default-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                  {stat.change} this month
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}/20`}>
                {stat.icon}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="w-full">
          <CardBody className="h-[400px]">
            <h3 className="text-xl font-semibold mb-4">Growth Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={newUsersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="users" stroke="#8884d8" name="Users" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card className="w-full">
          <CardBody className="h-[400px]">
            <h3 className="text-xl font-semibold mb-4">Weekly Performance</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
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
              <Button size="sm" variant="flat">View All</Button>
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
