const express = require('express')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy

passport.use(
  new GitHubStrategy(
    {
      clientID: 'bde4ab4ac4f6d0a373e9',
      clientSecret: '1f3aba8a37b726a0564f413b54b50bd2ef8f43f7',
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(err, user)
      })
    }
  )
)

const app = express()

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('https://watercommunity-43dcf.web.app/')
  }
)
app.listen(3000)
