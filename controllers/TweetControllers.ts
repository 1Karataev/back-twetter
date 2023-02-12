// @ts-ignore
import express from 'express';
import {validationResult} from 'express-validator';
import {TweetModel, tweetModel} from '../models/TweetModels';
import {UserModel} from '../models/UserModels';
import {isValidObjectId} from '../utils/isvalidObjectId';


class TweetController {
  async index(req: express.Request, res: express.Response):Promise<void> {
    try {
      const tweets = await tweetModel.find({}).populate('user');

      res.json({
        status: 'success',
        data: tweets,
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: JSON.stringify(error),
      });
    }
  }

  async show(req: express.Request, res: express.Response):Promise<void> {
    try {
      const tweetsId = req.params.id;

      if (!isValidObjectId(tweetsId)) {
        res.status(400).send();
        return;
      }

      const tweets = await tweetModel.findById(tweetsId).populate('user');

      if (!tweets) {
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: tweets,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async create(req: any, res: express.Response):Promise<void> {
    try {
      const user = req.user as UserModel;
      const errors = validationResult(req);

      if (user) {
        if (!errors.isEmpty()) {
          res.status(400).json({status: 'error', message: errors.array()});
          return;
        }

        const data: TweetModel = {
          text: req.body.text,
          user: user?._id,
          images: req.body.images,
          createAt: req.body.createAt,
        };


        const tweet = await tweetModel.create(data);

        const tweetForRes = await tweetModel.findById(tweet.id).populate('user');

        res.json({
          status: 'success',
          data: tweetForRes,
        });
      }
    } catch (error) {
      res.json({
        status: 'error',
        message: JSON.stringify(error),
      });
    }
  }

  async delete(req: any, res: express.Response):Promise<void> {
    const user = req.user as UserModel;
    try {
      const tweetId = req.params.id;
      if (!isValidObjectId(tweetId)) {
        res.status(400).send;
        return;
      }

      const tweet = await tweetModel.findById(tweetId);
       
      if (tweet && tweet.user?.toString() === user._id?.toString()) {
        tweet.remove();
        res.send();
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500)
        .json({
          status: 'error',
          message: JSON.stringify(error),
        });
    }
  }

  async update(req: any, res: express.Response):Promise<void> {
    const user = req.user as UserModel;
    const text = req.body.text;
    try {
      const tweetId = req.params.id;
      if (!isValidObjectId(tweetId)) {
        res.status(400).send;
        return;
      }

      const tweet = await tweetModel.findById(tweetId);

      if (tweet && tweet.user === user._id?.toString()) {
        tweet.text = text;
        tweet.save();
        res.send();
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500)
        .json({
          status: 'error',
          message: JSON.stringify(error),
        });
    }
  }
}

export const TweetCtrl = new TweetController();
