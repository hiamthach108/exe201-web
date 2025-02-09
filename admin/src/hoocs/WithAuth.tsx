// create hoocs WithAuth to check if user is authenticated or not and redirect to login page if not authenticated or expired token
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/libs/store';

const WithAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const { user } = useAuthStore();

    // Render the wrapped component if authenticated
    return user ? <WrappedComponent {...props} /> : <Navigate to="/login" />;
  };

  // Set the display name for the wrapped component for better debugging experience
  Wrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return Wrapper;
};

export default WithAuth;
