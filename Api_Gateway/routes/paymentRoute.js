import { createProxyMiddleware } from "http-proxy-middleware";

const paymentProxy = createProxyMiddleware({
  target: process.env.PAYMENT_SERVICE,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    return "/api/v1/payment" + path; // add prefix back
  },
});

export default paymentProxy;