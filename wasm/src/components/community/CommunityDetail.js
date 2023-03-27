import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
function CommunityDetail({ post, params }) {
  const navigate = useNavigate()
  const state = useSelector((state) => state.account)
  const id = params.id
  const select = post.select
  const deleteHandler = async () => {
    const proceed = window.confirm('진짜 지울거임?')

    if (proceed) {
      await axios.delete(`http://localhost:3000/${select}/${id}`)
      navigate('/')
    }
  }

  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <time>{post.date}</time>
        <p>{post.writer}</p>
        <p>{post.contents}</p>
        <div>{post.views}</div>
      </article>
      {state.username === post.writer && (
        <main>
          <button onClick={deleteHandler}>삭제</button>
          <Link to="edit" state={{ select: post.select }}>
            편집
          </Link>
        </main>
      )}
      <hr></hr>
    </>
  )
}

export default CommunityDetail

export function detailId({ params }) {
  return params.id
}
