import {
  Form,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from 'react-router-dom'

function PostForm({ method, post }) {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  function cancelHandler() {
    navigate('..')
  }

  return (
    <Form method={method}>
      <p>
        <label htmlFor="select">어느 구역에서 작성하고 싶나요?</label>
        <br></br>
        <select name="select">
          <option name="korean" key={0}>
            국산 물
          </option>
          <option name="foreign" key={1}>
            외국 물
          </option>
        </select>
      </p>
      <p>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={post ? post.title : ''}
        />
      </p>
      <p>
        <label htmlFor="contents">내용</label>
        <input
          id="contents"
          name="contents"
          rows="5"
          required
          defaultValue={post ? post.contents : ''}
        />
      </p>
      <div>
        <button disabled={isSubmitting}>제출</button>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          취소
        </button>
      </div>
    </Form>
  )
}

export default PostForm

export async function action({ request, params }) {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()

  const method = request.method
  const data = await request.formData()
  let eventData = {
    select: data.get('select'),
  }

  let url = 'http://localhost:3000/'

  if (eventData.select === '국산 물') {
    eventData = {
      id: data.get('id'),
      title: data.get('title'),
      writer: 'seo',
      date: year + '-' + month + '-' + date,
      contents: data.get('contents'),
      views: 0,
      likes: 0,
      hates: 0,
      comments: [{}],
    }
    url = 'http://localhost:3000/korean'
  } else if (eventData.select === '외국 물') {
    eventData = {
      id: 2,
      title: data.get('title'),
      writer: 'seo',
      date: year + '-' + month + '-' + date,
      contents: data.get('contents'),
      views: 0,
      likes: 0,
      hates: 0,
      comments: [{}],
    }
    url = 'http://localhost:3000/foreign'
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 })
  }
  return redirect('/')
}
