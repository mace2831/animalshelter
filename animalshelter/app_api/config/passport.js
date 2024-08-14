const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const mongoSanitize = require('express-mongo-sanitize');

passport.use(new localStrategy(
    {
        usernameField: 'email'
    },
    async (username, password, done) => {
        //sanitize the username to protect from injection
        const sanitizedUsername = mongoSanitize.sanitize(username);
        const q = await User
        .findOne({email: sanitizedUsername})
        .exec();

        if(!q)
        {
            return done(null, false, { message: 'Incorrect Username'});
        }
        if(!q.validPassword(password))
        {
            return done(null, false, { message: 'Incorrect Password'});
        }
        return done(null, q);
    }
));