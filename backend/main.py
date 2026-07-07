import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import health,jobs,analyze

# 환경변수 로드 (.env 파일이 있으면 읽어옴)
load_dotenv()

# FastAPI 앱 객체 생성
# title과 version은 /docs 페이지에 표시된다
app = FastAPI(
    title="CareerFit AI",
    description="취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치",
    version="0.1.0"
)

# CORS 설정: React 프론트엔드 허용 오리진 결정
# FRONTEND_ORIGINS 환경변수에서 쉼표로 구분된 오리진들을 읽어옵니다.
# 요리 비유: 다른 건물(프론트엔드)에서 오는 배달 요청을 허용하는 설정
frontend_origins_raw = os.getenv("FRONTEND_ORIGINS", "")
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

if frontend_origins_raw:
    extra_origins = [o.strip() for o in frontend_origins_raw.split(",") if o.strip()]
    for eo in extra_origins:
        if eo not in origins:
            origins.append(eo)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(health.router)
app.include_router(jobs.router)
app.include_router(analyze.router)

# 라우터 등록은 실습 4·5·6에서 추가한다
@app.get("/")
def root():
    return {"message": "CareerFit AI 서버가 실행 중입니다."}

