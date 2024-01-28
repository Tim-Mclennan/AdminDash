import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfig from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfig(), react()],
});
