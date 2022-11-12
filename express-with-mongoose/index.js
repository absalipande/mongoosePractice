import * as dotenv from 'dotenv';
import express from 'express';
import process from 'node:process';
import mongoose from 'mongoose';
import User from './models/User.js';
import Post from './models/Post.js';
import InputDetailsMiddleware from './middleware/InputDetailsMiddleware.js';
import EmailValidMiddleware from './middleware/EmailValidMiddleware.js';
import CheckEmailMiddleware from './middleware/CheckEmailMiddleware.js';
import PostBlogMiddleware from './middleware/PostBlogMiddleware.js';
import PostBlogUserChecker from './middleware/PostBlogUserChecker.js';
import UserChecker from './middleware/UserChecker.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
app.use(express.json());

mongoose.connect(process.env.DB_URI);

mongoose.connection.on('connected', () =>
  console.log('MongoDB connection has been established')
);

app.set('port', PORT);

app.post(
  '/users',
  [InputDetailsMiddleware, EmailValidMiddleware, CheckEmailMiddleware],
  async (req, res) => {
    const postUsers = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const postedUsers = await postUsers.save();
      res.json(postedUsers);
    } catch (error) {
      res.status(422).json({ message: error });
    }
  }
);

app.post(
  '/posts/:id',
  [PostBlogMiddleware, PostBlogUserChecker],
  async (req, res) => {
    const postBlog = new Post({
      title: req.body.title,
      content: req.body.content,
      authorId: req.params.id,
    });
    try {
      const postedBlog = await postBlog.save();
      res.status(201).json(postedBlog);
    } catch (error) {
      res.status(422).json({ message: error });
    }
  }
);

app.get('/users/:userId/posts', UserChecker, async (req, res) => {
  const { userId } = req.params;
  const { limit, offset } = req.query;

  res.status(200).json(await Post.getAllByAuthorId(userId, limit, offset));
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

app.get('/users', async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params;

  await Post.updateOne({ _id: postId }, { deletedAt: Date.now() });

  res.status(200).json({
    message: 'Succesfully removed post',
  });
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
