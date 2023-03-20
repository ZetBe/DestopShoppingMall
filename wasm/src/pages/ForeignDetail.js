import { Suspense } from 'react'
import { Await, defer, useRouteLoaderData } from 'react-router-dom'
import CommunityDetail from '../components/CommunityDetail'

function ForeignDetailPage() {
  const { post } = useRouteLoaderData('foreign-detail')
  return (
    <Suspense>
      <Await resolve={post}>
        {(loadPost) => <CommunityDetail post={loadPost} />}
      </Await>
    </Suspense>
  )
}

export default ForeignDetailPage

async function loadForeignDetail(id) {
  const response = await fetch('http://localhost:3000/foreign')
  if (!response.ok) {
  } else {
    const resData = await response.json()
    console.log(resData[0].posts[id - 1])
    return resData[id - 1]
  }
}

export function loader({ request, params }) {
  const id = params.id
  return defer({
    post: loadForeignDetail(id),
  })
}
