import { UserModel, userModel } from '../models/UserModels';
// @ts-ignore
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';


passport.use(new LocalStrategy(async (username: string, password: string, done: any): Promise<void> => {
  try {
    const user = await userModel.findOne({ $or: [{ email: username }, { username }] }).exec();

    if (!user) {
      return done(null, false);
    }
    
    if (user.password === password) {
      return done(null, user);
    }
    return done(null, false);
  } catch (e) {
    done(e, false);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user!._id);
});

passport.deserializeUser((id: string | number, done) => {
  userModel.findById(id, (err: any, user: UserModel) => {
    done(err, user);
  });
});

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJwt.fromHeader('token'),
    },
    async (payload: { data: UserModel }, done) => {
      try {
        const user = await userModel.findById(payload.data._id).exec();
        user ? done(null, user) : done(null, false);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export { passport };
