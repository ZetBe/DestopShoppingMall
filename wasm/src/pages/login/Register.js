import SignUp from '../../components/login/SignUp'
import { Await, useRouteLoaderData } from 'react-router-dom'
import { Suspense } from 'react'
function RegisterPage() {
  const { accounts } = useRouteLoaderData('login')
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
