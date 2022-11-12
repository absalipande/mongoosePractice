import User from '../models/User.js';

export default async function UserChecker(req, res, next) {
  const { id } = req.params;
  const findUser = await User.findOne({ _id: id });

  if (!findUser) {
    return res.status(422).json({
      message: 'No user found',
    });
  }

  next()
}
