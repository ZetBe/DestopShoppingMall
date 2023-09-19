import { NavLink } from 'react-router-dom'
import classes from './CommunityList.module.css'
function CommunityList({ posts, commentAmount }) {
  const reversePosts = posts.slice().reverse()
  const reverseCommentAmount = commentAmount.slice().reverse()
  const postLists = Math.ceil(posts.length / 10)
  const nowPosts = []
  const nowComments = []
  for (let j = (page - 1) * 10; j < (page - 1) * 10 + 10; j++) {
    if (j < posts.length) {
      nowPosts.push(reversePosts[j])
      nowComments.push(reverseCommentAmount[j])
    }
  }
  const newPosts = JSON.parse(JSON.stringify(nowPosts))
  const newComments = JSON.parse(JSON.stringify(nowComments))
  const showedPosts = new Array(postLists).fill(0)
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
              <td>{newComments[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Button = styled.button`
  overflow: hidden;
  position: relative;
  height: 38px;
  display: inline-block;
  zoom: 1;
  _display: block;
  text-align: center;
  -webkit-box-sizing: border-box;

  position &:hover {
    background: gray;
    cursor: pointer;
    transform: translateY(-2px);
  }
`

export default CommunityList
