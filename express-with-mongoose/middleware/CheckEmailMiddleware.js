import User from "../models/User.js";

export default async function CheckEmailMiddleware(req, res, next) {
  const { email } = req.body;
  const findEmail = await User.findOne({ email: email });

  if (findEmail) {
    return res.status(422).json({
      message: 'Email already exists',
    });
  }

  next()
}
