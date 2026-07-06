import { useMemo } from "react";

function SourceCard({ sources }) {
    // 1. 공고 유형(type) 및 매칭 매트릭 추론 로직
    const processedSources = useMemo(() => {
        if (!sources) return [];
        return sources.map((source, index) => {
            const title = source.title || "";
            const company = source.company || "";
            
            // 공모전 단어가 포함되어 있거나 주최사 느낌이 나는 경우 공모전으로 판단
            const isContest = title.includes("공모전") || title.includes("대회") || title.includes("챌린지") || company.includes("협회") || company.includes("재단");
            const type = isContest ? "공모전" : "채용공고";
            
            // distance(거리) 값을 일치율(%)로 역산
            // distance가 작을수록 유사도가 높음 (예: 0.2 -> 92%, 0.5 -> 75% 등)
            const rawDistance = source.distance !== undefined ? source.distance : 0.45;
            const matchRate = Math.min(98, Math.max(60, Math.round((1.2 - rawDistance) * 100)));

            return {
                ...source,
                type,
                matchRate
            };
        });
    }, [sources]);

    if (!sources || sources.length === 0) {
        return (
            <div className="glass-panel rounded-2xl p-6 text-center text-sm text-slate-500 shadow-xl shadow-slate-100/50">
                🔍 코칭을 뒷받침할 관련 공고 및 공모전 데이터가 존재하지 않습니다.
            </div>
        );
    }

    return (
        <div className="glass-panel rounded-2xl shadow-xl shadow-slate-100/50 p-6 md:p-8 space-y-5 transition-all duration-300">
            {/* 타이틀 */}
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
                <span className="text-2xl">🔗</span>
                <div>
                    <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">분석 근거 및 추천 공고</h2>
                    <p className="text-xs text-slate-400 mt-0.5">AI 분석에 활용된 채용 데이터 및 공모전 원본 출처입니다.</p>
                </div>
            </div>

            {/* 스크롤 폭탄 방지 리스트 영역 */}
            <div className="max-h-[350px] overflow-y-auto pr-2 space-y-4">
                {processedSources.map((source, index) => (
                    <div 
                        key={index} 
                        className="bg-white/40 border border-slate-100/80 p-4 rounded-xl space-y-3 hover:bg-white/60 transition-colors"
                    >
                        {/* 헤더 (유형 배지, 매치율, 기업명 및 타이틀) */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center space-x-2">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider ${
                                    source.type === "공모전" 
                                        ? "bg-purple-50 text-purple-700 border border-purple-100" 
                                        : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                                }`}>
                                    {source.type}
                                </span>
                                <span className="text-xs font-bold text-slate-500">
                                    {source.company}
                                </span>
                            </div>
                            <div className="text-xs font-semibold text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded-full border border-indigo-100/30">
                                직무 적합도 {source.matchRate}%
                            </div>
                        </div>

                        {/* 공고 제목 */}
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                            {source.title}
                        </h3>

                        {/* 매칭 사유 / 필수 스킬 가이드 (인용구 상자 스타일) */}
                        <div className="bg-slate-50/60 border-l-4 border-indigo-500/70 p-3 rounded-r-xl space-y-1">
                            <h4 className="text-[11px] font-bold text-indigo-900">💡 요구하는 핵심 역량</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {source.required_skills ? (
                                    <span>필수 역량으로 <strong className="text-slate-800 font-semibold">{source.required_skills}</strong> 등을 중점적으로 확인하며, 이에 맞춘 포트폴리오 작성이 추천됩니다.</span>
                                ) : (
                                    <span className="text-slate-400 italic">상세 요구 스킬 정보는 해당 기관 공고를 직접 참고하세요.</span>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SourceCard;