import { authApi } from '@state/apis/authApi';
import { Box, Button, Flex, Group, TextInput, Title } from '@mantine/core';
import { LoginFormValues, LoginResponse } from '@pages/Auth/authUtils';
import { NotificationColor, showNotification } from '@components/Notification';
import {
	setLastTokenRefresh,
	storeAccessToken,
} from '@utils/auth/storeJwtUtils';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
	const [login] = authApi.useLoginMutation();
	const navigate = useNavigate();

	const form = useForm<LoginFormValues>({
		initialValues: {
			username: '',
			password: '',
		},

		validate: (values) => {
			const errors: Record<string, string> = {};

			if (!values.username || values.username.trim().length < 3) {
				errors.username = 'Username must be at least 3 characters';
			}

			if (!values.password || values.password.trim().length < 6) {
				errors.password = 'Password  must be at least 6 characters';
			}

			return errors;
		},
	});

	const handleSubmit = form.onSubmit(async (values) => {
		try {
			const res: LoginResponse = await login(values);

			if (res.error) {
				showNotification({
					title: 'Login',
					message: 'Login failed!',
					color: NotificationColor.RED,
				});
				return;
			}

			if (res.data && res.data.access_token) {
				const accessToken = res.data.access_token;
				storeAccessToken(accessToken);

				showNotification({
					title: 'Login',
					message: 'You are logged in!',
					color: NotificationColor.GREEN,
				});
				setLastTokenRefresh();
				navigate('/');
				return;
			}
		} catch (err) {
			console.error(err);
		}
	});

	return (
		<Flex justify='center' align='center' h='100vh'>
			<Box>
				<Title order={2} mb='sm'>
					Login
				</Title>

				<form onSubmit={handleSubmit}>
					<TextInput
						mt='md'
						withAsterisk
						label='Username'
						placeholder='Your name'
						{...form.getInputProps('username')}
					/>
					<TextInput
						type='password'
						mt='md'
						withAsterisk
						label='Password'
						placeholder='Six character minimum'
						{...form.getInputProps('password')}
					/>

					<Group justify='center' mt='lg'>
						<Button variant='light' onClick={form.reset}>
							Reset
						</Button>
						<Button type='submit'>Submit</Button>
					</Group>

					<Flex justify='center' mt='lg'>
						<Button
							c='blue'
							bg='transparent'
							onClick={() => navigate('/register')}
						>
							Register instead
						</Button>
					</Flex>
				</form>
			</Box>
		</Flex>
	);
};

export default LoginPage;
