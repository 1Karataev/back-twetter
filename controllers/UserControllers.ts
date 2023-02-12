import express from 'express'
import { validationResult } from 'express-validator'
import { userModel, UserModelDocument } from '../models/UserModels'
import { generateMD5 } from '../utils/generateHash'
import jwt from 'jsonwebtoken'


class UserController {
  async index(req: express.Request, res: express.Response):Promise<void> {
    try{
      const users = await userModel.find({}).exec()

      res.json({
        status:'success',
        data:users
      })

    } catch(error){
      res.json({
        status:'error',
        message: JSON.stringify(error) 
      })
    }
  } 

  async create(req: express.Request, res: express.Response):Promise<void> {
    try{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({status:'error', message: errors.array()});
       return
       
    }
    const data = {
      email:req.body.email, 
      username: req.body.username,
      fullname:req.body.fullname,
      password:req.body.password,
      confirm_hash: generateMD5(Math.random().toString()) 
    }
    const user = await userModel.create(data)

    res.json({
      status:'success',
      data:user
    })
    
    } catch(error){
        res.json({
        status:'error',
        message:JSON.stringify(error)
    })
      }
  }

  async afterLogin(req: any, res: express.Response):Promise<void> {
    try{
    const user = (req.user as UserModelDocument).toJSON() || null

    res.json({
      status:'success',
      data: {
        ...user,
        token: jwt.sign({data: req.user}, 'TOP_SECRET', {expiresIn: '30d'})
      }
    })
    
    } catch(error){
        res.json({
        status:'error',
        message:JSON.stringify(error)
      })
    }
  }

   async getUserInfo(req: any, res: express.Response):Promise<void> {
    try{
    const user = (req.user as UserModelDocument).toJSON() || null

    res.json({
      status:'success',
      data: user
    })
    
    } catch(error){
        res.json({
        status:'error',
        message:JSON.stringify(error)
    })
      }
  }
}

export const UserCrtl = new UserController()