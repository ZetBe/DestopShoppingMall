import { NavLink } from 'react-router-dom'
import classes from './Navigation.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateAccount } from '../store/account-slice'
import { RootState } from '../store'

function MainNavigation() {
  //맨 위에 고정적으로 달아놓는 부분
  const dispatch = useDispatch()
  const account = useSelector((state: RootState) => state.account)
  const login = account.login
  const logoutHandler = (event, login) => {
    event.preventDefault()
    dispatch(updateAccount.logout(login))
  }
  return (
    <>
      <header className={classes.header}>
        <NavLink to="" className={classes.title}>
          Water Community
        </NavLink>
        <nav>
          <ul className={classes.list}>
            <li>
              <NavLink
                to="/korean"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                국산 물
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/foreign"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                외국 물
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/event"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                이벤트
              </NavLink>
            </li>
            <li>
              {localStorage.getItem('loginToken') ? (
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  onClick={(event) => logoutHandler(event, login)}
                >
                  로그아웃
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  로그인
                </NavLink>
              )}
            </li>
            <li></li>
          </ul>
        </nav>
      </header>
      <hr></hr>
    </>
  )
}

export default MainNavigation
