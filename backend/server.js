const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/cart", require("./routes/CartRoutes"));
app.use("/api/coursecontent", require("./routes/CourseContentRoutes"));
app.use("/api/assignments", require("./routes/assignmentRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
