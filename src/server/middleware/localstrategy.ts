import * as passport from "passport";
import * as LocalStrategy from "passport-local";

import { ComparePasswords } from "../utils/security/password";
import DB from "../db";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
    new LocalStrategy.Strategy(
        {
            usernameField: "email",
            session: false,
        },
        async  ( email, password , done) => {
            try {
                let [user]: any = await DB.Users.FindOneByEmail(email);

                if (user && ComparePasswords(password, user.password.toString())) done(null, user);
                else done(null, false);
            } catch (e) {
                done(e);
            }
        }
    )
);
