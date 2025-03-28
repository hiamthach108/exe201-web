import Error from '@/components/Error';
import AdminDashboard from '@/features/admin/routes/AdminDashboard';
import { GoogleOAuthCallbackPage, LoginPage } from '@/features/auth';
import ManageHouse from '@/features/house/routes/ManageHouse';
import ManageOrder from '@/features/order/routes/ManageOrder';
import ManageUser from '@/features/user/routes/ManageUser';
import AdminLayout from '@/layouts/AdminLayout';
import { Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />} path="/">
        <Route index element={<AdminDashboard />} />
        <Route path="manage-house" element={<ManageHouse />} />
        <Route path="manage-order" element={<ManageOrder />} />
        <Route path="manage-plan" element={<div>Manage Plan</div>} />
        <Route path="manage-user" element={<ManageUser />} />
        <Route path="report" element={<div>Report</div>} />
      </Route>
      <Route path="auth/google/callback" element={<GoogleOAuthCallbackPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}
