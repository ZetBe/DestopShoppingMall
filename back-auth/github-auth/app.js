const express = require('express')
const session = require('express-session')
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy

const app = express()

// 세션 미들웨어 설정
app.use(
  session({
    secret: 'YourSecretKey',
    resave: false,
    saveUninitialized: true,
  })
)

// Passport 초기화 및 세션 사용 설정
app.use(passport.initialize())
app.use(passport.session())

// GitHub 로그인 설정
passport.use(
  new GitHubStrategy(
    {
      clientID: 'YourGitHubClientID',
      clientSecret: 'YourGitHubClientSecret',
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // 사용자 정보를 처리하는 로직
      // 이 예시에서는 사용자 정보를 세션에 저장합니다.
      req.session.user = profile
      return done(null, profile)
    }
  )
)

// 세션 직렬화
passport.serializeUser((user, done) => {
  done(null, user)
})

// 세션 역직렬화
passport.deserializeUser((user, done) => {
  done(null, user)
})

// 로그인 경로
app.get('/auth/github', passport.authenticate('github'))

// 로그인 콜백 처리
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // 로그인 성공 시 처리 로직
    res.redirect('/dashboard')
  }
)

// 보호된 라우트
app.get('/dashboard', (req, res) => {
  // 사용자 정보 접근 예시
  const user = req.user
  res.send(`Welcome ${user.displayName}`)
})

// 서버 시작
app.listen(3000, () => {
  console.log('Server started on port 3000')
})
