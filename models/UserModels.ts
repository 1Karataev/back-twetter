import {Document, model, Schema} from 'mongoose'


export interface UserModel  {
  _id?: String,
  email: String,
  fullname:String
  username:String,
  location:String,
  password:String,
  confirmed: Boolean,
  confirm_hash:String,
  tweets: String,
  about:String,
  website:String,
}

export type UserModelDocument = UserModel & Document

const UserSchema = new Schema<UserModel>({
  email:{
    unique:true,
    required:true,
    type: String
  },

  fullname:{
    required:true,
    type: String
  },

  username:{
    unique:true,
    required:true,
    type: String
  
  },

  location:String,

  password:{
    required:true,
    type: String,
    select: false,
  },
  
  confirmed: Boolean,

  confirm_hash:{
    required:true,
    type: String,
    select: false,
  },

  tweets: {
    type: Schema.Types.ObjectId, ref: 'Tweet',
  },

  about:String,

  website:String,


})

export const  userModel = model('User', UserSchema)