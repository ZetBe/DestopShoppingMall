import { Suspense } from 'react'
import { Await, defer, useParams, useRouteLoaderData } from 'react-router-dom'
import CommunityDetail from '../../components/community/CommunityDetail'
import CommunityComments from '../../components/community/CommunityComments'
function EventIssueDetailPage() {
  const { post, comments } = useRouteLoaderData('event-detail')
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
              select="event-issue"
            />
          )}
        </Await>
      </Suspense>
    </>
  )
}

export default EventIssueDetailPage

async function loadEventDetail(id) {
  const response = await fetch('http://localhost:3000/event-issue/' + id)
  if (!response.ok) {
  } else {
    const resData = await response.json()
    return resData
  }
}

async function loadEventComment(id) {
  const response = await fetch('http://localhost:3000/event-issue-comments/')
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
    post: loadEventDetail(id),
    comments: loadEventComment(id),
  })
}
