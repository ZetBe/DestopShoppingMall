import { Suspense } from 'react'
import { Await, defer, useParams, useRouteLoaderData } from 'react-router-dom'
import CommunityDetail from '../../components/community/CommunityDetail'
import CommunityComments from '../../components/community/CommunityComments'
function EventDetailPage() {
  type Post = {
    id: number
    select: string
    title: string
    writer: string
    date: string
    contents: string
  }
  type Comment = {
    id: number
    commentId: number
    writer: string
    date: string
    contents: string
  }
  const { post, comments } = useRouteLoaderData('event-detail') as {
    post: Post
    comments: Comment[]
  }
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
              select="event"
            />
          )}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetailPage

async function loadEventDetail(id) {
  const response = await fetch(
    'https://shrub-terrific-beginner.glitch.me/event/' + id
  )
  if (!response.ok) {
  } else {
    const resData = await response.json()
    return resData
  }
}

async function loadEventComment(id) {
  const response = await fetch(
    'https://shrub-terrific-beginner.glitch.me/event-comments/'
  )
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

export async function loader({ request, params }) {
  const id = params.id
  return defer({
    post: await loadEventDetail(id),
    comments: await loadEventComment(id),
  })
}
