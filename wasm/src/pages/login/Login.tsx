import SignIn from '../../components/login/SignIn'
import { defer, Await, useRouteLoaderData } from 'react-router-dom'
import { Suspense } from 'react'
function LoginPage() {
  type Account = {
    id: string
    password: string
    username: string
  }
  const { accounts } = useRouteLoaderData('login') as { accounts: Account[] }

  return (
    <>
      <Suspense>
        <Await resolve={accounts}>
          {(loadAccounts) => <SignIn accounts={loadAccounts} />}
        </Await>
      </Suspense>

      <a href="https://watercommunity-43dcf.firebaseapp.com/__/auth/handler">
        깃허브
      </a>
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
