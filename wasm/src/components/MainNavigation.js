import { NavLink } from 'react-router-dom'
import classes from './Navigation.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { accountActions } from '../store/account-slice'
function MainNavigation() {
  //맨 위에 고정적으로 달아놓는 부분
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const login = state.account.login
  const logoutHandler = (event) => {
    event.preventDefault()
    dispatch(accountActions.logout(login))
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
              {login ? (
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  onClick={logoutHandler}
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
          </ul>
        </nav>
      </header>
      <hr></hr>
    </>
  )
}
export default MainNavigation
