import { Outlet } from 'react-router-dom'
import CommunityNavigation from '../../components/community/CommunityNavigation'
function CommunityLayout() {
  return (
    <>
      <CommunityNavigation />
      <Outlet></Outlet>
    </>
  )
}

export default CommunityLayout
