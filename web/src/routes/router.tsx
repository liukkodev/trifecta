import HomePage from '@pages/Home/Home';
import LoginPage from '@pages/Auth/Login';
import NotFound from '@pages/404';
import ProtectedRoute from '@routes/protectedRoute';
import RegisterPage from '@pages/Auth/Register';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedRoute element={<HomePage />} />,
		errorElement: <NotFound />,
	},
	{
		path: '/register',
		element: <ProtectedRoute element={<RegisterPage />} blockAuthRoutes />,
	},
	{
		path: '/login',
		element: <ProtectedRoute element={<LoginPage />} blockAuthRoutes />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;
