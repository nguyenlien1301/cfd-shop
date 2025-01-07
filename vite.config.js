import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPath from "vite-jsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), jsconfigPath()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  //   server: {
  //     host: "0.0.0.0", // Mở cổng để các thiết bị khác trong cùng mạng có thể truy cập
  //     port: 3001, // Đảm bảo trùng với cổng bạn đang chạy (có thể thay đổi nếu cần)
  //   },
});
