exports.createPostValidator = (req, res, next) => {
  req.check('title', 'Write a title').notEmpty();
  req.check('title', 'Title must be greater than 4').isLength({
    min: 4,
  });
  req.check('body', 'Write a body').notEmpty();
  req.check('body', 'Body must be greater than 4').isLength({
    min: 4,
  });

  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
