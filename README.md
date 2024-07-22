# 지오웨더(GeoWeather)
<h1>코딩알려주는누나 자바스크립트 2기 팀프로젝트 5조</h1>
<br/>

## 링크
- [배포](https://codingsister-js-teamproject.netlify.app/)
- [Figma](https://www.figma.com/design/OaschMcLrot0yruH5uJ0eP/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-2%EA%B8%B0-5%EC%A1%B0?node-id=0-1&t=C4qpCrbpSWfTIDzc-0)
<br/><br/>

## 프로젝트 소개
### 주제
날씨 정보와 지도 서비스를 결합한 실시간 위치 기반 서비스
### 목적
- 사용자 편의성 증대
  - 사용자들이 현재 위치나 특정 장소의 날씨를 손쉽게 확인<br/>
- 안전 및 계획 수립
  - 여행, 야외 활동, 비즈니스 일정 등 다양한 상황에서 실시간 날씨 정보를 제공하여 안전하고 효율적인 계획을 세우기 가능<br/>
- 정보 통합
  - 지도와 날씨 정보를 하나의 플랫폼에서 제공하여 사용자 경험을 향상
### 쓰임새
- 여행 및 관광
  - 특정 관광지의 현재 날씨를 지도에서 확인하고, 날씨에 따른 추천 활동이나 관광 코스를 안내
- 일정 관리
  - 업무 미팅이나 야외 행사의 위치와 해당 지역의 날씨를 실시간으로 확인하여 계획을 조정할 수 있음
### 기대
이 서비스를 통해 사용자들이 날씨 정보에 기반한 더 나은 결정을 내리고, 그로 인해 일상의 편의성과 안전성 향상
<br/><br/>

## 개발 기간
2024년 7월 14일 일요일 ~ 2024년 7월 21일 일요일 (총 8일)
<br/><br/>

## Team
|<img src="https://avatars.githubusercontent.com/u/84506439?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/93964175?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/174152392?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/154667059?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/46155632?v=4" width="150" height="150"/>|
|:-:|:-:|:-:|:-:|:-:|
|[@jaeyoung99-lee](https://github.com/jaeyoung99-lee)<br/>Scrum Master<br/>Developer|[@wpgml](https://github.com/wpgml)<br/>Developer|[@jein4433](https://github.com/jein4433)<br/>Developer|[@hyun-june](https://github.com/hyun-june)<br/>Developer|[@ghd075](https://github.com/ghd075)<br/>Product Owner<br/>Developer|
<br/>

## 기능
- 검색
- 출발지, 목적지 설정
- 현재 위치 기준 실시간 날씨 정보 제공
- 원하는 위치의 실시간 날씨 정보 제공
- 키워드 클릭으로 빠르게 위치 확인
- 폴리라인으로 가독성 높은 길 안내
- 음성인식으로 위치 검색
<br/><br/>

## API
- KakaoMap API
- OpenWeather API
- Web Speech API
<br/><br/>

## 개발 일지
<details>
  <summary><b>2024년 7월 14일 일요일 (1일차)</b></summary>
    <details> 
      <summary><b>Done</b></summary>
        <div>
         <ul>
           <li>
             팀원 역할 뽑기
           </li>
           <li>
             Figma로 Product Backlog 만들기
           </li>
           <li>
             VSCode 환경 설정 세팅
           </li>
           <li>
             깃허브 레포지토리 생성 및 팀원 초대
           </li>
           <li>
             배포 링크 생성
           </li>
           <li>
             커밋 컨벤션 정하기
           </li>
           <li>
             변수명 정하기
           </li>
           <li>
             브랜치명 정하기
           </li>
           <li>
             업무 배분하기
           </li>
             <ol>
               이재영 - 날씨 api 불러와서 현재 날씨 조회<br/>
               이제의 - 키워드 검색<br/>
               이제인 - 출발지와 도착지 거리<br/>
               이현준 - 이동 수단에 따른 소요 시간<br/>
               홍창용 - 카테고리 검색
             </ol>
         </ul> 
        </div>
    </details>
    <details>
      <summary><b>To Do</b></summary>
        <div>
          <ul>
            <li>
              각자 지도 api 불러와서 업무 진행해보기
            </li>
          </ul>
        </div>
    </details>  
</details>
<details>
  <summary><b>2024년 7월 15일 월요일 (2일차)</b></summary>
    <details> 
      <summary><b>Done</b></summary>
        <div>
         <ul>
           <li>
             오후 10시 스탠드업 미팅 진행
           </li>
           <li>
             이재영 - 날씨 api 불러와서 현재 날씨 띄우기
           </li>
           <li>
             이제의 - 지도 api 불러와서 검색 기능
           </li>
           <li>
             이제인 - 지도 api 불러와서 선 찍기
           </li>
           <li>
             이현준 - 지도 api 불러와서 카카오맵과 유사한 UI 만들기
           </li>
           <li>
             홍창용 - 지도 api 불러와서 샘플 코드 따라하기
           </li>
         </ul> 
        </div>
    </details>
    <details>
      <summary><b>To Do</b></summary>
        <div>
          <ul>
            <li>
              깃허브 커밋 안되는 거 해결하기
            </li>
            <li>
              이재영 - 도시 검색 시 한글로도 검색되게 구현
            </li>
            <li>
              이제의 - github에 코드 올리기 / 키워드 검색 관련 목록 띄우기 / 마커 포인트 누르면 위치에 대한 정보가 뜨도록 하기
            </li>
            <li>
              이제인 - 검색 기능을 사용해서 출발지와 도착지 사이의 실질적인 거리 구하기
            </li>
            <li>
              이현준 - 출발지와 도착지 사이의 이동 거리를 선을 이용하여 지도에 표시 / 지도에 표시된 선을 활용해 운행 정보 길찾기
            </li>
            <li>
              홍창용 - 카카오 샘플 코드 좀 더 분석 / github에 코드 올리기 / 인포윈도우 구현
            </li>
          </ul>
        </div>
    </details>  
</details><details>
  <summary><b>2024년 7월 16일 화요일 (3일차)</b></summary>
    <details> 
      <summary><b>Done</b></summary>
        <div>
         <ul>
           <li>
             깃허브 설정 수정을 통해 커밋 안되는 거 해결
           </li>
           <li>
             소스트리 사용 방법 강의 by 이재영
           </li>
           <li>
             이재영 - 도시 검색 시 한글로도 검색되게 구현(도전중)
           </li>
           <li>
             이제의 -  github에 코드 올리기 / 키워드 검색 관련 목록 띄우기 / 마커 포인트 누르면 위치에 대한 정보가 뜨도록 하기
           </li>
           <li>
             이제인 - 출발지와 도착지의 좌표값 조회
           </li>
           <li>
             이현준 - 출발지와 도착지 사이의 이동 거리를 선을 이용하여 지도에 표시 / 지도에 표시된 선을 활용해 운행 정보 길찾기(출발지와 도착지 현재는 하드코딩 상태)
           </li>
           <li>
             홍창용 - github에 코드 올리기 / 코드 분석중
           </li>
         </ul> 
        </div>
    </details>
    <details>
      <summary><b>To Do</b></summary>
        <div>
          <ul>
            <li>
              이재영 - 도시 검색 시 한국말로 검색되게 구현(조금 더 시도) / 프로젝트 방향성 생각(지도 API 및 날씨 API를 이용한 프로그램이 어디에 쓰일지 등)
            </li>
            <li>
              이제의 - 검색 목록 인포윈도우를 눌렀을 때 그 장소에 대한 정보 더 뜨도록 하기 / 기능 가능한지 찾기(찜 기능, 실시간 랭킹, 지도에 누른 곳 좌표 찍히도록 하기)
            </li>
            <li>
              이제인 - 마커 클릭으로도 위치 선택 가능하게 만들기
            </li>
            <li>
              이현준 - 코드 합치기 및 정리
            </li>
            <li>
              홍창용 - 카테고리별 검색 기능 오류 수정해서 정상적으로 기능 돌아가게 만들기  
            </li>
          </ul>
        </div>
    </details>  
</details><details>
  <summary><b>2024년 7월 17일 수요일 (4일차)</b></summary>
    <details> 
      <summary><b>Done</b></summary>
        <div>
         <ul>
           <li>
             지금까지의 코드 합쳐서 develop 브랜치에 merge 및 배포
           </li>
         </ul> 
        </div>
    </details>
    <details>
      <summary><b>To Do</b></summary>
        <div>
          <ul>
            <li>
              공통 - UI 생각해보기
            </li>
            <li>
              이재영 - 프로젝트 방향성 생각(지도 API 및 날씨 API를 이용한 프로그램이 어디에 쓰일지 등)
            </li>
            <li>
              이제의 - 찜 기능
            </li>
            <li>
              이제인 - 마커 클릭으로도 위치 선택 가능하게 만들기
            </li>
            <li>
              이현준 - 코드 합치기 및 정리
            </li>
            <li>
              홍창용 - 카테고리별 검색 기능 오류 수정해서 정상적으로 기능 돌아가게 만들기  
            </li>
          </ul>
        </div>
    </details>  
</details><details>
  <summary><b>2024년 7월 18일 목요일 (5일차)</b></summary>
    <details> 
      <summary><b>Done</b></summary>
        <div>
         <ul>
           <li>
             지금까지의 코드 합쳐서 develop 브랜치에 merge 및 배포 
           </li>
         </ul> 
        </div>
    </details>
    <details>
      <summary><b>To Do</b></summary>
        <div>
          <ul>
            <li>
              공통 - 프로그램의 목적과 주제 생각해오기
            </li>
            <li>
              이재영 - 코드 리팩토링
            </li>
            <li>
              이제의 - 코드 합치기 / UI 구상도
            </li>
            <li>
              이제인 - 코드 합치기
            </li>
            <li>
              이현준 - 코드 리팩토링
            </li>
            <li>
              홍창용 - 코드 리팩토링
            </li>
          </ul>
        </div>
    </details>  
</details><details>
  <summary><b>2024년 7월 19일 금요일 (6일차)</b></summary>
    <details> 
      <summary><b>Done</b></summary>
        <div>
         <ul>
           <li>
             코드 리팩토링
           </li>
         </ul> 
        </div>
    </details>
    <details>
      <summary><b>To Do</b></summary>
        <div>
          <ul>
            <li>
              css
            </li>
          </ul>
        </div>
    </details>  
</details><details>
  <summary><b>2024년 7월 20일 토요일 (7일차)</b></summary>
    <details> 
      <summary><b>Done</b></summary>
        <div>
         <ul>
           <li>
             css
           </li>
           <li>
             아직 완성되지 않은 기능 구현 후 코드 합치기
           </li>
         </ul> 
        </div>
    </details>
    <details>
      <summary><b>To Do</b></summary>
        <div>
          <ul>
            <li>
              css
            </li>
          </ul>
        </div>
    </details>  
</details><details>
  <summary><b>2024년 7월 21일 일요일 (8일차)</b></summary>
    <details> 
      <summary><b>Done</b></summary>
        <div>
         <ul>
           <li>
             css
           </li>
           <li>
             발표
           </li>
         </ul> 
        </div>
    </details>
    <details>
      <summary><b>To Do</b></summary>
        <div>
          <ul>
            <li>
              팀프로젝트 리뷰
            </li>
          </ul>
        </div>
    </details>  
</details>
<br/>
