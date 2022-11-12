export default function EmailValidMiddleware(req, res, next) {
  const { email } = req.body;

  if (!email.includes('@')) {
    return res.status(422).json({
      message: 'Email Address is invalid',
    });
  }

  next();
}
