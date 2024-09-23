# 파티구함

---

배포 주소 :

---

## 프로젝트 소개

- 주제 : 자유로운 스터디 커뮤니케이션 서비스를 통해, 누구나 쉽게 이용할 수 있는 서비스를 제공허는 플레폼입니다.
- 기간 : 24.08.26 ~ 24.09.23
- figma [Link](https://www.figma.com/design/JC765mnWOTJH1MPlN8Rxeh/%ED%8C%8C%ED%8B%B0%EA%B5%AC%ED%95%A8?node-id=63-12331&t=AfHJ6SoR1UMzv1Cw-1)

---

| 이동호                                                                                               | 안지인                                                                             | 고명한                                       |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------- |
| 이미지                                                                                               | 이미지                                                                             | 이미지                                       |
| 스크럼마스터                                                                                         | 디자이너,개발자                                                                    | 개발자,서기                                  |
| 1.로그인<br> 2.인트로페이지 <br> 3. 필터링컴포넌트<br> 4.관심분야<br> 5. 검색페이지<br> 6.게시글작성 | 1.게시글<br> 2.라우터설정<br> 3.헬멧설정<br> 4.다크모드구현<br> 5.홈화면랜더링<br> | 1.채팅<br> 2.프로필 <br> 3.공용컴포넌트 제작 |

## 유저 플로우

---

![alt text](image-1.png)

## 주요 서비스

---

1. 스터디 모집 : 위치 기반서비스로 자신의 주변(동단위) 스터디 모집글 작성
2. 스터디 참가 : 위치 기반서비스로 자신 주변 스터디에 참가할수 있는기능
3. 게시판 : 사용자끼리 궁금한점 을 소통할수 있는 게시판
4. 채팅 : 사용자들간의 개인 채팅으로 학습 내용을 의논할수 있음
5. 프로필 : 자신의 정보를 수정하고 다른유저의 정보를 알아볼수있음 (다른 유저 정보보는 기능 미구현)

## 화면구성

---

<details><summary>인트로 ➡️ 로그인</summary>

![인트로부터로그인](https://github.com/user-attachments/assets/af2bf8d5-f09f-4107-b799-4fa0f825e3cc){: width="375" height="667"}

- 인트로페이지에서 시작버튼 클릭하면 관심분야 선택
- 선택한 관심분야로 게시글 랜더링됨
- 회원가입 시 동일한 이메일이 가입되어 있으면 핫토스트 띄워줌
- 인풋값 검사해서 유요한 값이 아닐경우 힌트
- 회원가입이 완료되면 이메일 인증
- 이메일 인증이 안되어있을경우 로그인 불가
- 모든 조건이 만족하면 로그인 되며 메인페이지(Home)으로 이동됨
</details>

<details><summary>위치기반 서비스</summary>


<img src='https://github.com/user-attachments/assets/96dc42a0-89f2-48b1-8562-e2876fcd6fec'  width="375" height="667" />


- 현재위치 기반으로 해당위치 주변 게시글만 랜더링
- 현재위치 찾는 api 사용
- 내위치 클릭하면 해당 구 설정
</details>

<details><summary>파티모집 필터링 기능</summary>

![파티필터링](https://github.com/user-attachments/assets/804528b7-2404-4a41-ab86-76bf818f69fd){: width="375" height="667"}

- 각 카테고리마다 데이터 필터링
- 최신순 모집중 성별 나이 등으로 필터링 가능
</details>

<details><summary>파티모집 글작성 페이지</summary>

![게시글작성](https://github.com/user-attachments/assets/7a07c621-a942-4720-88c0-83fa6e4365a6){: width="375" height="667"}

- 스터디 모집 게시글 작성
- 카테고리, 관심분야 선택가능 선택된내용에 따라 랜더링 다르게됨
- 이미지 첨부가능
</details>

<details><summary>게시글 댓글달기</summary>

![게시글필터링댓글달기](https://github.com/user-attachments/assets/f3e8eb2b-fdfc-4b45-b0d5-9af50f5d6963){: width="375" height="667"}

- 게시글페이지 카테고리 필터링기능
- 게시글 댓글작성기능
</details>

<details><summary>파티가입 및 채팅</summary>

![파티가입 및 채팅기능](https://github.com/user-attachments/assets/b6b7c265-7f04-4a2a-91e3-76e686f3b2e8){: width="375" height="667"}

- 파티가입 버튼 클릭시 대기유저로 저장됨
- 가입되었거나 대기하고있는 유저 카드 클릭시 채팅연결가능
- 기존 채팅방 있으면 기존채팅방으로 연결
- 기존 채팅방없이 전송하면 새로운 채팅방 만들어지면서 연결
</details>

<details><summary>프로필수정</summary>

![프로필수정](https://github.com/user-attachments/assets/e1b1ff66-7e9c-41c4-9a5f-047ad1b010df){: width="375" height="667"}

- 프로필 이미지 변경가능
- 유저정보 수정시 데이터 저장되고 수정된 정보로 랜더링됨
- 토글버튼 활성화 값으로 성별나이 공개 비공개 가능

</details>

<details><summary>다크모드</summary>

![다크모드](https://github.com/user-attachments/assets/f9fbd87b-8e79-4292-91a2-7bb7fc938818){: width="375" height="667"}

- 다크모드 기능구현
</details>

<details><summary>실시간 채팅</summary>

![실시간채팅](https://github.com/user-attachments/assets/9df8001a-c8ae-4334-9bae-b11260b64022){: width="375" height="667"}

- 실시간채팅기능 구현
- react-virtualized 사용해서 뷰포인트에 들어오는 데이터만 렌더링
- 채팅하던 방이 없을경우, 매세지를 전송하면 채팅방 데이터 생성 및 연결

</details>

## 기술스택

---

| 제목           | 기술스택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **언어**       | <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">                                                                                                                                                                                                        |
| **프레임워크** | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/zustand-000000?style=for-the-badge&logo=zustand&logoColor=white"> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">                                                                                                                                                                                               |
| **도구**       | <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> |

---

## 프로젝트를 진행하면서...⭐️

---

- **고명한**
- 채팅구현 및 데이터 설계
- 데이터 스키마를 설계할때, 데이터를 서로 연결할때 같은 데이터를 공유해서 해당 데이터가 있는 테이블에 컬럼값을 가져올때 그리고 어떻게 데이터를 연결해야하는지 에 대한 고민이 정말많았습니다.
  데이터를 설계하고 작업하지않고 작업을하면서 그때그때 데이터를 연결하고 설계해서 구체적이지 않고 코드로직이 복잡한 감이 없지않아 있는 느낌을 받았습니다.
- 채팅방 실시간 기능
  수파베이스 api를 사용해서 구독기능은 쉽게 할수 있었습니다. 이펙트로 상태를 업데이트할때, 바로 랜더링되는게 아니라 전의 상태값을 가지고있어서 원하는대로 랜더링 되지 않는 부분에서 많이 애를 먹었습니다.
  비동기로 데이터를 가져오고 가져온 데이터를 상태에 두니 랜더링 과정에서 에러가 많아 그부분을 수정하는데 힘들었고 그만큼 많이 학습된거 같습니다.
- 아쉬운점
  전 바닐라 프로젝트때에는 시간에치여 코드리뷰를 못한점이 아쉬웠는데, 이번 프로젝트때에도 코드리뷰를 하고싶었지만. 역시나 시간에 치여 코드리뷰를 못했습니다.
  기능은 가능한데 이기능을 더 쉽게 구현하는 방법 및 코드의 품질에 대해서 팀원들과 나누지못한점이 아쉽습니다.
