import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { idActions } from '../store/id-slice'
function CommunityDetail({ post }) {
  const { comments } = post
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const likes = state.id.likes
  const hates = state.id.hates
  const likeHandler = (event) => {
    event.preventDefault()
    dispatch(idActions.addLike(likes))
  }
  const hateHandler = (event) => {
    event.preventDefault()
    dispatch(idActions.addHate(hates))
  }
  console.log(likes)
  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <time>{post.date}</time>
        <p>{post.contents}</p>
        <div>{likes}</div>
        <div>{hates}</div>
        <button>편집</button>
      </article>
      <hr></hr>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <p>
              {index + 1}
              {comment.writer}
            </p>
            <p>{comment.contents}</p>
            {comment.date}
            <div>
              <button onClick={likeHandler}>좋아요</button>
              {comment.likes}
              <button onClick={hateHandler}>싫어요</button>
              {comment.hates}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default CommunityDetail
