import { useState } from 'react'
import { Form, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { accountActions } from '../store/account-slice'
function SignIn({ accounts }) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const login = state.account.login
  const loginHandler = (event) => {
    event.preventDefault()
    dispatch(accountActions.login(login))
  }
  return (
    <Form>
      <label htmlFor="id">id</label>
      <input
        id="id"
        type="text"
        name="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      ></input>
      <label htmlFor="password">비번</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        required
      ></input>

      <button onClick={loginHandler}>
        <Link to="/">로그인</Link>
      </button>

      <Link to="/login/register">
        <button>회원가입</button>
      </Link>
    </Form>
  )
}
export default SignIn
