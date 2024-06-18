import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: './vitest.setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8',
      include: ['src/components/**/*.{ts,tsx}', 'src/lib/**/*.ts'],
      exclude: ['src/tests/**/*', 'src/lib/config.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})