import React from 'react'
function CommunityDetail({ post }) {
  const comments = post.comments
  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <time>{post.date}</time>
        <p>{post.contents}</p>
      </article>
      <hr></hr>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>
              {comment.id}
              {comment.writer}
            </p>
            <p>{comment.contents}</p>
            {comment.date}
            {comment.likes}
            {comment.hates}
          </li>
        ))}
      </ul>
    </>
  )
}

export default CommunityDetail
