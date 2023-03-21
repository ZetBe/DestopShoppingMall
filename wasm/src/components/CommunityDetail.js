import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function CommunityDetail({ post, params }) {
  const navigate = useNavigate()

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
        <p>{post.contents}</p>
        <div>{post.views}</div>
      </article>
      <button onClick={deleteHandler}>삭제</button>
      <hr></hr>
    </>
  )
}

export default CommunityDetail

export function detailId({ params }) {
  console.log(params.id)
  return params.id
}
