import express from "express";
import adminRoutes from "./routes/admin.js";
import pagesRoutes from "./routes/pages.js";
import pagesImagesRoutes from "./routes/pagesImages.js";
import authRoutes from "./routes/auth.js";
import membersRoutes from "./routes/members.js";
import newsRoutes from "./routes/news.js";
import projectsRoutes from "./routes/projects.js";
import prixRoutes from "./routes/prix.js";
import collaborationsRoutes from "./routes/collaborations.js";
import {
  sendEmailContact,
  sendRequestCollab,
} from "./controllers/sendEmails.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { getAllHistory } from "./controllers/history.js";
import {
  validateCollabForm,
  validateContactForm,
} from "./middleware/validation.js";
import { handleValidationErrors } from "./middleware/handleValidationErrors.js";

const upload = multer({ dest: "uploads/" });
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
app.use("/news", newsRoutes);
app.use("/members", membersRoutes);
app.use("/projects", projectsRoutes);
app.use("/prix", prixRoutes);
app.use("/collaborations", collaborationsRoutes);

// Get method for getting the logs/history
app.get("/history", getAllHistory);

// Post method for sending an email from the contact from
app.post(
  "/contact",
  validateContactForm,
  handleValidationErrors,
  sendEmailContact
);

app.post(
  "/collab-request",
  upload.single("fichier"),
  validateCollabForm,
  handleValidationErrors,
  sendRequestCollab
);

app.listen(PORT, () => console.log(`Server running`));
