/****** core modules import here *******/
import cors from "cors";
import express from "express";


/*******internal files import here *******/
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';


/****** express app initilazation here *******/
const app = express();



/********* Body Data Parse **********/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/*********** Middleware Here ***********/
/*********** CORS  Middleware Here ***********/
const allowedOrigins = [
    process.env.API_GETWAY_URL,
    "http://localhost:3000",
];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // allow non-browser requests
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);


// health check
app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        service: "bed manager services",
        uptime: process.uptime(),
    });
});


app.use(errorHandler);
app.use(notFound);


/******* Export the module ******/
export default app;
