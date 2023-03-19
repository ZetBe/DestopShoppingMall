import { Suspense } from 'react'
import { Await, defer, useRouteLoaderData } from 'react-router-dom'
import CommunityList from '../components/CommunityList'

function ForeignPage() {
  const { posts } = useRouteLoaderData('foreign')
  return (
    <Suspense>
      <Await resolve={posts}>
        {(loadPosts) => <CommunityList posts={loadPosts} />}
      </Await>
    </Suspense>
  )
}

async function loadForeign() {
  const response = await fetch('http://localhost:3000/foreign')
  if (!response.ok) {
  } else {
    const resData = await response.json()
    console.log(resData[0])
    return resData[0].posts
  }
}

export default ForeignPage

export function loader() {
  return defer({
    posts: loadForeign(),
  })
}
