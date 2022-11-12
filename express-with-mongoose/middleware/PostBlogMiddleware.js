export default function PostBlogMiddleware(req, res, next) {
    const { title, content} = req.body;
  
    if (!title || !content) {
      return res.status(422).json({
        message: 'Please fill out required fields!',
      });
    }
  
    next();
  }
  