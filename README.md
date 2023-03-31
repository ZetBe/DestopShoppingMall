# WaterCommunity
먼저 링크는 <a href="https://watercommunity-43dcf.web.app/">https://watercommunity-43dcf.web.app/</a>이곳으로 들어가면 된다.

이 저장소에 방문하신 여러분 감사합니다.
<br/>
<br/>

# Description
리액트로 커뮤니티 사이트를 만들어봤습니다!
<ul>
  <li>
  <p></p>
    <h3>무슨 주제인가?</h3>
    물과 관련한 이야기를 하는 커뮤니티 형식의 사이트이다.
  </li>
  <li>
  <p></p>
    <h3>왜 이런 주제를 선정했는가?</h3>
    '물은 다 똑같다고 생각하는데, 물 커뮤니티가 있다면 사람들이 쓸까?'라는
    막연한 생각에서 시작했다.
  </li>
  <li>
  <p></p>
    <h3>어떤 기술들을 사용하는가?</h3>
    <p>Front: React, Redux-toolkit, Redux-persist, Axios, React-router</p>
    <p>DUMMY API: json-server</p>
    <p>Browser: Chrome</p>
    <p>Source Control: Git, GitHub Desktop</p>
    <p>Develop Tool: Vscode</p>
    <p>Deploy: google firebase(Front), Glitch(DUMMY API)</p>
  </li>
  <li>
  <p></p>
    <h3>누가 진행하는가?</h3>
    본인인 서희원 혼자서 진행했다.
  </li>
  <li>
  <p></p>
    <h3>몇 주간 진행했는가?</h3>
    2023년 3월부터 약 2주간 진행했다.
  </li>
  <li>
    <h3>어디서 했는가?</h3>
    딱히 장소에 구애받지 않고 개발했다.
  </li>
</ul>
<br/>
<br/>
<br/>

# Mechanism
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/90635746/229140817-4031a64a-7207-4807-9fae-b76651a6bef7.png">

구현한 기능들은 게시글 CRUD, 댓글 작성, Login이 있으며, 각각 어떻게 구현했는지 이야기 해보겠다.

<br/>
<br/>
<br/>
<br/>

## 게시글 CRUD

1. 게시글 작성
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/90635746/229141774-da56fc44-2b9f-4f9c-b2bc-2829f7f2f209.png">
일반 유저라면, <b>국산 물</b>이나 <b>외국 물</b>에 들어가면 사진과 같이 아래에 글쓰기 링크에 들어가면 된다.

<br/>

<img width="1279" alt="image" src="https://user-images.githubusercontent.com/90635746/229141667-4dc3f031-806e-4ef1-8eeb-d1fb4a019ba7.png">
이렇게 글쓰기에 들어가면, <b>카테고리</b>를 설정 후, <b>제목</b>과 <b>내용</b>을 적고 <b>제출</b>을 누르면 된다. 그렇게 하면 alert창으로 제출이 되었다는 메세지를 받게 된다.

<br/>
<br/>
<br/>
<br/>

2. 게시글 읽기
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/90635746/229145625-d00fc26b-62c4-45e1-becd-aec749f5d78e.png">
국산 물, 외국 물, 이벤트 창에 들어가면 모두 같은 모습의 테이블이 나온다. 그래서 해당 제목을 가진 게시글의 내용을 보고싶다면 제목을 클릭해서 보면 된다.

<br/>

<img width="1280" alt="image" src="https://user-images.githubusercontent.com/90635746/229146015-63d12237-5711-4ad6-8545-659ca29330b5.png">
그러면 이렇게 게시글의 내용을 볼 수 있다.

<br/>
<br/>
<br/>
<br/>

3. 게시글 삭제 및 편집
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/90635746/229144122-f08cbcd6-ac2d-4404-95f3-69742e846c4e.png">
만약 게시글을 올린 유저의 이름과 현재 자신이 로그인 중인 유저의 이름이 같다면 게시물 페이지 안에 <b>삭제</b>와 <b>편집</b>버튼이 생기게 된다.

여기서 <b>삭제</b>를 누르면 정말 삭제할 지 물어보고 이에 응답을 하면 삭제한다.

그리고 <b>편집</b>을 누르면 게시글 작성하는 라우트로 이동하게 되는데, 해당 창에서 편집을 완료하면 alert창에서 수정이 되었다는 메세지를 받게 된다.

<br/>
<br/>
<br/>
<br/>

4. 게시글과 json-server간의 소통

기본적으로 <b>fetch</b>를 사용해서 
- 게시글을 읽을려면 json-server에게 `GET` 메소드를 전달해 가져오고,
- 게시글을 작성하면 json-server에게 `POST` 메소드를 전달해 추가하고, 
- 게시글을 편집하면 json-server에게 `PATCH` 메소드를 전달해 수정하고,
- 게시글을 삭제하면 예외로 axios를 사용해 `DELETE` 메소드를 전달해 삭제한다. (그냥 컴포넌트 내부에서 작동하게 해서 굳이 `react-route`의 `action`을 사용하지 않게끔 했다.)

마지막으로 게시글 마다 고유한 `Number`형식의 `id`를 제공한다.

<br/>
<br/>
<br/>
<br/>

## 댓글 작성
1. 댓글 작성
<img width="1267" alt="image" src="https://user-images.githubusercontent.com/90635746/229150528-1a81c283-3c9c-4a1d-b3b0-74ed1c5ba6af.png">
로그인을 했다면 이렇게 댓글을 쓸 수 있게끔 페이지에 나타난다. 그래서 작성하고자 하는 내용을 작성해서 제출하면 된다.

<br/>
<br/>
<br/>
<br/>

2. 댓글 읽기
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/90635746/229150869-a0d8a42d-22af-48f3-832e-b02a9326d282.png">
이렇게 해서 댓글을 작성하면 총 댓글을 작성한 갯수와 각 댓글마다 `Number`형식의 고유 아이디, 작성자, 날짜, 내용이 나온다.

<br/>

여기서 게시글의 id와 차이점이라면 

<br/>

게시글은 `id`만 존재해서 `json-server`에 `get`으로 불러와 `map`을 사용해 나열하는 방식인데,

<br/>
<br/>

댓글은 `Number`형식의 값이 있는 `commentId`라는 항목도 있어서 

<br/>
<br/>

해당 항목을 통해 이 댓글은 `commentId`와 같은 `id`를 가진 게시글에 위치한 댓글임을 알려준다.

<br/>
<br/>

그래서 `react-route`의 `loader`를 통해 미리 배열에 `commentId`와 게시글의 `id`를 비교해 같으면 `push`로 넣어서 해당 리스트를 댓글 명단으로 보내준다.

<br/>
<br/>
<br/>
<br/>

## 로그인

1. 회원가입

<img width="1280" alt="image" src="https://user-images.githubusercontent.com/90635746/229156694-11379bbd-9723-4c8c-a444-94fd02a38a46.png">
로그인 창에 들어가서 회원가입 버튼을 누르면 

<br/>

<img width="1280" alt="image" src="https://user-images.githubusercontent.com/90635746/229156613-b94de340-6d1b-4928-85a8-5da124c785b1.png">
아이디와 비밀번호와 이름을 입력할 수 있는 창을 이렇게 볼 수 있다. 

<br/>

<img width="1280" alt="image" src="https://user-images.githubusercontent.com/90635746/229158250-f723d0d2-bba9-4d57-9554-4a7abafe347a.png">

여기서는 `useState`를 사용해서 아이디와 비밀번호는 각각 맞는 글자수이상을 입력해야 이렇게 등록할 수 있는 버튼이 나온다. 


마지막으로 이름은 제출 되고 나서 검증이 가능한데, 


그 이유는 매번 글자를 입력할 때 마다 회원 목록의 이름들과 비교를 하기에는 사이트입장에서 부담스러울 것이기 때문에 


일부러 나중에 검증을 해서 같은 이름의 회원이 있다면 다시 입력하는 방향으로 만들었다.


만약 겹치는 이름이 없다면 회원가입은 완료된 것이다.


<br/>
<br/>
<br/>
<br/>

2. 로그인
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/90635746/229156613-b94de340-6d1b-4928-85a8-5da124c785b1.png">
아이디와 비밀번호가 맞다면 로그인이 가능하다. 
로그인을 했을 경우, redex-toolkit을 사용해서 로그인이 되었고 해당 유저는 어떤 이름인지 저장하게끔 해놓았다.
그리고 새로고침을 해도 상태가 초기화되지 않도록 redex-persist를 이용해 로그아웃 되기 전까지는 로그인 상태로 만들어 놓았다.
(나중에 토큰도 만들어 보며 일정 시간 지났을 경우 로그아웃되도록 해볼 예정이다.

<br/>
<br/>
<br/>
<br/>


# 마무리
단순히 리액트를 배우는 것을 넘어 많은 것들을 배웠다

특히 `redux-persist`를 사용한 것과 `Link`컴포넌트에 

`state` 프로퍼티를 사용해서 해당 라우트 정보를 라우트 페이지 컴 `props`처럼 받는 `useLocation`을 배우게 되었다.
