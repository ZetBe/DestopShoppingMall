import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import classes from './CommunityDetail.module.css'
function CommunityDetail({ post, params }) {
  const navigate = useNavigate()
  const state = useSelector((state) => state.account)
  const id = params.id
  const select = post.select

  const deleteHandler = async () => {
    const proceed = window.confirm('진짜 지울거임?')

    if (proceed) {
      await axios.delete(
        `https://shrub-terrific-beginner.glitch.me/${select}/${id}`
      )
      navigate('/')
    }
  }

  return (
    <>
      <article className={classes.article}>
        <h1>{post.title}</h1>
        작성자: {post.writer}
        <time className={classes.time}>{post.date}</time>
        <div className={classes.contents}>{post.contents}</div>
      </article>
      {state.username === post.writer && (
        <main className={classes.main}>
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
