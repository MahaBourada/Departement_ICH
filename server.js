import express from "express";
import adminRoutes from "./routes/admin.js";
import pagesRoutes from "./routes/pages.js";
import loginRoutes from "./routes/login.js";
import membersRoutes from "./routes/members.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/login", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/pages", pagesRoutes);
app.use("/members", membersRoutes);

app.listen(3000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
