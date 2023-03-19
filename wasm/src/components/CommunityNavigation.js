import { NavLink } from 'react-router-dom'
function CommunityNavigation() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="">All Events</NavLink>
          </li>
          <li>
            <NavLink to="/new">New Event</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default CommunityNavigation
