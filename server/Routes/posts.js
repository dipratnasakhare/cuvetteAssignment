const express = require("express");
const PostsRouter = express.Router();
const Posts = require("../modules/posts");

PostsRouter.get("/posts", async (request, response) => {
  try {
    const tasks = await Posts.findAll();
    response.status(200).json(tasks);
  } catch (err) {

    console.log(err)
    response.status(400).json({ msg: "error" });
  }
});

PostsRouter.post("/posts", async (request, response) => {
  try {
    const newTask = Posts.build({
      title: request.body.title,
      desc: request.body.desc,
      date: request.body.date,
      uid: request.body.uid,
    });
    await newTask.save();
    response.status(201).json(newTask);
  } catch (error) {
    response.status(400).json(error);
  }
});

PostsRouter.get("/posts/:id", async (request, response) => {
  try {
    const post = await Posts.findOne({
      where: {
        id: request.params.id,
      },
    });
    response.status(200).json(post);
  } catch (err) {
    console.log(err);
    response.status(400).json({ msg: "err" });
  }
});

PostsRouter.patch("/posts/:id", async (request, response) => {
  try {
    const data = await Posts.upsert({
      id: request.params.id,
      ...request.body,
    });
    response.status(200).json({ msg: "success", data });
  } catch (err) {
    console.log(err);
    response.status(400).json({ msg: "err" });
  }
});

PostsRouter.delete("/posts/:id", async (request, response) => {
  try {
    await Posts.destroy({
      where: {
        id: request.params.id,
      },
    });
    response.status(200).json({ msg: "success" });
  } catch (err) {
    console.log(err);
    response.status(400).json({ msg: "error" });
  }
});

module.exports = PostsRouter;
