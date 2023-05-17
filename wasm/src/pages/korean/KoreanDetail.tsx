import { Suspense } from 'react'
import { Await, defer, useParams, useRouteLoaderData } from 'react-router-dom'
import CommunityDetail from '../../components/community/CommunityDetail'
import CommunityComments from '../../components/community/CommunityComments'

function KoreanDetailPage() {
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

  const { post, comments } = useRouteLoaderData('korean-detail') as {
    post: Post
    comments: Comment[]
  }

  const myPost: Post = post
  const myComments: Comment[] = comments
  const params = useParams()
  return (
    <>
      <Suspense>
        <Await resolve={myPost}>
          {(loadedPost) => (
            <CommunityDetail post={loadedPost} params={params} />
          )}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={myComments}>
          {(loadedComments) => (
            <CommunityComments
              comments={loadedComments}
              params={params}
              select="korean"
            />
          )}
        </Await>
      </Suspense>
    </>
  )
}

export default KoreanDetailPage

async function loadKoreanDetail(id: number) {
  const response = await fetch(
    'https://shrub-terrific-beginner.glitch.me/korean/' + id
  )
  if (!response.ok) {
  } else {
    const resData = await response.json()
    return resData
  }
}

async function loadKoreanComment(id: string) {
  const response = await fetch(
    'https://shrub-terrific-beginner.glitch.me/korean-comments'
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
    post: await loadKoreanDetail(id),
    comments: await loadKoreanComment(id),
  })
}
