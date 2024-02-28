import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	// Used for Docker Container port mapping
	server: {
		watch: {
			usePolling: true,
		},
		host: true, // needed for the Docker Container port mapping to work
		strictPort: true,
		port: 5173,
	},

	resolve: {
		alias: {
			'@pages': '/src/pages',
			'@components': '/src/components',
			'@utils': '/src/utils',
			'@state': '/src/state',
			'@routes': '/src/routes',
		},
	},
});
