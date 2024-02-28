import { getAccessToken, getLastTokenRefresh } from '@utils/auth/storeJwtUtils';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	element: React.ReactNode;
	blockAuthRoutes?: boolean;
	[x: string]: any;
}

function ProtectedRoute({
	element,
	blockAuthRoutes,
	...rest
}: ProtectedRouteProps) {
	const hasToken = !!getAccessToken();
	const lastTokenRefresh = new Date(getLastTokenRefresh() || 0);
	const timeSinceLastTokenRefresh = Date.now() - lastTokenRefresh.getTime();
	const wasInTheLast90Days =
		timeSinceLastTokenRefresh < 1000 * 60 * 60 * 24 * 90;

	const isAuthenticated = hasToken && wasInTheLast90Days;

	if (blockAuthRoutes) {
		return isAuthenticated ? <Navigate to='/' /> : element;
	} else {
		return isAuthenticated ? element : <Navigate to='/login' />;
	}
}

export default ProtectedRoute;
