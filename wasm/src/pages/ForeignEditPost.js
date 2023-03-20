import { useRouteLoaderData } from 'react-router-dom'
import PostForm from '../components/PostForm'

function ForeignEditPostPage() {
  const data = useRouteLoaderData('foreign-detail')
  return <PostForm method="PATCH" post={data}></PostForm>
}

export default ForeignEditPostPage
