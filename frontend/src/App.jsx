import { useState } from "react";
import InputForm from "./components/InputForm";
import ResultCard from "./components/ResultCard";
import SourceCard from "./components/SourceCard";

const API_BASE = "http://localhost:8000";

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAnalyze(formData) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          major: formData.major,
          skills: formData.skills,
          job_type: formData.jobType,
        }),
      });

      if (!response.ok) throw new Error(`서버 오류: ${response.status}`);
      const data = await response.json();
      
      setResult({
        ...data,
        userSkills: formData.skills
      });

    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        setError("FastAPI 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.");
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen gradient-bg-motion py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* 서비스 타이틀 헤더 */}
        <header className="text-center md:text-left border-b border-white/20 pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-700">
            CareerFit AI
          </h1>
          <p className="text-slate-500 text-sm md:text-base mt-2">
            취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치
          </p>
        </header>

        {/* 메인 콘텐츠 레이아웃 (반응형 2-컬럼 그리드) */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 좌측 입력 영역 (5/12) */}
          <section className="lg:col-span-5">
            <InputForm onSubmit={handleAnalyze} isLoading={isLoading} />
          </section>

          {/* 우측 결과 및 가이드 영역 (7/12) */}
          <section className="lg:col-span-7 space-y-6">
            
            {/* 1. 에러 발생 상태 */}
            {error && (
              <div className="bg-rose-50/95 backdrop-blur-sm border border-rose-100 rounded-2xl p-5 text-rose-800 text-sm shadow-md flex items-start space-x-3">
                <span className="text-lg">⚠️</span>
                <div>
                  <h4 className="font-bold text-rose-900">분석 요청 오류</h4>
                  <p className="mt-1 leading-relaxed text-rose-700">{error}</p>
                </div>
              </div>
            )}

            {/* 2. 대기 (Empty) 상태 */}
            {!isLoading && !result && !error && (
              <div className="glass-panel rounded-2xl shadow-xl shadow-slate-100/50 p-8 text-center space-y-5 flex flex-col items-center justify-center min-h-[350px] border border-dashed border-slate-300/60">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-3xl animate-bounce">
                  👋
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-slate-800">
                    나만을 위한 취업·공모전 코칭을 시작해보세요!
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-2.5 max-w-sm mx-auto leading-relaxed">
                    왼쪽 입력창에 자신의 전공, 보유 스킬, 희망 직무를 입력한 뒤{" "}
                    <strong className="text-indigo-600 font-semibold">역량 분석 요청</strong>{" "}
                    버튼을 클릭해보세요. AI 코치가 데이터를 바탕으로 맞춤 진단을 해드립니다.
                  </p>
                </div>
              </div>
            )}

            {/* 3. 분석 중 (Loading) 상태 - 스켈레톤 UI */}
            {isLoading && (
              <div className="glass-panel rounded-2xl shadow-xl shadow-slate-100/50 p-6 md:p-8 space-y-6 animate-pulse border-l-4 border-indigo-400">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    <div className="h-6 w-36 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-8 w-24 bg-slate-200 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-24 bg-slate-200 rounded-xl"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-16 bg-slate-200 rounded-xl"></div>
                  <div className="h-16 bg-slate-200 rounded-xl"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-20 bg-slate-200 rounded-xl"></div>
                </div>
              </div>
            )}

            {/* 4. 성공 (Success) 상태 - 결과 카드 & 출처 카드 */}
            {result && (
              <div className="space-y-6">
                <ResultCard 
                  answer={result.answer} 
                  userSkills={result.userSkills}
                  sources={result.sources}
                />
                <SourceCard sources={result.sources} />
              </div>
            )}
            
          </section>

        </main>

        {/* 푸터 영역 */}
        <footer className="text-center text-xs text-slate-400 border-t border-white/20 pt-6">
          <p>© 2026 CareerFit AI. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}

export default App;