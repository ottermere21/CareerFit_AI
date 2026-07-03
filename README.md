# CareerFit AI
취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치


## 프로젝트 개요
[본인이 작성한 문제 정의 한 단락]


## 기술 스택
| 영역 | 기술 |
|---|---|
| 백엔드 | Python3.11, FastAPI |
| AI API | Gemini 2.5 Flash-Lite |
| 데이터 | Pandas, SQLite, ChromaDB |
| 프론트엔드 | React, Vite |
| 실행 환경 | Docker |

## 로컬 실행 방법
### 1. Backend Setup
```bash
# 활성화
cd backend
source venv/bin/activate

# 의존성 패키지 설치
pip install -r requirements.txt

# 환경변수 설정
cp .env.example .env 


# 백엔드 서버 실행
uvicorn main:app --reload --port 8000

# 비활성화
deactivate
```
- API Docs: http://localhost:8000/docs 에서 Swagger 인터랙티브 문서 확인 가능

Backend API Endpoint
| Method |	Endpoint |	Description |
| GET |	/health	| 서버 상태 점검 (Health Check) |
| GET |	/jobs |	공모전 및 추천 직무 목록 조회 |
|POST |	/analyze |	이력서/포트폴리오 AI 분석 요청 |


-------

### Project Structure
```text
CareerFit_AI/
├── backend/            # FastAPI 기반 API 서버
│   ├── data/           # SQLite 및 ChromaDB 벡터 데이터
│   ├── routers/        # API 엔드포인트 정의 (health, jobs, analyze)
│   ├── services/       # AI 비즈니스 로직 및 RAG 파이프라인
│   └── main.py         # 애플리케이션 진입점
├── frontend/           # React/Vite 기반 사용자 인터페이스
│   └── srd/            # 프론트엔드 소스 코드
└── docs/               # 설계 문서 및 API 명세서
```


### API
- API 문서: http://localhost:8000/docs
| 메소드 | 경로 | 설명 |
| GET | /health | 서버 상태 확인 |
| GET | /jobs | 공모전·직무 목록 조회 |
| POST | /analyze | 분석 요청 |


## RoadMap
- [x] 1일차: 프로젝트 기획 및 개발 환경 세팅
- [x] 2일차: FastAPI 서버 구축 및 Gemini API 연결
- [ ] 3일차: 데이터 파이프라인 구축
- [ ] 4일차: RAG 기반 서비스 + React UI
- [ ] 5일차: Docker + 포트폴리오 완성