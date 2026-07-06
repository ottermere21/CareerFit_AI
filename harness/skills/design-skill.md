# CareerFit AI Design Skill
# CareerFit AI UI 디자인 및 스타일링 가이드

본 문서는 **CareerFit AI(취업·공모전 포트폴리오 코치)**의 React UI 개발을 위한 디자인 가이드라인입니다. 대학생 사용자를 타겟으로 하여 **전문성(신뢰감)**과 **친근함(트렌디함)**을 동시에 전달할 수 있는 디자인 시스템을 정의합니다.

---

## 1. 컬러 팔레트 (Tailwind CSS)

웹 페이지의 전체 배경에 **파란색과 흰색이 섞인 그라데이션 모션 그래픽**이 적용되어 있으므로, UI 컴포넌트들은 배경 그래픽이 은은하게 투영되면서도 높은 가독성을 유지할 수 있도록 **유리모핑(Glassmorphism)** 컨셉을 적극 활용합니다.

| 분류 | Tailwind Class | HEX/설명 | 사용처 및 느낌 |
| :--- | :--- | :--- | :--- |
| **Background (카드)** | `bg-white/75 backdrop-blur-md` | Semi-transparent White | 모션 그래픽 배경과 조화를 이루는 메인 카드 배경 |
| **Primary (전문성)** | `text-slate-900` / `bg-indigo-600` | Indigo-600 / Slate-900 | 핵심 텍스트, 주 버튼, 신뢰감을 주는 포인트 요소 |
| **Secondary (친근함)** | `text-teal-600` / `bg-teal-500` | Teal-500 | 강조용 배지, 긍정 피드백, 대학생 취향의 산뜻한 포인트 |
| **Text (기본)** | `text-slate-700` | Slate-700 | 바디 카피, 설명글 (배경 대비 가독성 확보) |
| **Text (보조)** | `text-slate-500` | Slate-500 | 캡션, 폼 레이블, 덜 중요한 메타데이터 |
| **Border** | `border-white/40` | Translucent White | 유리모핑 카드의 투명 테두리 (입체감 부여) |
| **Error / Warning** | `text-rose-600` / `bg-rose-50` | Rose-50, 600 | 부족한 역량 표시, 에러 메시지, 경고 상태 |
| **Info / Caution** | `text-amber-600` / `bg-amber-50` | Amber-50, 600 | 보통 신뢰도(Confidence Level) 상태 표시 |

---

## 2. 타이포그래피 규칙

대학생들에게 친근하면서도 정보가 한눈에 들어오는 가독성 높은 산세리프(Sans-serif) 폰트 스택을 사용합니다.

- **Font Family**: `font-sans` (Pretendard, Inter, System-UI 권장)
- **App Title**: `text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-blue-700`
  - 브랜드 정체성을 부각시키는 그라데이션 타이틀 효과 적용
- **Section Heading**: `text-lg md:text-xl font-bold text-slate-900 tracking-tight`
  - 각 카드 내부의 제목 및 핵심 영역 구분용
- **Body & Content**: `text-sm md:text-base text-slate-700 leading-relaxed font-normal`
  - 가독성을 최우선으로 하며 줄바꿈과 행간(`leading-relaxed`)을 충분히 확보
- **Badge & Meta**: `text-xs md:text-sm font-semibold tracking-wide`
  - 스킬 태그, 출처 구분, 신뢰도 등 조그만 강조 텍스트에 적용

---

## 3. 컴포넌트 구조
- App.jsx: 최상위, 상태 관리, API 요청
- InputForm.jsx: 전공·스킬·직무 입력 폼
- ResultCard.jsx: AI 분석 답변 출력 (초록 왼쪽 테두리)
- SourceCard.jsx: 출처 공고 목록 출력

### 3.1. App (`App.jsx`)
- **역할**: 전역 레이아웃 구성, 상태 관리(입력 데이터, 분석 중 상태 `loading`, 결과 데이터 `result`, 에러 상태 `error`).
- **디자인**:
  - 화면의 정중앙 혹은 균형 잡힌 2-컬럼 레이아웃을 잡는 부모 컨테이너.
  - 상단에 심플하고 고급스러운 브랜드 로고/헤더 바 제공.
  - 로딩 중일 때는 화면이 완전히 멈추지 않고, 세련된 스켈레톤 로더나 부드러운 펄스 애니메이션이 동작하도록 제어.

### 3.2. InputForm (`InputForm.jsx`)
- **역할**: 전공, 보유 스킬, 관심 직무 입력을 받으며 분석 요청을 트리거.
- **디자인**:
  - 대학생 사용자가 친근하게 입력할 수 있도록 인풋 영역에 예시(Placeholder)를 상세히 제공.
    - *예: "전공 (예: 컴퓨터공학)", "보유 스킬 (예: React, Figma, Python)", "관심 직무 (예: 프론트엔드 개발자)"*
  - **Focus Ring Effect**: 입력창 포커스 시 `focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all` 효과 적용.
  - **Submit Button**: `bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/50 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0`.

### 3.3. ResultCard (`ResultCard.jsx`)
- **역할**: 분석 결과인 종합 코칭 답변(`answer`), 보유 스킬 매칭 정보(`matched_skills`, `missing_skills`), 추천 프로젝트(`recommended_projects`), 신뢰도(`confidence`)를 시각화.
- **디자인**:
  - **Answer**: 친근한 어조의 줄글 형태로 출력하되, 단락 간격을 충분히 띄어 가독성 확보.
  - **Skills Comparison**:
    - 매칭 스킬은 산뜻한 그린/테일 배지 (`bg-teal-50 text-teal-700 border border-teal-200/60 rounded-lg px-2.5 py-1 text-xs`)로 표현.
    - 부족한 스킬은 시선을 끄는 오렌지/로즈 배지 (`bg-rose-50 text-rose-700 border border-rose-200/60 rounded-lg px-2.5 py-1 text-xs`)로 표현.
  - **Confidence Gauge**: 신뢰도는 단순 텍스트가 아닌 프로그레스 바 형태로 시각화.
    - `bg-slate-100 rounded-full h-2.5 w-full` 내부에 신뢰도 점수만큼 Indigo 또는 Amber 색상 바가 차오르는 모션.
  - **Recommended Projects**: 추천 프로젝트 목록은 카드 내 카드(`Nested Card`) 형태로 그리드 배치하여 각각의 프로젝트가 개별 카드 아이템처럼 보이게 구성.

### 3.4. SourceCard (`SourceCard.jsx`)
- **역할**: 코칭 결과의 신뢰도를 뒷받침하는 근거 공고 및 공모전 출처 목록(`sources`) 표시.
- **디자인**:
  - **Source List**: 스크롤 가능한 영역 혹은 깔끔한 리스트 구조로 표현하여 화면을 너무 많이 차지하지 않게 조율.
  - **Source Badge**: 공고 유형(`type`)에 따라 구분 배지 적용 (예: 채용공고 -> Indigo, 공모전 -> Purple).
  - **Matched Reason**: 매칭 이유(`matched_reason`)는 연한 그레이 배경의 인용구 상자(`bg-slate-50 border-l-4 border-indigo-400 p-3 rounded-r-lg text-xs`) 스타일로 처리하여 신뢰감 극대화.

---

## 4. 레이아웃 규칙

- **Container Max-Width**: 전체 콘텐츠 영역은 `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`로 감싸 모니터 크기에 상관없이 균형감 유지.
- **Responsive Layout**:
  - **Desktop (Lg 이상)**: 2-컬럼 그리드 적용 (`grid grid-cols-1 lg:grid-cols-12 gap-8`).
    - 좌측 5개 컬럼 (`lg:col-span-5`): `InputForm` 배치.
    - 우측 7개 컬럼 (`lg:col-span-7`): `ResultCard` 및 `SourceCard` 배치.
  - **Mobile / Tablet**: 1-컬럼으로 흐르며, `InputForm`이 위에 오고 `Result`와 `Source`가 순서대로 하단에 깔끔하게 나열.
- **Spacing**: 컴포넌트 간 마진은 `gap-6` 또는 `space-y-6`을 일관되게 사용.
- **Rounded Corners & Shadow**:
  - 모션 그래픽 배경과의 경계를 소프트하게 마감하기 위해 모든 카드는 `rounded-2xl` 이상 적용.
  - 부드러운 그림자(`shadow-xl shadow-slate-100/50`)를 통해 공중에 떠 있는 듯한 세련된 플로팅 레이아웃 구현.

---

## 5. 금지 사항 (Anti-Patterns)
- API Key를 화면에 표시하거나 localStorage에 저장
- 다크 배경에 흰 텍스트 (가독성 우선)
- 아이콘 없이 버튼만 사용 (텍스트 레이블 필수)
- **순수 원색 단색 금지**: `bg-red-500`, `bg-blue-500`과 같은 지나치게 강렬한 기본 원색은 절대 사용하지 않습니다. 톤이 다운되거나 세련되게 믹스된 HSL/RGB 기반의 소프트 톤(`bg-rose-500`, `bg-indigo-600`)을 사용해야 합니다.
- **배경을 100% 덮어버리는 레이아웃 금지**: 카드의 투명도(`opacity`)가 전혀 없고 블러 효과가 빠진 큰 백그라운드 카드를 쓰면 뒷배경의 아름다운 모션 그래픽이 가려져 답답해 보입니다. 반드시 `bg-white/75 backdrop-blur-md` 조합을 유지하세요.
- **Raw JSON 출력 금지**: `JSON.stringify(data)` 형태로 디버깅 정보처럼 데이터를 노출하지 마세요. 매칭 스킬 하나, 출처 카드 하나까지 완벽한 UI 컴포넌트로 옷을 입혀야 합니다.
- **UI 먹통 현상(Blocking) 금지**: AI 응답을 기다리는 로딩 중에 버튼 클릭이 여러 번 되거나 화면이 굳어있는 듯한 인상을 주지 마세요. 분석 버튼은 비활성화(`disabled`) 처리하고, 스피너나 스켈레톤 카드를 보여주어야 합니다.
- **하드 보더(Hard Borders) 금지**: 둥글지 않은 모서리(`rounded-none`)나 어두운 단색 선(`border-black`)을 사용하지 마세요. 테두리는 항상 반투명 흰색이나 아주 투명한 그레이(`border-slate-100`) 계열을 지향합니다.
- **스크롤 폭탄 방지**: 출처(`sources`) 개수가 많아질 때 페이지 전체가 끝없이 아래로 늘어나는 것을 방지하기 위해, 출처 영역은 `max-h-[300px] overflow-y-auto` 스크롤 뷰를 제공하거나 접고 펼칠 수 있는 아코디언 스타일을 도입합니다.