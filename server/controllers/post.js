import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
  ? "SELECT * FROM posts WHERE cat=?"
  : "SELECT * FROM posts";

db.query(q, [req.query.cat], (err, data) => {
  if (err) return res.status(500).send(err);

  return res.status(200).json(data);
});
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {

    const q =
      "INSERT INTO posts(`title`, `desc`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.date,
      req.body.uid,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
};

