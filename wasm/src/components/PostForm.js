import { useSelector } from 'react-redux'
import {
  Form,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from 'react-router-dom'
import classes from './PostForm.module.css'

function PostForm({ method, post }) {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const state = useSelector((state) => state.account)
  function cancelHandler() {
    navigate('..')
  }

  return (
    <div className={classes.frame}>
      <Form method={method} className={classes.form}>
        <p>
          작성자
          <input
            className={classes.p}
            name="name"
            value={state.username}
            readOnly
          ></input>
          카테고리
          {!post && (
            <select name="select">
              <option name="korean" key={0}>
                국산 물
              </option>
              <option name="foreign" key={1}>
                외국 물
              </option>
              {state.username === 'ZetBe' && (
                <option name="event" key={2}>
                  이벤트
                </option>
              )}
            </select>
          )}
          {post && (
            <select name="select">
              {post.select === 'korean' && (
                <option name="korean" key={0}>
                  국산 물
                </option>
              )}
              {post.select === 'foreign' && (
                <option name="foreign" key={1}>
                  외국 물
                </option>
              )}
              {state.username === 'ZetBe' && (
                <option name="event" key={2}>
                  이벤트
                </option>
              )}
            </select>
          )}
        </p>
        <p>
          <input
            id="title"
            type="text"
            name="title"
            className={classes.input}
            defaultValue={post && post.title}
            placeholder="제목"
            required
          />
        </p>
        <p>
          <textarea
            id="contents"
            name="contents"
            rows="5"
            className={classes.input}
            defaultValue={post && post.contents}
            placeholder="내용"
            required
          />
        </p>
        <div>
          <button disabled={isSubmitting} className={classes.btn}>
            제출
          </button>
          <button
            type="button"
            className={classes.btn}
            onClick={cancelHandler}
            disabled={isSubmitting}
          >
            취소
          </button>
        </div>
      </Form>
    </div>
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
  let say = '작성이 완료되었습니다.'
  let url = 'https://shrub-terrific-beginner.glitch.me/'

  if (eventData.select === '국산 물') {
    url = 'https://shrub-terrific-beginner.glitch.me/korean'
    const list = await fetch(url)
    const index = await list.json()
    eventData = {
      id: index[index.length - 1].id + 1,
      select: 'korean',
      title: data.get('title'),
      writer: data.get('name'),
      date: year + '-' + month + '-' + date,
      contents: data.get('contents'),
    }
    if (method === 'PATCH') {
      eventData = {
        title: data.get('title'),
        writer: data.get('name'),
        contents: data.get('contents'),
      }
      url = 'https://shrub-terrific-beginner.glitch.me/korean/' + params.id
      say = '수정이 완료되었습니다.'
    }
  } else if (eventData.select === '외국 물') {
    url = 'https://shrub-terrific-beginner.glitch.me/foreign'
    const list = await fetch(url)
    const index = await list.json()
    eventData = {
      id: index[index.length - 1].id + 1,
      select: 'foreign',
      title: data.get('title'),
      writer: data.get('name'),
      date: year + '-' + month + '-' + date,
      contents: data.get('contents'),
    }
    if (method === 'PATCH') {
      eventData = {
        title: data.get('title'),
        writer: data.get('name'),
        contents: data.get('contents'),
      }
      url = 'https://shrub-terrific-beginner.glitch.me/foreign/' + params.id
      say = '수정이 완료되었습니다.'
    }
  } else if (eventData.select === '이벤트') {
    url = 'https://shrub-terrific-beginner.glitch.me/event'
    const list = await fetch(url)
    const index = await list.json()
    eventData = {
      id: index[index.length - 1].id + 1,
      select: 'foreign',
      title: data.get('title'),
      writer: data.get('name'),
      date: year + '-' + month + '-' + date,
      contents: data.get('contents'),
    }
    if (method === 'PATCH') {
      eventData = {
        title: data.get('title'),
        writer: data.get('name'),
        contents: data.get('contents'),
      }
      url = 'https://shrub-terrific-beginner.glitch.me/event/' + params.id
      say = '수정이 완료되었습니다.'
    }
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
  window.alert(say)
  return redirect('/')
}
