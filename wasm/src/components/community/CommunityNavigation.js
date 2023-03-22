import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
function CommunityNavigation() {
  const state = useSelector((state) => state.account)
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="">All Events</NavLink>
          </li>

          {state.login && (
            <li>
              <NavLink to="/new">New Event</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default CommunityNavigation
