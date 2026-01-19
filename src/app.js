import express from "express";
import helmet from "helmet";

import corsMiddleware from "./config/cors.js";
import routes from "./routes/index.js";
import notFound from "./common/middlewares/notFound.js";
import {errorHandler} from "./common/middlewares/errorMiddleware.js";

const app = express();

// security
app.use(helmet());

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(corsMiddleware);

// ROOT HEALTH CHECK
app.get("/", (req, res) => {
  res.status(200).json({
    service: "Bed Manager",
    status: "Running"
  });
});

// routes
app.use("/api/v1", routes);

// error handlers (always last)
app.use(notFound);
app.use(errorHandler);


export default app;
