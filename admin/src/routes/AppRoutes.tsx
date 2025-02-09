import Error from '@/components/Error';
import AdminDashboard from '@/features/admin/routes/AdminDashboard';
import { GoogleOAuthCallbackPage, LoginPage } from '@/features/auth';
import ManageEvent from '@/features/event/routes/ManageEvent';
import ManageHouse from '@/features/house/routes/ManageHouse';
import AdminLayout from '@/layouts/AdminLayout';
import { Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />} path="/">
        <Route index element={<AdminDashboard />} />
        <Route path="manage-event" element={<ManageEvent />} />
        <Route path="manage-house" element={<ManageHouse />} />
      </Route>
      <Route path="auth/google/callback" element={<GoogleOAuthCallbackPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}
