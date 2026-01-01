import passport from "passport";
import {
    Strategy as GoogleStrategy
} from "passport-google-oauth20";


import User from '../models/User.js';
// google login
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (
            accessToken,
            refreshToken,
            profile,
            done
        ) => {
            try {
                const email = profile.emails?.[0].value;
                if (!email) {
                    return done(null, false, { message: "No email found" });
                }

                let isUserExist = await User.findOne({ email });

                if (
                    isUserExist
                ) {
                    return done(null, `User is already exist!`);
                }

                if (!isUserExist) {
                    isUserExist = await User.create({
                        email,
                        name: profile.displayName
                    });
                }

                done(null, isUserExist);
            } catch (error) {
                console.log("Google Strategy Error", error);
                return done(error);
            }
        }
    )
);