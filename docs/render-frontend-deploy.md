# Render 클라우드 프론트엔드 Docker 배포 및 연동 가이드

이 문서는 React/Vite 프론트엔드를 Docker 기반으로 패키징하고, FastAPI 백엔드 웹 서비스와 안전하게 연결하여 Render에 배포하는 전체 과정을 설명합니다.

---

## 1. 로컬 실행 및 연동 방법

로컬 개발 환경에서 백엔드(FastAPI)와 프론트엔드(Vite)를 실행하고 연동하는 방법입니다.

### 백엔드 (FastAPI) 실행
1. `backend/` 폴더로 이동합니다.
2. 가상환경 활성화 후 필요한 라이브러리를 설치합니다.
   ```bash
   pip install -r requirements.txt
   ```
3. `backend/.env` 파일을 생성하고 필요한 설정값을 채워 넣습니다 (아래 환경변수 단락 참조).
4. FastAPI 서버를 구동합니다.
   ```bash
   uvicorn main:app --reload
   ```
   *백엔드는 기본적으로 `http://localhost:8000`에서 대기합니다.*

### 프론트엔드 (React/Vite) 실행
1. `frontend/` 폴더로 이동합니다.
2. 의존성 패키지를 설치합니다.
   ```bash
   npm install
   ```
3. `frontend/.env` 파일을 생성한 후 백엔드 API 주소를 선언합니다.
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```
4. 프론트엔드 개발 서버를 구동합니다.
   ```bash
   npm run dev
   ```
   *프론트엔드는 기본적으로 `http://localhost:5173`에서 실행됩니다.*

---

## 2. 환경변수 설정 가이드

### 프론트엔드 환경변수
Vite는 빌드 시점에 `VITE_`로 시작하는 환경변수를 소스코드에 정적으로 주입합니다.
- **`VITE_API_BASE_URL`**: 프론트엔드가 요청을 보낼 FastAPI 백엔드의 기본 주소입니다.
  - *로컬 예시*: `http://localhost:8000`
  - *배포 예시*: `https://careerfit-ai-d4du.onrender.com`

### 백엔드 CORS 환경변수
브라우저의 보안 정책(CORS)으로 인해, 백엔드는 허용된 도메인의 요청만 수신해야 합니다.
- **`FRONTEND_ORIGINS`**: 허용할 프론트엔드 주소들을 쉼표(`,`)로 구분하여 적습니다.
  - *예시*: `http://localhost:5173,http://127.0.0.1:5173,https://careerfit-frontend.onrender.com`
  - *참고*: 백엔드는 `FRONTEND_ORIGINS` 값이 설정되어 있지 않더라도, 기본적인 로컬 주소(`localhost:5173`, `127.0.0.1:5173`, `localhost:3000`, `127.0.0.1:3000`)는 항상 기본값으로 허용하도록 안전하게 설계되어 있습니다.

---

## 3. 프론트엔드 Dockerfile 구조 설명

프론트엔드는 **멀티 스테이지 빌드(Multi-stage Build)** 방식을 사용하여 최종 이미지 용량을 극대화하여 압축하고 보안을 강화했습니다.

1. **빌드 스테이지 (`node:22-alpine`)**:
   - `package.json`과 `package-lock.json`을 먼저 복사하여 `npm ci`로 신속하고 일관되게 의존성을 설치합니다.
   - `ARG VITE_API_BASE_URL` 빌드 인자를 선언하고 `ENV VITE_API_BASE_URL`로 전환하여, Vite가 빌드 시점에 알맞은 백엔드 주소를 자바스크립트 번들에 하드코딩(주입)할 수 있게 유도합니다.
   - `npm run build`를 실행해 배포용 정적 파일(`dist/` 디렉토리)을 생성합니다.
2. **실행 스테이지 (`nginx:alpine`)**:
   - 빌드 스테이지에서 생성된 가벼운 정적 파일들만 `nginx` 서빙 디렉토리인 `/usr/share/nginx/html`로 복사합니다. Node.js 빌드 툴과 소스코드는 최종 이미지에서 제외됩니다.
   - `nginx.conf`를 적용해 Single Page Application(SPA) 환경에서 새로고침 시 경로를 찾지 못하는 문제를 방지하기 위한 Fallback 라우팅 구조를 갖춥니다.

---

## 4. Render에 프론트엔드 배포하기 (Docker 기반 Web Service)

Render 클라우드에 Dockerfile을 기반으로 프론트엔드를 배포하는 단계별 가이드입니다.

### [1단계] GitHub 저장소 준비
- 작성한 코드를 GitHub 저장소에 푸시합니다.
- `.env` 등 민감 정보가 깃에 커밋되지 않았는지 반드시 확인합니다.

### [2단계] Render Web Service 생성
1. [Render 대시보드](https://dashboard.render.com/)에 로그인합니다.
2. **New +** 버튼을 누르고 **Web Service**를 선택합니다.
3. 대상 프로젝트의 GitHub 저장소를 연결합니다.
4. 아래와 같이 설정 정보를 입력합니다:
   - **Name**: `careerfit-frontend` (원하는 서비스 이름)
   - **Root Directory**: `frontend` (프론트엔드 폴더 경로를 지정하여 내부 Dockerfile을 실행하게 함)
   - **Region**: 사용자에게 가까운 리전 선택 (예: Singapore)
   - **Branch**: `main` (혹은 배포용 브랜치)
   - **Runtime**: **Docker** (반드시 Docker로 지정해야 합니다)
   - **Docker Command**: 비워둠 (Dockerfile 내 정의된 CMD가 기본 실행됨)
   - **Instance Type**: **Free** (혹은 적합한 요금제)

### [3단계] 환경변수(Environment Variables) 설정
Vite의 성격상, 환경변수는 **빌드 시점(Build Time)**에 주입되어야 합니다. Render는 Docker 빌드 시 서비스 환경변수를 Docker build argument(ARG)로 자동으로 주입해 줍니다.

1. **Advanced** 버튼을 눌러 Environment Variables 섹션으로 이동합니다.
2. **Add Environment Variable**을 눌러 다음 키-값을 생성합니다:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: *배포된 Render 백엔드 주소* (예: `https://careerfit-ai-d4du.onrender.com`)
3. **Create Web Service**를 클릭합니다. Render가 빌드를 시작하고 웹 페이지 서빙을 준비합니다.

---

## 5. Render 전체 환경변수 구성표

안정적인 서비스 연동을 위한 양측의 최종 환경변수 설정값 예시입니다.

### 프론트엔드 서비스 환경변수 (Render)
| 환경변수 Key | 권장 설정값 (예시) | 설명 |
| :--- | :--- | :--- |
| **`VITE_API_BASE_URL`** | `https://careerfit-ai-d4du.onrender.com` | FastAPI 백엔드 배포 주소 (끝에 `/` 제외 권장) |

### 백엔드 서비스 환경변수 (Render)
| 환경변수 Key | 권장 설정값 (예시) | 설명 |
| :--- | :--- | :--- |
| **`FRONTEND_ORIGINS`** | `https://careerfit-frontend.onrender.com` | 프론트엔드 배포 주소 (쉼표로 여러 개 지정 가능) |
| **`GEMINI_API_KEY`** | `AIzaSy...` (실제 발급받은 키) | Gemini API 호출용 비밀 키 |

---

## 6. 배포 후 확인 및 CORS 트러블슈팅

### 배포 완료 후 검증 절차
1. Render 프론트엔드 서비스 주소(예: `https://careerfit-frontend.onrender.com`)에 브라우저로 접속합니다.
2. 정보를 입력하고 **역량 분석 요청**을 보냅니다.
3. 정상적으로 데이터가 로드되고 결과 카드가 렌더링되는지 확인합니다.

### CORS 오류 해결 방법
만약 개발자 도구 콘솔(F12)에 `Access-Control-Allow-Origin` 또는 `CORS` 관련 에러가 발생한다면 다음 항목을 체크하세요.

1. **백엔드 환경변수 스펠링 검증**:
   - Render 백엔드 환경변수에 `FRONTEND_ORIGINS`가 오타 없이 정상 등록되었는지 확인합니다.
2. **프론트엔드 주소 매칭 검증**:
   - `FRONTEND_ORIGINS`에 등록된 주소와 실제 브라우저 주소 표시줄의 주소가 정확히 일치하는지 비교합니다. (프로토콜 `https://` 유무 및 끝 부분 `/` 포함 여부 등)
3. **백엔드 서비스 재시작**:
   - 백엔드의 환경변수를 수정한 후에는 반드시 Render 서비스가 완전히 다시 배포(Redeploy) 또는 재시작되어 값이 반영되었는지 대시보드 상태를 체크해야 합니다.

---

## 7. Git 보안 수칙: GitHub에 올리면 안 되는 파일 목록

프로젝트의 보안을 위해 아래 파일들은 절대 원격 저장소에 업로드(Commit/Push)되어서는 안 됩니다.

- **`.env` / `.env.local` / `.env.*`**: 실제 API Key(Gemini, Mistral 등) 및 민감 주소가 적힌 설정 파일입니다.
- **`node_modules/`**: 개발 및 패키지 실행용 대용량 파일들입니다.
- **`dist/`**: 빌드 시 생성되는 컴파일 자산으로 원격 저장소 업로드 시 용량 낭비가 심합니다.
- **`venv/` / `.venv/`**: 파이썬 가상환경 디렉토리입니다.
- **`__pycache__/`**: 파이썬 인터프리터 캐시 디렉토리입니다.
