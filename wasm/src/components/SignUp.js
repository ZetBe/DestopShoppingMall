import { Form, json, redirect, NavLink } from 'react-router-dom'

function SignUp() {
  return (
    <Form method="POST">
      <p>
        <label htmlFor="name">이름을 입력해주세요</label>
        <input id="username" type="text" name="username" required></input>
      </p>
      <p>
        <label htmlFor="id">아이디를 등록해주세요</label>
        <input id="id" type="text" name="id" required></input>
      </p>
      <p>
        <label htmlFor="password">비밀번호를 등록해주세요</label>
        <input id="password" type="password" name="password" required></input>
      </p>
      <button>가입</button>
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

  const response = await fetch('http://localhost:3000/login', {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData),
  })

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 })
  }
  window.alert('입력하신 정보로 로그인 부탁드립니다.')
  return redirect('/login')
}
