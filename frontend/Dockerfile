# 1. 빌드 스테이지
# Node.js 베이스 이미지 선택 (가벼운 Alpine Linux 버전)
FROM node:18-alpine AS build
WORKDIR /app

# 의존성 파일 복사 및 설치 (캐싱 최적화)
COPY package*.json ./
RUN npm ci

# 소스 코드 전체 복사 및 빌드 진행
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# 2. 실행 스테이지
# Nginx를 사용해 빌드된 정적 자산 서빙
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 커스텀 설정 복사 (SPA 라우팅 지원)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
