// @ts-ignore
import express from 'express';
import { UserCrtl } from './controllers/UserControllers';
import { registerValidations } from './validations/register';
import { createTweetValidations } from './validations/createTweetValidations';
import { passport } from './core/passport';
// @ts-ignore
import session from 'express-session';
// @ts-ignore
import multer, { Options } from 'multer';
// @ts-ignore
import cors from 'cors';
import './core/db';
import { TweetCtrl } from './controllers/TweetControllers';
import { UploadFileCrtl } from './controllers/UploadFileControllers';
import * as dotenv from 'dotenv';


dotenv.config();


const app = express();

const storage = multer.memoryStorage();
const upload = multer(storage as Options);

app.use(express.json());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secret',
}));

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(passport.initialize());

app.use(passport.session());

app.get('/users', UserCrtl.index);
app.get('/users/me', passport.authenticate('jwt'), UserCrtl.getUserInfo);

app.get('/tweets', TweetCtrl.index);
app.get('/tweets/:id', TweetCtrl.show);
app.post('/tweets', passport.authenticate('jwt'), createTweetValidations, TweetCtrl.create);
app.patch('/tweets/:id', passport.authenticate('jwt'), createTweetValidations, TweetCtrl.update);
app.delete('/tweets/:id', passport.authenticate('jwt'), TweetCtrl.delete);

app.post('/auth/register', registerValidations, UserCrtl.create);
app.post('/auth/login', passport.authenticate('local'), UserCrtl.afterLogin);

app.post('/upload', upload.single('image'), UploadFileCrtl.upload);

app.listen(9999, () => {
  // eslint-disable-next-line no-console
  console.log('server runned');
});


