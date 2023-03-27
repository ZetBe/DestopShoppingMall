import { useSelector } from 'react-redux'
import { Form, json, redirect } from 'react-router-dom'

function CommunityComments({ comments, params, select }) {
  const state = useSelector((state) => state.account)
  console.log(params.id)
  return (
    <>
      {state.login && (
        <>
          <Form method="POST">
            <input id="id" name="id" value={params.id} readOnly></input>
            <input id="select" name="select" value={select} readOnly></input>
            <input
              id="name"
              name="name"
              value={state.username}
              readOnly
            ></input>
            <p>
              <label htmlFor="contents">내용</label>
              <input id="contents" name="contents" rows="5" required />
            </p>
            <button>제출</button>
          </Form>
          <hr></hr>
        </>
      )}
      댓글 수: {comments.length}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>
              {comment.id}
              {comment.writer}
            </p>
            <p>{comment.contents}</p>
            {comment.date}
          </li>
        ))}
      </ul>
    </>
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

  let url = `http://localhost:3000/${data.get('select')}-comments`
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
