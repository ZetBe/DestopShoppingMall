import { useSelector } from 'react-redux'
import { Form, json, redirect } from 'react-router-dom'
import classes from './CommunityComments.module.css'

function CommunityComments({ comments, params, select }) {
  const state = useSelector((state) => state.account)
  console.log(params.id)
  return (
    <div className={classes.comment}>
      {state.login && (
        <>
          <Form method="POST">
            게시글 아이디
            <input
              id="id"
              name="id"
              className={classes.contents}
              value={params.id}
              readOnly
            ></input>
            <br></br>
            위치
            <input
              id="select"
              name="select"
              className={classes.contents}
              value={select}
              readOnly
            ></input>
            <br></br>
            작성자
            <input
              id="name"
              name="name"
              className={classes.contents}
              value={state.username}
              readOnly
            ></input>
            <p>
              <label htmlFor="contents">내용</label>
              <input
                id="contents"
                className={classes.input}
                name="contents"
                rows="5"
                required
              />
              <button>제출</button>
            </p>
          </Form>
          <hr></hr>
          댓글 수: {comments.length}
        </>
      )}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <b>
              {comment.id}
              글쓴이 {comment.writer} {comment.date}
            </b>
            <p>{comment.contents}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommunityComments

export async function action({ request, params }) {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()

  const method = request.method
  const data = await request.formData()

  let url = `https://shrub-terrific-beginner.glitch.me/${data.get(
    'select'
  )}-comments`
  console.log(url)
  const list = await fetch(url)
  const index = await list.json()

  let eventData = {
    id: index[index.length - 1].id + 1,
    commentId: parseInt(data.get('id')),
    date: year + '-' + month + '-' + date,
    writer: data.get('name'),
    contents: data.get('contents'),
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData),
  })

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 })
  }
  return redirect(`/${data.get('select')}/${eventData.commentId}`)
}
