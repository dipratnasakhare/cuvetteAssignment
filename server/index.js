import express from "express";
import authRoutes from "./Routes/auth.js";
import userRoutes from "./Routes/users.js";
import postRoutes from "./Routes/posts.js";
import {db} from "./db.js"
import cors from "cors";

// import cookieParser from "cookie-parser";
// import multer from "multer";

const app = express();


app.use(cors())
app.use(express.json());



// app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public/upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage });

// app.post("/api/upload", upload.single("file"), function (req, res) {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });


app.get("/api/get", function (req, res) {
  res.status(200).json({msg:"success"});
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);



// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL database!');
// });



app.listen(8800, () => {
  db.connect((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Database connected')
  })
});