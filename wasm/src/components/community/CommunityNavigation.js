import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classes from '../MainNavigation.module.css'
function CommunityNavigation() {
  const state = useSelector((state) => state.account)
  return (
    <header>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="">목록</NavLink>
          </li>

          {state.login && (
            <li>
              <NavLink to="/new">글쓰기</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default CommunityNavigation
