import dotenv from "dotenv";
import path from "path";

const NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.join(process.cwd(), `.env.${NODE_ENV}`)
});

export default NODE_ENV;
