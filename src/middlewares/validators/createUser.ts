import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validateUser = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address!')
    .bail(),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password can not be empty')
    .bail(),
  (request:Request, response:Response, next:NextFunction) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    return next();
  },
];

export default validateUser;
