import { Suspense } from 'react'
import { Await, defer, useParams, useRouteLoaderData } from 'react-router-dom'
import CommunityDetail from '../../components/CommunityDetail'

function ForeignDetailPage() {
  const { post } = useRouteLoaderData('foreign-detail')
  const params = useParams()
  return (
    <Suspense>
      <Await resolve={post}>
        {(loadPost) => <CommunityDetail post={loadPost} params={params} />}
      </Await>
    </Suspense>
  )
}

export default ForeignDetailPage

async function loadForeignDetail(id) {
  const response = await fetch('http://localhost:3000/foreign/' + id)
  if (!response.ok) {
  } else {
    const resData = await response.json()
    return resData
  }
}

export function loader({ request, params }) {
  const id = params.id
  return defer({
    post: loadForeignDetail(id),
  })
}
