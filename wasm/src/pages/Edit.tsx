import { useLocation, useRouteLoaderData } from 'react-router-dom'
import PostForm from '../components/PostForm'
function EditPage() {
  const location = useLocation()
  const post = useRouteLoaderData(`${location.state.select}-detail`)

  return (
    <>
      <PostForm method="PATCH" post={post}></PostForm>
    </>
  )
}

export default EditPage
