import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/connection.js";
import authRoute from "./routes/auth.route.js";
import contractorRoute from "./routes/contractor.route.js";
import serviceProviderRoute from "./routes/serviceProvider.route.js";
import bidRoute from "./routes/bid.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import feedRoute from "./routes/feed.route.js";
import cors from "cors";
const app = express();
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "config/.env",
  });
}

app.use(
  cors({
    origin: process.env.Client_URL,
    credentials: true,
  })
);

// Load environment variables only if not in production

connectDB();
const PORT = process.env.PORT || 8000;

// Initialize express

// Top level middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
// Test route
app.get("/", (req, res) => {
  res.send(process.env.Client_URL);
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/contractor", contractorRoute);
app.use("/api/service-provider", serviceProviderRoute);
app.use("/api/bid", bidRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/posts", feedRoute);

// Listen to port
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
