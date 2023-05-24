import { NavLink } from 'react-router-dom'
import classes from '../Navigation.module.css'
function CommunityNavigation() {
  return (
    <header>
      <nav>
        <ul className={classes.move}>
          <li>
            <NavLink to="">목록</NavLink>
          </li>

          {localStorage.getItem('loginToken') !== null && (
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
