import { Suspense } from 'react'
import { Await, defer, useParams, useRouteLoaderData } from 'react-router-dom'
import CommunityDetail from '../../components/CommunityDetail'
import CommunityComments from '../../components/CommunityComments'
function ForeignDetailPage() {
  const { post, comments } = useRouteLoaderData('foreign-detail')
  const params = useParams()
  return (
    <>
      <Suspense>
        <Await resolve={post}>
          {(loadedPost) => (
            <CommunityDetail post={loadedPost} params={params} />
          )}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={comments}>
          {(loadedComments) => (
            <CommunityComments
              comments={loadedComments}
              params={params}
              select="foreign"
            />
          )}
        </Await>
      </Suspense>
    </>
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

async function loadForeignComment(id) {
  const response = await fetch('http://localhost:3000/foreign-comments')
  if (!response.ok) {
  } else {
    const resData = await response.json()
    let list = []

    for (let i = 0; i < resData.length; i++) {
      if (resData[i].commentId === parseInt(id)) {
        list.push(resData[i])
      }
    }
    return list
  }
}
export function loader({ request, params }) {
  const id = params.id
  return defer({
    post: loadForeignDetail(id),
    comments: loadForeignComment(id),
  })
}
