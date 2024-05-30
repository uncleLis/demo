import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import dotenv from "dotenv";
// https://vitejs.dev/config/
console.log("process.env.NODE_ENV",__dirname, process.env.NODE_ENV);

const envFiles = [`.env`, `.env.${process.env.NODE_ENV}`];
// 根据文件名获取对应的环境变量
envFiles.forEach((file) => {
  console.log(`${__dirname}/${file}`,'filesss')
  const envConfig = dotenv.parse(readFileSync(`${__dirname}/${file}`));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
});

export default defineConfig({
  plugins: [react()],
});
