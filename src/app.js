import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

// ✅ Serve static files FIRST
app.use(express.static(path.join(__dirname, "public")));

// Routers
import libraryRouter from "./routes/library.routes.js";
import aboutUsRouter from "./routes/aboutUs.routes.js";
import registrationRouter from "./routes/registration.routes.js";
import homeRouter from "./routes/home.routes.js";

app.use("/library", libraryRouter);
app.use("/aboutUs", aboutUsRouter);
app.use("/registration", registrationRouter);
app.use("/home", homeRouter);
app.use("/", homeRouter); // fallback

// Export the app
export { app };
