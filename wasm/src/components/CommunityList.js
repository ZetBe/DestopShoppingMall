import { NavLink } from 'react-router-dom'

function CommunityList({ posts }) {
  return (
    <div>
      <h1>목록</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>작성자</th>
            <th>제목</th>
            <th>날짜</th>
            <th>조회수</th>
            <th>좋아용</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.writer}</td>

              <td>
                <NavLink to={`${post.id}`}>{post.title}</NavLink>
              </td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CommunityList
