import { useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { accountActions } from '../../store/account-slice'
function SignIn({ accounts }) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector((state) => state.account)

  const loginHandler = (event) => {
    event.preventDefault()
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id === id && accounts[i].password === password) {
        dispatch(accountActions.login(accounts[i].username))
        return window.alert(`${accounts[i].username}님 로그인했습니다.`)
      }
    }
    dispatch(accountActions.failLogin(state.failCount))
    window.alert(
      `로그인에 실패하셨습니다. \n5번의 기회 중 ${
        state.failCount + 1
      }번 사용했습니다.`
    )
    if (state.failCount + 1 >= 5) {
      dispatch(accountActions.reLogin(state.failCount))
      window.alert('5회이상 로그인에 실패하여 회원가입창으로 이동합니다.')
      return navigate('./register')
    }
    return navigate('/login')
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
