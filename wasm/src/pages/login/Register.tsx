import SignUp from '../../components/login/SignUp'
import { Await, useRouteLoaderData } from 'react-router-dom'
import { Suspense } from 'react'
function RegisterPage() {
  type Account = {
    id: string
    password: string
    username: string
  }
  const { accounts } = useRouteLoaderData('login') as { accounts: Account[] }

  return (
    <Suspense>
      <Await resolve={accounts}>
        {(loadAccounts) => <SignUp accounts={loadAccounts} />}
      </Await>
    </Suspense>
  )
}

export default RegisterPage
