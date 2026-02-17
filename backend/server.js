import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Route imports
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import reportRoutes from "./routes/report.routes.js";
import insightRoutes from "./routes/insight.routes.js";
import voiceRoutes from "./routes/voice.routes.js";
import savingsGoalRoutes from "./routes/savingsGoalRoutes.js";
import investmentGoalRoutes from "./routes/investmentGoalRoutes.js";
import bankRoutes from "./routes/bank.routes.js";
import ocrRoutes from "./routes/ocr.routes.js";

// Load environment variables
dotenv.config();

const app = express();

/* ==========================================
   ✅ TRUST PROXY (important for deployment)
========================================== */
app.set("trust proxy", 1);

/* ==========================================
   ✅ CORS CONFIG (PRODUCTION READY)
========================================== */

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://personal-finance-tracker-kappa-ten.vercel.app",
  "https://personal-finance-tracker-038lie8m1-lalithkotas-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      // Allow exact allowed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow all Vercel preview deployments
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // Reject others
      return callback(new Error("❌ Not allowed by CORS: " + origin));
    },

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

    credentials: true,
  })
);

/* ==========================================
   ✅ MIDDLEWARE
========================================== */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ==========================================
   ✅ API ROUTES
========================================== */

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/insights", insightRoutes);
app.use("/api/voice", voiceRoutes);
app.use("/api/savings-goals", savingsGoalRoutes);
app.use("/api/investment-goals", investmentGoalRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/ocr", ocrRoutes);

/* ==========================================
   ✅ HEALTH CHECK ROUTE
========================================== */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "🚀 Server is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

/* ==========================================
   ❌ GLOBAL ERROR HANDLER
========================================== */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ==========================================
   ✅ 404 HANDLER
========================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ==========================================
   ✅ MONGODB CONNECTION
========================================== */

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/personal-finance-tracker";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🔥 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });

/* ==========================================
   ✅ GRACEFUL SHUTDOWN
========================================== */

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB disconnected");
  process.exit(0);
});
