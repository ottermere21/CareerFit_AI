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
### 1. 가상환경
```bash
# 활성화
cd backend
source venv/bin/activate

# 패키지 설치
pip install -r requirements.txt

# 비활성화
deactivate
```

### 2. env. 파일 생성
```bash
cd backend
cp .env.example .env 
```
이후 발급된 키 값 적어주기


### 실행
```bash
uvicorn main:app --reload --port 8000
```

### API
- API 문서: http://localhost:8000/docs
| 메소드 | 경로 | 설명 |
| GET | /health | 서버 상태 확인 |
| GET | /jobs | 공모전·직무 목록 조회 |
| POST | /analyze | 분석 요청 |

## 


## 진행 현황
- [x] 1일차: 프로젝트 기획 및 개발 환경 세팅
- [x] 2일차: FastAPI 서버 구축 및 Gemini API 연결
- [ ] 3일차: 데이터 파이프라인 구축
- [ ] 4일차: RAG 기반 서비스 + React UI
- [ ] 5일차: Docker + 포트폴리오 완성