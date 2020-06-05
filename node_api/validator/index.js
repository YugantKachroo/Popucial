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

exports.userSignUpValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty();
  req
    .check('email', 'Email is required')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @');

  req.check('password', 'Password is required').notEmpty();
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage(
      'Password must contain atleast 6 characters including a number'
    )
    .matches(/\d/)
    .withMessage('Password must contain a numnber');

  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
