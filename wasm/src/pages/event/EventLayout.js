import { Outlet } from 'react-router-dom'
import EventNavigation from '../../components/EventNavigation'

function EventLayout() {
  return (
    <>
      <EventNavigation></EventNavigation>
      <Outlet></Outlet>
    </>
  )
}

export default EventLayout
