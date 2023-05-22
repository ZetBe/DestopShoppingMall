import SignIn from '../../components/login/SignIn'
import { defer, Await, useRouteLoaderData } from 'react-router-dom'
import { Suspense, useState } from 'react'
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import { auth } from '../../FirebaseConfig'
import { redirect } from 'react-router-dom'

function LoginPage() {
  type Account = {
    id: string
    password: string
    username: string
  }
  const { accounts } = useRouteLoaderData('login') as { accounts: Account[] }
  const [username, setUsername] = useState('')
  if (localStorage.getItem('loginToken')) {
    redirect('/')
  }
  const onSocialClick = (event) => {
    event.preventDefault()
    const provider = new GithubAuthProvider()
    signInWithPopup(auth, provider)
      .then((data) => {
        const credential = GithubAuthProvider.credentialFromResult(data)
        const token = credential.accessToken
        const displayname = data.user.displayName
        console.log(data)
        localStorage.setItem('loginToken', token)
        setUsername(displayname)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      {!localStorage.getItem('loginToken') ? (
        <Suspense>
          <Await resolve={accounts}>
            {(loadAccounts) => <SignIn accounts={loadAccounts} />}
          </Await>
          <button onClick={onSocialClick}>Github</button>
        </Suspense>
      ) : (
        window.alert(`${username}님 환영합니다.`)
      )}
    </>
  )
}

export default LoginPage

async function loadLogin() {
  const response = await fetch(
    'https://shrub-terrific-beginner.glitch.me/login'
  )
  if (!response.ok) {
  } else {
    const resData = await response.json()
    return resData
  }
}

export async function loader() {
  return defer({
    accounts: await loadLogin(),
  })
}
