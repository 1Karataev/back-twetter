import {Document, model, Schema} from 'mongoose';


export interface TweetModel {
  _id?: String,
  text: String,
  user: String | undefined,
  images: Array<string>,
  createAt: String,
}

export type TweetModelDocument = TweetModel & Document

const TweetSchema = new Schema<TweetModel>({
  text: {
    unique: true,
    required: true,
    type: String,
    createAt: String,
  },

  user: {
    required: true,
    type: Schema.Types.ObjectId, ref: 'User',
  },

  images: Array<String>,

  createAt: String,

});

export const tweetModel = model('Tweet', TweetSchema);
