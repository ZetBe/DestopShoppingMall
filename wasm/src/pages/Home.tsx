import classes from './page.module.css'
function HomePage() {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()
  let h = today.getHours()

  return (
    <>
      <h1>세상은 넓지만 우리가 마실 물은 별로 없다.</h1>
      <div className={classes.timer}>
        <p>
          오늘은 {year}년 {month}월 {date}일이에요.
        </p>
        <p>
          그나저나 지금 {h}시인데
          {h < 5 &&
            ' 벌써 이렇게 어두워졌네요. 보던 기기는 끄고 자는 것은 어떨까요?'}
          {h >= 5 &&
            h < 10 &&
            ' 밤새 잘 잤나요? 아침에 일어나서 물 한잔은 정말 좋답니다.'}
          {h >= 10 && h < 19 && ' 틈틈이 물을 마셔줍시다.'}
          {h >= 19 && h <= 23 && ' 커뮤니티는 재미있나요?'}
        </p>
      </div>
    </>
  )
}

export default HomePage
