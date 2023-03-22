import SignUp from '../../components/login/SignUp'
import { Await, useLoaderData, defer } from 'react-router-dom'
import { Suspense } from 'react'
function RegisterPage() {
  const { accounts } = useLoaderData()
  console.log(accounts)
  return (
    <Suspense>
      <Await resolve={accounts}>
        {(loadAccounts) => <SignUp accounts={loadAccounts} />}
      </Await>
    </Suspense>
  )
}

export default RegisterPage

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
