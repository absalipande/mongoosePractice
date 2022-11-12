import Post from '../models/User.js';

export default async function PostBlogUserChecker(req, res, next) {
  const id = req.params.id;
  const findUser = await Post.findOne({ _id: id });

  if (!findUser) {
    return res.status(422).json({
      message: 'No User found',
    });
  }

  next();
}
