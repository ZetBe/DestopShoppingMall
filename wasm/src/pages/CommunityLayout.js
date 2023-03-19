import { Outlet } from 'react-router-dom'
import CommunityNavigation from '../components/CommunityNavigation'
function CommunityLayout() {
  return (
    <>
      <CommunityNavigation />
      <Outlet></Outlet>
    </>
  )
}

export default CommunityLayout
