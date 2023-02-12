import {body} from 'express-validator'

export const createTweetValidations = [
 body('text', 'Введите текст').isString().withMessage('Максимальная длина твита 280 символов').isLength({
  max:280
 }),
]