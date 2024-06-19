# react-chat

Skill: Emotion, Multer, MySql, Nestjs, Passport/jwt, React, SWR, Socket.io, Typeorm, Typescript
Type: Side Project
Position: Back-end, Front-end

![Untitled 4](https://github.com/kingheedo/react-chat/assets/52102550/f14cc251-938f-47fe-8e6e-b7d95bc8bb8c)

## 소개

협업 툴 Slack을 모티브로 하여 만든 웹 채팅 어플리케이션

## 주요기능

|  |  |
| --- | --- |
| 회원가입 및 로그인  | jwt를 이용한 회원가입 및 로그인 |
| 워크스페이스  | 워크스페이스 추가, 다른 사용자를 워크스페이스에 초대 |
| 채널 | 채널 생성, 다른 사용자를 채널에 초대, 채널에 참여한 사용자는 채팅 가능 |
| DM | 워크스페이스에 참여한 사용자에게 개인 Direct Message 보내기 가능 |
| 온, 오프라인 유저 | 현재 워크스페이스에 접속한 사용자 확인 가능 |
| 읽지 않은 채팅 | 채팅과 DM의 읽지 않은 채팅 수 확인 가능 |

## 주요작업

### 프론트엔드

- access token만료에 따른 401에러 응답시 refresh token을 이용하여 새로운 access token을 발급하여 로그인 유지
- access token만료에 따른 401에러로 인해 실패했던 api들을 재요청 가능하게 설계
- react lazy, suspense를 적용하여 실제 컴포넌트가 필요한 시점에서 불러오도록 설계
- HOC를 사용하여 로그인 상태에 따른 라우팅 설계
- 비동기 상태 관리로 SWR 라이브러리 사용,  api를 custom hook으로 분리
- useSWRInfinite를 이용하여 채팅 목록에서 제일 상단으로 스크롤링시 목록 추가로 불러오기
- 채팅 입력 시 SWR의 optimistic update를 이용하여 사용자 경험성 향상
- input, socket 로직을 custom hook으로 분리
- 전역상태관리로 zustand 및 persist 기능을 활용하여 로컬스토리지에 마지막으로 읽은 메시지의 날짜 관리
- react-quill 라이브러리를 이용한 에디터 기능 구현

### 백엔드

- 각 모델의 entity 생성 및 관계 설정, mysql과 연동
- 모듈, 컨트롤러, 서비스를 구분지어 담당 로직을 분리
- 커스텀 데코레이터를 만들어 request.user를  @User를 통해 호출 할 수 있도록 구현
- http-execption-filter를 통해 서버 응답 커스텀
- jwt 가드 및 passport-jwt 전략을 이용하여 로그인 기능 구현
- typeorm의 쿼리빌더를 활용하여 db 데이터 관리
- 트랜잭션을 활용하여 에러 발생 시 롤백되도록 설계
- multer-s3를 활용하여 aws s3에 이미지 업로드 구현
- gateway를 활용하여 socket 로직 구현

![Untitled 1](https://github.com/kingheedo/react-chat/assets/52102550/0162e898-9537-40f8-9938-56d8780d1e4e)
![Untitled 2](https://github.com/kingheedo/react-chat/assets/52102550/5a76e7cd-faea-4501-ae8a-aacbe4bc653f)
![Untitled 3](https://github.com/kingheedo/react-chat/assets/52102550/04539433-0f38-4d46-bc77-7c0185f14c62)
![Untitled 4](https://github.com/kingheedo/react-chat/assets/52102550/26755b99-6a1c-4aca-8515-0afbf568a083)
