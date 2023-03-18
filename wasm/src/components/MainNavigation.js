import { NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.css'
function MainNavigation() {
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul className={classes.list}>
            <li>
              <NavLink to="" className={classes.title}>
                Water Shopping Mall
              </NavLink>
            </li>
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
                to="/water-tool"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                물먹는 도구
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
            <li>
              <NavLink
                to="/basket"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                장바구니
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
