import { useSelector } from 'react-redux'
import {
  Form,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from 'react-router-dom'
import classes from './PostForm.module.css'
import { RootState } from '../store'

function PostForm({ method, post }) {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const account = useSelector((state: RootState) => state.account)
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
            value={account.username}
            readOnly
          ></input>
          카테고리
          {!post && (
            <select name="select">
              <option value="korean" key={0}>
                국산 물
              </option>
              <option value="foreign" key={1}>
                외국 물
              </option>
              {account.username === 'ZetBe' && (
                <option value="event" key={2}>
                  이벤트
                </option>
              )}
            </select>
          )}
          {post && (
            <select name="select">
              {post.select === 'korean' && (
                <option value="korean" key={0}>
                  국산 물
                </option>
              )}
              {post.select === 'foreign' && (
                <option value="foreign" key={1}>
                  외국 물
                </option>
              )}
              {account.username === 'ZetBe' && (
                <option value="event" key={2}>
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
  type Post = {
    id: number
    select: string
    title: string
    writer: string
    date: string
    contents: string
  }
  type Patch = {
    title: string
    writer: string
    contents: string
  }
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()
  const method = request.method
  const data = await request.formData()
  const select = data.select

  if (select === '국산 물' && method === 'post') {
    const url = 'https://shrub-terrific-beginner.glitch.me/korean'
    const list = await fetch(url)
    const index = await list.json()

    const say = '작성이 완료되었습니다.'
    const eventData: Post = {
      id: index[index.length - 1].id + 1,
      select: 'korean',
      title: data.get('title'),
      writer: data.get('name'),
      date: year + '-' + month + '-' + date,
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
    window.alert(say)
  } else if (select === '국산 물' && method === 'PATCH') {
    const eventData: Patch = {
      title: data.get('title'),
      writer: data.get('name'),
      contents: data.get('contents'),
    }
    const url = 'https://shrub-terrific-beginner.glitch.me/korean/' + params.id
    const say = '수정이 완료되었습니다.'
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
  } else if (select === '외국 물' && method === 'post') {
    const url = 'https://shrub-terrific-beginner.glitch.me/foreign'
    const list = await fetch(url)
    const index = await list.json()
    const say = '작성이 완료되었습니다.'
    const eventData: Post = {
      id: index[index.length - 1].id + 1,
      select: 'foreign',
      title: data.get('title'),
      writer: data.get('name'),
      date: year + '-' + month + '-' + date,
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
    window.alert(say)
  } else if (select === '외국 물' && method === 'PATCH') {
    const eventData: Patch = {
      title: data.get('title'),
      writer: data.get('name'),
      contents: data.get('contents'),
    }
    const url = 'https://shrub-terrific-beginner.glitch.me/foreign/' + params.id
    const say = '수정이 완료되었습니다.'
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
  } else if (select === '이벤트' && method === 'post') {
    const url = 'https://shrub-terrific-beginner.glitch.me/event'
    const list = await fetch(url)
    const say = '작성이 완료되었습니다.'
    const index = await list.json()
    const eventData: Post = {
      id: index[index.length - 1].id + 1,
      select: 'foreign',
      title: data.get('title'),
      writer: data.get('name'),
      date: year + '-' + month + '-' + date,
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
    window.alert(say)
  } else if (select === '이벤트' && method === 'PATCH') {
    const eventData: Patch = {
      title: data.get('title'),
      writer: data.get('name'),
      contents: data.get('contents'),
    }
    const url = 'https://shrub-terrific-beginner.glitch.me/event/' + params.id
    const say = '수정이 완료되었습니다.'
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
  }

  return redirect('/')
}
