import { Outlet, Link } from 'react-router-dom'
import MainNavigation from '../../components/MainNavigation'
import classes from '../page.module.css'
function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet></Outlet>
        <div className={classes.bottom}></div>
        <footer>
          <p>문의: watercommunity@gmail.com</p>
          <p>
            해당 사이트는 실제 서비스를 하고 있지 않는 사이트로, 사용자에게
            발생하는 피해는 본인에게 있음을 알립니다.
          </p>
          해당 사이트를 만든 사람 ZetBe:{' '}
          <Link to="https://github.com/ZetBe">GitHub</Link>
        </footer>
      </main>
    </>
  )
}

export default RootLayout
