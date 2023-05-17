import { Suspense } from 'react'
import { Await, defer, useRouteLoaderData } from 'react-router-dom'
import CommunityList from '../../components/community/CommunityList'

function EventPage() {
  const data = useRouteLoaderData('event')
  const commentAmount = []
  for (let i = 0; i < data.posts.length; i++) {
    commentAmount.push(0)
    for (let j = 0; j < data.comments.length; j++) {
      if (parseInt(data.comments[j].commentId) === parseInt(data.posts[i].id)) {
        commentAmount[i]++
      }
    }
  }
  return (
    <Suspense>
      <Await resolve={data.posts}>
        {(loadData) => (
          <CommunityList posts={loadData} commentAmount={commentAmount} />
        )}
      </Await>
    </Suspense>
  )
}

export default EventPage

async function loadEvent() {
  const response = await fetch(
    'https://shrub-terrific-beginner.glitch.me/event'
  )
  if (!response.ok) {
  } else {
    const resData = await response.json()
    return resData
  }
}

async function loadEventComment() {
  const response = await fetch(
    'https://shrub-terrific-beginner.glitch.me/event-comments'
  )
  if (!response.ok) {
  } else {
    const resData = await response.json()
    return resData
  }
}

export async function loader() {
  return defer({
    posts: await loadEvent(),
    comments: await loadEventComment(),
  })
}
