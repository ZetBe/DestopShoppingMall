import { Form, json, redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { idActions } from '../store/id-slice'

function CommunityComments({ comments, params, select }) {
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
  return (
    <>
      <Form method="POST">
        <input id="id" name="id" value={params.id} readOnly></input>
        <input id="select" name="select" value={select} readOnly></input>
        <p>
          <label htmlFor="contents">내용</label>
          <input id="contents" name="contents" rows="5" required />
        </p>
        <button>제출</button>
      </Form>
      <hr></hr>
      {comments.length}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>
              {comment.id}
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

export default CommunityComments

export async function action({ request, params }) {
  console.log('asdf')
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()

  const method = request.method
  const data = await request.formData()

  let url = 'http://localhost:3000/korean-comments'

  if (data.get('select') === 'foreign') {
    url = 'http://localhost:3000/foreign-comments'
  }

  const list = await fetch(url)
  const index = await list.json()

  let eventData = {
    id: index[index.length - 1].id + 1,
    commentId: parseInt(data.get('id')),
    date: year + '-' + month + '-' + date,
    writer: 'seo',
    contents: data.get('contents'),
    likes: 0,
    hates: 0,
  }

  console.log(eventData)
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
  return redirect(`/foreign/${eventData.commentId}`)
}
