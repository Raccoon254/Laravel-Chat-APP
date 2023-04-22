import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
    server: {
        watch: {
            usePolling: true, // Enable polling for files over NFS, etc.
            interval: 1000, // Polling interval
            binaryInterval: 3000, // Binary files polling interval
            ignored: [
                'node_modules/**',
                'vendor/**',
                'storage/**',
                'bootstrap/cache/**',
                'public/**'
            ],
        },
    },
});
