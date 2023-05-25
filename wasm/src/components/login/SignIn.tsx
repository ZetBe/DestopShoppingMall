import { useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateAccount } from '../../store/account-slice'
import classes from './Login.module.css'
import { RootState } from '../../store'
import {
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '../../FirebaseConfig'

function SignIn({ accounts }) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state.account)

  const loginHandler = (event) => {
    event.preventDefault()
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id === id && accounts[i].password === password) {
        dispatch(updateAccount.login(accounts[i].username))
        return window.alert(`${accounts[i].username}님 로그인했습니다.`)
      }
    }

    dispatch(updateAccount.failLogin(state))

    window.alert(
      `로그인에 실패하셨습니다. \n5번의 기회 중 ${
        state.failCount + 1
      }번 사용했습니다.`
    )
    if (state.failCount + 1 >= 5) {
      dispatch(updateAccount.reLogin(state))
      window.alert('5회이상 로그인에 실패하여 회원가입창으로 이동합니다.')
      return navigate('./register')
    }
    return navigate('/login')
  }

  const [username, setUsername] = useState('')

  const onSocialClick = async (event) => {
    if (event.target.innerText === 'Github') {
      let provider = new GithubAuthProvider()

      signInWithPopup(auth, provider)
        .then((data) => {
          const credential = GithubAuthProvider.credentialFromResult(data)
          const token = credential.accessToken
          const displayname = data.user.displayName
          console.log(data)
          localStorage.setItem('loginToken', token)
          setUsername(displayname)

          if (localStorage.getItem('loginToken') !== null) {
            window.alert(`${username}님 환영합니다.`)
            navigate('/profile')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (event.target.innerText === 'Google') {
      let provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
        .then((data) => {
          const credential = GoogleAuthProvider.credentialFromResult(data)
          const token = credential.accessToken
          const displayname = data.user.displayName
          console.log(data)
          localStorage.setItem('loginToken', token)
          setUsername(displayname)
          if (localStorage.getItem('loginToken') !== null) {
            window.alert(`${username}님 환영합니다.`)
            navigate('/profile')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <>
      <Form className={classes.form}>
        <label htmlFor="id">id</label>
        <input
          id="id"
          type="text"
          name="id"
          value={id}
          className={classes.inputIn}
          onChange={(e) => setId(e.target.value)}
          required
        ></input>
        <label htmlFor="password">비번</label>
        <input
          id="password"
          type="password"
          value={password}
          className={classes.inputIn}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
        ></input>
        <br></br>
        <button onClick={loginHandler}>
          <Link to="/">로그인</Link>
        </button>

        <Link to="/login/register">
          <button>회원가입</button>
        </Link>
      </Form>

      <button onClick={onSocialClick} type="button">
        Github
      </button>
      <button onClick={onSocialClick} type="button">
        Google
      </button>
    </>
  )
}
export default SignIn
