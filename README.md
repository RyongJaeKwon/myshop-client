# MyShop-client
<br />

## 🖥 프로젝트 소개
**SpringBoot** + **React**로 만든 쇼핑몰 개인 프로젝트 입니다
<br/>
<br/>

## 🕰 개발 기간
* **24.06.19 ~ 24.08.02**
<br/>

## ⚙ 기술 스택
* ### 프론트엔드
  * **React**
  * **JavaScript**
  * **TailWindCss**
  * **Redux Toolkit**
  * **Axios**
  * **Node.js**
<br/>

## 🔗 API 통신
* 서버와의 통신을 위해 **Axios 라이브러리**를 사용하며, 인증 및 요청 처리를 위해 **Axios interceptors**를 사용하여 토큰을 관리합니다.<br/>
<br/>

## 📺 화면 구성
| 메인 페이지(관리자) | 메인 페이지(기본) |
| ------------------ | --------------------- |
| * 카테고리별 상품 조회<br/> * 상품 검색 <br/> * 관리자 아이디로 로그인시에만 상품등록 버튼 표시
<img src="https://github.com/user-attachments/assets/ab526549-2a1c-40e7-a3a0-d36a380d93b7" width="500" height="600"/> | <img src="https://github.com/user-attachments/assets/8b139be5-7b22-4617-bdcd-149c20ddbcc7"  width="500" height="600"/> |

* ### 로그인 페이지
  * 로그인
  * 카카오 로그인
  * 회원가입
  * 쿠키를 이용해 로그인 정보 유지
<img src="https://github.com/user-attachments/assets/4a085f7e-be59-4883-9cad-5ce406e7f257" width="700" height="500"/>

* ### 회원가입 페이지
  * ID 중복체크 버튼
  * Email 중복체크 버튼
<img src="https://github.com/user-attachments/assets/7f64ad85-e47f-4a46-b4fb-d72dc9700794" width="700" height="600"/>

* ### 유효성 체크
  * 각 input 요소별 유효성 체크
<img src="https://github.com/user-attachments/assets/0b7065ae-fc55-4567-a872-a90c011690ce" width="700" height="600"/>

* ### 아이템 등록 페이지
  * 파일 업로드 2개 이상 가능
  * 미리보기 지원
<img src="https://github.com/user-attachments/assets/63f1045a-b0aa-4683-9966-09456f23930e" width="700" height="600"/>

* ### 카테고리별 상품 페이지
  * 해당 카테고리 상품만 조회
  * 페이징 처리
<img src="https://github.com/user-attachments/assets/d8d53d3d-319e-4d77-8873-663e645df135" width="800" height="600"/>

| 상품조회 페이지(관리자) | 상품조회 페이지(기본) |
| ----------------------- | --------------------- |
| * 해당 상품의 리뷰까지 함께 조회 <br/> * 상품 리뷰 등록, 수정, 삭제 <br/> * 관리자 아이디로 로그인시에만 상품수정, 상품삭제 버튼 표시
<img src="https://github.com/user-attachments/assets/ba4828eb-071e-40a9-aeaa-0b133ea5c1df" width="500" height="700"/> | <img src="https://github.com/user-attachments/assets/0452ceda-e8db-43fa-af47-02a6ac24c917" width="500" height="700"/> |

* ### 아이템 리뷰
  * 최근 등록된 순으로 리뷰 조회
  * 본인이 작성한 리뷰만 수정, 삭제 가능
<img src="https://github.com/user-attachments/assets/5d55a790-2e41-4909-ae28-a441d222bddf" alt="Signup Check Page" width="900" height="400"/>

* ### 장바구니
  * 상품 수량변경
  * 장바구니 상품 삭제
  * 장바구니 주문
  * 로컬 스토리지를 이용해 장바구니 아이템 목록을 유지
<img src="https://github.com/user-attachments/assets/cbbbc367-d4e3-44d9-adc0-a4bbb14de1b4" alt="Signup Check Page" width="800" height="600"/>

* ### 주문
  * 주문할 상품에 대한 기본 정보
  * 주문자 정보, 배송 정보 입력
<img src="https://github.com/user-attachments/assets/b9d40855-8459-4b3d-afcc-4cdd917e2205" alt="Signup Check Page" width="800" height="700"/>

* ### 주문목록
  * 장바구니 페이지에서 주문했을 경우, 주문이 완료되면 장바구니 비워짐
  * 취소되지 않은 주문만 주문 상세보기, 주문취소 버튼 표시
<img src="https://github.com/user-attachments/assets/4640c938-9223-4bef-a80a-2470451eca5b" alt="Signup Check Page" width="800" height="700"/>

* ### 주문 상세보기
  * 해당 주문에 대한 기본 정보
<img src="https://github.com/user-attachments/assets/a556c4cd-7d95-47f8-8cdc-47a87f80f8ed" alt="Signup Check Page" width="800" height="700"/>
