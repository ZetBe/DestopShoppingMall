import { Suspense } from 'react'
import { Await, defer, useParams, useRouteLoaderData } from 'react-router-dom'
import CommunityDetail from '../../components/community/CommunityDetail'
import CommunityComments from '../../components/community/CommunityComments'

function KoreanDetailPage() {
  const { post, comments } = useRouteLoaderData('korean-detail')
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
              select="korean"
            />
          )}
        </Await>
      </Suspense>
    </>
  )
}

export default KoreanDetailPage

async function loadKoreanDetail(id) {
  const response = await fetch('http://localhost:3000/korean/' + id)
  if (!response.ok) {
  } else {
    const resData = await response.json()
    return resData
  }
}

async function loadKoreanComment(id) {
  const response = await fetch('http://localhost:3000/korean-comments')
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
