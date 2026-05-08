import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';

export function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isLocalMode = useAuthStore((state) => state.isLocalMode);

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center text-slate-400">
        Loading session…
      </div>
    );
  }

  if (!user && !isLocalMode) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
