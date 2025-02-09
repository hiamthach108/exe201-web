import AdminNav from '@/features/admin/components/AdminNav';
import { WithAuth } from '@/hoocs';
// import { useAuthStore } from '@/libs/store';
// import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = WithAuth(() => {
  // const { user, setUser } = useAuthStore();
  // useEffect(() => {
  //   if (user && user.roleId !== '999') {
  //     setUser(null);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);
  return (
    <div className="flex relative">
      <AdminNav />
      <div className="flex-1 px-4 relative overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
});

export default AdminLayout;
