import { Link } from 'react-router-dom'
import classes from './page.module.css'

function ErrorPage() {
  return (
    <div className={classes.div}>
      <header className={classes.header}>
        <b>404</b> 해당 페이지가 존재하지 않습니다.
        <br />
      </header>
      <Link
        to="/"
        style={{
          color: 'rgb(12,166,120)',
          fontSize: '17px',
        }}
      >
        메인 화면으로 돌아가기
      </Link>
    </div>
  )
}

export default ErrorPage
