import { useState } from 'react'
import { Form, json, redirect, NavLink } from 'react-router-dom'
import classes from './Login.module.css'

function SignUp({ accounts }) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [redId, setRedId] = useState(false)
  const [redPassword, setRedPassword] = useState(false)
  const [username, setUsername] = useState('')

  const usernameHandler = (e) => {
    setUsername(e.target.value)
  }

  const idHandler = (e) => {
    setId(e.target.value)
    if (id.trim().length < 4) {
      setRedId(true)
    } else {
      setRedId(false)
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (password.trim().length < 7) {
      setRedPassword(true)
    } else {
      setRedPassword(false)
    }
  }

  return (
    <Form method="POST" className={classes.form}>
      <div>
        <label htmlFor="name">이름을 입력해주세요</label>
        <input
          id="username"
          type="text"
          name="username"
          className={classes.inputUp}
          value={username}
          onChange={usernameHandler}
          required
        ></input>
      </div>
      <div>
        <label htmlFor="id">아이디를 등록해주세요</label>
        <input
          id="id"
          type="text"
          name="id"
          value={id}
          className={classes.inputUp}
          onChange={idHandler}
          required
        ></input>
        {redId && <p>아이디는 4자이상 입력해주세요</p>}
      </div>
      <div>
        <label htmlFor="password">비밀번호를 등록해주세요</label>
        <input
          id="password"
          type="password"
          name="password"
          className={classes.inputUp}
          onChange={passwordHandler}
          value={password}
          required
        ></input>
        {redPassword && <p>비밀번호는 8자이상 입력해주세요</p>}
      </div>
      {!redId &&
        !redPassword &&
        username !== '' &&
        id !== '' &&
        password !== '' && <button>가입</button>}
      <NavLink to="/login">
        <button>취소</button>
      </NavLink>
    </Form>
  )
}

export default SignUp

export async function action({ request, params }) {
  const data = await request.formData()
  const method = request.method
  const eventData = {
    id: data.get('id'),
    password: data.get('password'),
    username: data.get('username'),
  }
  const accounts = await fetch(
    'https://shrub-terrific-beginner.glitch.me/login'
  )
  const account = await accounts.json()
  for (let i = 0; i < account.length; i++) {
    if (
      account[i].username === eventData.username ||
      account[i].id === eventData.id
    ) {
      window.alert('같은 이름이나 아이디를 가진 유저가 있어 다시 입력해주세요')
      return redirect('/login/register')
    }
  }

  const response = await fetch(
    'https://shrub-terrific-beginner.glitch.me/login',
    {
      method: method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(eventData),
    }
  )

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 })
  }
  window.alert('입력하신 정보로 로그인해주시길 바랍니다.')
  return redirect('/login')
}
