import cors from "cors";

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.API_GATEWAY_URL,
      "http://localhost:3000"
    ];

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
