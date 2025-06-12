import express from "express";
import adminRoutes from "./routes/admin.js";
import pagesRoutes from "./routes/pages.js";
import pagesImagesRoutes from "./routes/pagesImages.js";
import authRoutes from "./routes/auth.js";
import membersRoutes from "./routes/members.js";
import projectsRoutes from "./routes/projects.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/pages", pagesRoutes);
app.use("/pages-images", pagesImagesRoutes);
app.use("/members", membersRoutes);
app.use("/projects", projectsRoutes);

app.listen(PORT, () => console.log(`Server running`));
