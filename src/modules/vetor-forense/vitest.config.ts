import { defineConfig } from 'vitest/config';

// Executar: node node_modules/vitest/vitest.mjs run --config=src/modules/vetor-forense/vitest.config.ts
export default defineConfig({ esbuild: { jsx: 'automatic' }, test: { environment: 'node', include: ['src/modules/vetor-forense/**/*.test.{ts,tsx}'] } });
