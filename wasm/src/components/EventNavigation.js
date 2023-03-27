import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EventNavigation() {
  const state = useSelector((state) => state.account)
  console.log(state)
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="">All Events</NavLink>
          </li>

          {state.username === 'ZetBe' && (
            <li>
              <NavLink to="/new">New Event</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default EventNavigation
