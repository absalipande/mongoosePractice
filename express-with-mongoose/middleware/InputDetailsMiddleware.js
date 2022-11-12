export default async function InputDetailsMiddleware(req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({
      message: 'Please fill out required fields!',
    });
  }

  next();
}
