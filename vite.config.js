import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": "/src/components",
      "@/utils": "/src/utils",
      "@/hooks": "/src/hooks",
    },
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "192.168.5.222:9729/api/v1/office/school/get-all-school/:wid", // Replace with your backend URL
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, "/api"), // Optional if needed
  //     },
  //   },
  // },
});




