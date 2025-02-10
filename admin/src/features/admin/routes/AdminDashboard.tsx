import { Card, CardBody } from '@nextui-org/react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '12', color: 'primary' },
    { title: 'Total Houses', value: '56', color: 'success' },
    { title: 'Total Subscriptions', value: '7', color: 'warning' },
    { title: 'Revenue', value: '12,345', color: 'secondary' },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="w-full">
            <CardBody className="text-center">
              <p className="text-sm text-default-500">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
