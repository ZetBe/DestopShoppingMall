import SignIn from '../../components/login/SignIn'
import { defer, Await, useRouteLoaderData } from 'react-router-dom'
import { Suspense } from 'react'
function LoginPage() {
  const { accounts } = useRouteLoaderData('login')
  return (
    <Suspense>
      <Await resolve={accounts}>
        {(loadAccounts) => <SignIn accounts={loadAccounts} />}
      </Await>
    </Suspense>
  )
}

export default LoginPage

async function loadLogin() {
  const response = await fetch('http://localhost:3000/login')
  if (!response.ok) {
  } else {
    const resData = await response.json()
    return resData
  }
}

export function loader() {
  return defer({
    accounts: loadLogin(),
  })
}
