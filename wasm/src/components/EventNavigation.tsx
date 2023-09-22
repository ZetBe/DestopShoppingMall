import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classes from './Navigation.module.css'
import { RootState } from '../store/indexStore'

function EventNavigation() {
  const state = useSelector((state: RootState) => state.account)
  return (
    <header>
      <nav>
        <ul className={classes.move}>
          <li>
            <NavLink to="">목록</NavLink>
          </li>

          {state.username === 'ZetBe' && (
            <li>
              <NavLink to="/new">글쓰기(관리자용)</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default EventNavigation
