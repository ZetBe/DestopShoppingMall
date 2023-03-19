import { Suspense } from 'react'
import { Await, defer, useRouteLoaderData } from 'react-router-dom'
import CommunityList from '../components/CommunityList'

function KoreanPage() {
  const { posts } = useRouteLoaderData('korean')
  return (
    <Suspense>
      <Await resolve={posts}>
        {(loadPosts) => <CommunityList posts={loadPosts} />}
      </Await>
    </Suspense>
  )
}

async function loadKorean() {
  const response = await fetch('http://localhost:3000/korean/')
  if (!response.ok) {
  } else {
    const resData = await response.json()
    console.log(resData[0].posts)
    return resData[0].posts
  }
}

export default KoreanPage
export function loader() {
  return defer({
    posts: loadKorean(),
  })
}
