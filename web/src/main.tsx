import React from 'react';
import ReactDOM from 'react-dom/client';
import router from '@routes/router';
import store from '@state/store';
import { CookiesProvider } from 'react-cookie';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<CookiesProvider>
				<MantineProvider defaultColorScheme='dark'>
					<Notifications />

					<RouterProvider router={router} />
				</MantineProvider>
			</CookiesProvider>
		</Provider>
	</React.StrictMode>
);
