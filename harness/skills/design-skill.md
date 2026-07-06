# CareerFit AI Design Skill (Tailwind CSS)

## 1. 디자인 컨셉: 전문성 + 친근함 (Professional & Friendly)
- **대상**: 취업 및 공모전을 준비하는 대학생 사용자
- **톤 앤 매너**: 대학생에게 친근하고 직관적으로 다가가면서도, AI 코치로서의 신뢰성과 전문성을 잃지 않는 디자인을 지향합니다.
  - *전문성 (Professional)*: 정돈된 레이아웃, 신뢰감을 주는 블루/인디고 계열의 메인 컬러, 명확한 타이포그래피 계층 구조.
  - *친근함 (Friendly)*: 부드러운 둥근 모서리(Rounded corners), 따뜻하고 활기찬 에메랄드/앰버 강조 컬러, 직관적인 시각적 요소(아이콘, 프로그레스 바).

---

## 2. 컬러 팔레트 (Color Palette)
Tailwind CSS 테마 클래스를 기준으로 구성된 컬러 시스템입니다.

| 역할 | Tailwind 클래스 | 예시 설명 |
| :--- | :--- | :--- |
| **Primary (전문성/신뢰)** | `indigo-600`, `indigo-700` | 메인 브랜드 컬러, 주요 버튼, 강조 텍스트, 활성 상태 표시 |
| **Secondary (성장/친근)** | `emerald-500`, `emerald-600` | 성공 상태, 매칭된 스킬/직무, 긍정적인 피드백 강조 |
| **Background (배경)** | `slate-50` (전체), `white` (카드) | 화면 전체의 깔끔하고 차분한 연회색 배경 및 개별 콘텐츠 카드 |
| **Text (텍스트)** | `slate-900` (주요), `slate-600` (본문) | 제목 및 핵심 텍스트는 짙은 슬레이트, 일반 본문은 읽기 쉬운 회색 |
| **Border (경계선)** | `slate-200`, `slate-100` | 카드 구분선, 입력창 테두리 등 미니멀하고 세련된 구분선 |
| **Error/Alert (오류/경고)** | `red-500`, `amber-500` | 누락된 스킬(amber), 오류 발생 상태(red) 및 경고 안내 |

### 컬러 매핑 가이드 (Tailwind CSS)
- **배경색 (Bg)**: `bg-slate-50` (Page Body), `bg-white` (Cards), `bg-indigo-600` (Primary Button)
- **글자색 (Text)**: `text-slate-900` (Titles), `text-slate-600` (Body), `text-indigo-600` (Primary Accent)
- **테두리 (Border)**: `border-slate-200` (Default Borders), `focus:border-indigo-500` (Active Input)

---

## 3. 타이포그래피 규칙 (Typography)
기본적으로 산세리프 폰트 계열(`font-sans`)을 기반으로 가독성이 높고 정돈된 느낌을 줍니다.

- **Title 1 (대제목 / 히어로)**
  - Class: `text-3xl font-extrabold tracking-tight text-slate-900`
  - Usage: 대시보드 메인 타이틀, 서비스 로고 영역
- **Title 2 (카드/섹션 제목)**
  - Class: `text-xl font-bold text-slate-900`
  - Usage: 입력 폼 타이틀, 결과 분석 결과 영역 제목
- **Body / Main Text (본문)**
  - Class: `text-base font-normal leading-relaxed text-slate-600`
  - Usage: AI 코칭 상세 답변, 프로젝트 설명 본문
- **Subtext / Helper (보조 정보)**
  - Class: `text-sm text-slate-500 font-medium`
  - Usage: 입력창 가이드, 카드 하단 보조 정보, 출처 메타데이터
- **Badge / Label (태그 및 버튼)**
  - Class: `text-xs font-semibold tracking-wider uppercase`
  - Usage: 스킬 태그, 신뢰도 수치 표시

---

## 4. 컴포넌트 구조 (Component Structure)

### ① App (`App.jsx`)
- **역할**: 전체 레이아웃의 컨테이너 및 상태 관리(입력 데이터, API 로딩/결과 상태).
- **구조**:
  - `Header`: 서비스 이름(`CareerFit AI`)과 슬로건이 노출되는 상단 내비게이션 바.
  - `Hero Section`: 대학생을 위한 포트폴리오 진단 코칭 서비스임을 알려주는 영역.
  - `Main Grid`: 좌측 `InputForm`과 우측 `Result 영역`(ResultCard, SourceCard)으로 배치하여 좌-우 시선 흐름 제공.
- **상태 관리**:
  - `loading` (분석 중), `error` (API 오류), `result` (분석 결과 데이터)

### ② InputForm (`InputForm.jsx`)
- **역할**: 사용자로부터 전공, 보유 스킬, 관심 직무를 입력받는 폼.
- **구조**:
  - **입력 필드**:
    - 전공 입력 (`major`): `placeholder="예: 컴퓨터공학과"`
    - 보유 스킬 (`skills`): 쉼표나 태그 형태로 입력받는 입력창.
    - 관심 직무 (`job_type`): `placeholder="예: 프론트엔드 개발자"`
  - **분석 버튼**: 로딩 시 Spinner 표시 및 버튼 비활성화(`disabled`).
- **인터랙션**:
  - 입력란 포커스 시 부드러운 테두리 및 링 효과 (`focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200`)

### ③ ResultCard (`ResultCard.jsx`)
- **역할**: AI가 분석한 매칭 결과 및 추천 프로젝트, 신뢰도 등을 한눈에 보여주는 카드.
- **구조**:
  - **총평 (`answer`)**: 상단에 친근하고 명확한 어조의 줄글 피드백 제공.
  - **신뢰도 게이지 (`confidence`)**: `indigo-600` 색상의 프로그레스 바 혹은 게이지 형태로 전문성 시각화.
  - **매칭 스킬 (`matched_skills`)**: `bg-emerald-50 text-emerald-700` 조합의 둥근 배지(Badge) 형태 표시.
  - **보완 필요 스킬 (`missing_skills`)**: `bg-amber-50 text-amber-700` 조합의 배지 표시로 시각적 대비 제공.
  - **추천 프로젝트/활동 (`recommended_projects`)**: 카드 내 리스트 형태로 정리하여 대학생이 바로 실천할 수 있게 구성.

### ④ SourceCard (`SourceCard.jsx`)
- **역할**: AI 추천 및 피드백의 신뢰도를 높여주는 공모전 및 채용 데이터 출처 표시.
- **구조**:
  - **출처 리스트 (`sources`)**:
    - 제목 (`title`) 및 분류 (`type` - 공모전/채용공고).
    - 매칭 이유 (`matched_reason`): 본 피드백이 해당 출처와 어떻게 매칭되었는지 명시하여 신뢰감 부여.
- **인터랙션**:
  - 마우스 호버 시 입체감이 강조되는 효과 (`hover:shadow-md hover:border-slate-300 transition-all duration-200`)

---

## 5. 레이아웃 규칙 (Layout Rules)
- **최대 너비**: 페이지 전체의 가독성을 위해 최대 너비를 `max-w-6xl mx-auto`로 제한합니다.
- **그리드 레이아웃**:
  - 태블릿/데스크톱(`md` 이상): 2열 그리드 (`grid grid-cols-1 md:grid-cols-12 gap-8`)
    - `InputForm` 영역: `md:col-span-5`
    - `ResultCard` & `SourceCard` 영역: `md:col-span-7`
  - 모바일: 1열 배치로 자동 반응형 전환.
- **여백 규칙**:
  - 섹션 간 간격: `gap-8` 혹은 `space-y-8`
  - 카드 내부 패딩: `p-6` 또는 `p-8`을 적용하여 텍스트가 답답해 보이지 않도록 충분한 화이트스페이스 확보.
  - 요소 간 간격: 타이틀과 설명 사이는 `mb-4`, 입력 필드 사이는 `space-y-6`.

---

## 6. 금지 사항 (Prohibitions & Restrictions)
1. **과도한 원색 사용 금지**: Tailwind의 `bg-red-500`, `bg-blue-500`과 같은 쨍한 원색을 도배하지 않고, `bg-indigo-600`, `bg-emerald-50 text-emerald-700`과 같이 부드럽거나 톤다운된 조합을 사용합니다.
2. **복잡한 애니메이션 자제**: 마이크로 인터랙션(버튼 호버, 카드 미세 부유 효과 등 `transition duration-200`) 외에 사용자 주의를 분산시키는 거대하고 복잡한 애니메이션 효과는 제외합니다.
3. **출처(Sources) 숨김 금지**: AI의 환각(Hallucination) 현상을 방지하고 전문성을 확보하기 위해, 추천 근거가 되는 `SourceCard`는 절대 생략하거나 숨겨두지 않고 항상 명확히 노출합니다.
4. **구조적 불균형 방지**: 본문 글자 크기가 작아지거나 가로 너비가 화면 밖으로 벗어나는 깨짐 현상(`overflow`)이 없도록 패딩과 유연한 너비 속성을 적용해야 합니다.
5. **하드코딩 및 환경변수 노출 금지**: API Key나 `.env`에 정의된 비공개 설정 값을 React 클라이언트 코드나 화면 상에 절대 하드코딩하지 않습니다.