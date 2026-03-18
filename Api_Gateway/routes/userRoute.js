import { createProxyMiddleware } from "http-proxy-middleware";

const userProxy = createProxyMiddleware({
  target: process.env.USER_SERVICE,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    return "/api/v1/user" + path; // add prefix back
  },
});

export default userProxy;