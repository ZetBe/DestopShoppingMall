import { NavLink } from 'react-router-dom'
import classes from './CommunityList.module.css'
function CommunityList({ posts, commentAmount }) {
  const reversePosts = posts.slice().reverse()
  const reverseCommentAmount = commentAmount.slice().reverse()

  return (
    <div>
      <h1 style={{ marginRight: '60%' }}>목록</h1>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>작성자</th>
            <th>제목</th>
            <th>날짜</th>
            <th>댓글 수</th>
          </tr>
        </thead>
        <tbody>
          {reversePosts.map((post, index) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.writer}</td>

              <td>
                <NavLink to={`${post.id}`}>{post.title}</NavLink>
              </td>
              <td>{post.date}</td>
              <td>{reverseCommentAmount[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CommunityList
