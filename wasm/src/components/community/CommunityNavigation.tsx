import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classes from '../Navigation.module.css'
import { RootState } from '../../store'
function CommunityNavigation() {
  const state = useSelector((state: RootState) => state.account)
  return (
    <header>
      <nav>
        <ul className={classes.move}>
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
