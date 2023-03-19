import { NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'
function MainNavigation() {
  //맨 위에 고정적으로 달아놓는 부분
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
                to="/event-issue"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                이벤트/문의
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                로그인
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <hr></hr>
    </>
  )
}
export default MainNavigation
