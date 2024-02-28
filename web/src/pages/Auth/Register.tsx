import { authApi } from '@state/apis/authApi';
import { Box, Button, Flex, Group, TextInput, Title } from '@mantine/core';
import { NotificationColor, showNotification } from '@components/Notification';
import { RegisterFormValues, RegisterResponse } from '@pages/Auth/authUtils';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
	const [register] = authApi.useRegisterMutation();
	const navigate = useNavigate();

	const form = useForm<RegisterFormValues>({
		initialValues: {
			email: '',
			username: '',
			password: '',
		},

		validate: (values) => {
			const errors: Record<string, string> = {};

			if (
				!values.email ||
				values.email.trim().length < 5 ||
				!values.email.includes('@')
			) {
				errors.email = 'Email is required and must be at least 5 characters';
			}

			if (!values.username || values.username.trim().length < 3) {
				errors.username =
					'Username is required and must be at least 3 characters';
			}

			if (!values.password || values.password.trim().length < 6) {
				errors.password =
					'Password is required and must be at least 6 characters';
			}

			return errors;
		},
	});

	const handleSubmit = form.onSubmit(async (values) => {
		try {
			const res: RegisterResponse = await register({
				...values,
			});

			if (res.error) {
				showNotification({
					title: 'Registeration',
					message: 'Registeration failed!',
					color: NotificationColor.RED,
				});
				return;
			} else {
				showNotification({
					title: 'Registeration',
					message: 'You are now a registered user!',
					color: NotificationColor.GREEN,
				});
				navigate('/login');
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
					Register
				</Title>

				<form onSubmit={handleSubmit}>
					<TextInput
						type='email'
						withAsterisk
						label='Email'
						placeholder='name@example.com'
						{...form.getInputProps('email')}
					/>
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
							onClick={() => navigate('/login')}
						>
							Login instead
						</Button>
					</Flex>
				</form>
			</Box>
		</Flex>
	);
};

export default RegisterPage;
