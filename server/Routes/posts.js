import express from "express";
import {
  addPost,
  getPost,
  getPosts,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);


export default router;