import {body} from 'express-validator'

export const registerValidations = [
 body('email', 'Введите E-mail').isEmail().withMessage('Допустимое количество символов в почте от 10 до 40').isLength({
  min:10,
  max:40
 }),
  body('fullname', 'Введите  имя').isString().withMessage('Допустимое количество символов в имени от 2 до 40').isLength({
  min:2,
  max:40
 }),
  body('username', 'Укажите  логин').isString().withMessage('Допустимое количество символов в логине от 2 до 40').isLength({
  min:2,
  max:40
 }),
 body('password', 'Укажите  пароль').isString().withMessage('Минимум 6 символов').isLength({
  min:6
 }).custom((value,{req}) => {
  if(value !== req.body.password2){
    throw new Error('Пароли не совпадают')
  } else {
    return value
  }
}
 )
]