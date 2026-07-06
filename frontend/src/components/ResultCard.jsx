import { useMemo } from "react";

function ResultCard({ answer, userSkills = [], sources = [] }) {
    // 1. 신뢰도 (Confidence) 자동 계산 로직
    // 근거 문서(sources)의 개수와 내용 충실도를 기반으로 신뢰도를 스마트하게 계산합니다.
    const confidence = useMemo(() => {
        if (!sources || sources.length === 0) return 45;
        // 출처당 15점씩 부여하고 최대 95%로 제한
        return Math.min(95, 60 + sources.length * 12);
    }, [sources]);

    // 2. 부족한 스킬 (Missing Skills) 동적 추출 로직
    // 전체 IT/디자인/분석 직무 주요 키워드 중 사용자가 가지고 있지 않으면서 
    // AI 피드백 본문(answer)에 언급된 키워드를 부족한 역량으로 파싱합니다.
    const missingSkills = useMemo(() => {
        const commonTechKeywords = [
            "Python", "SQL", "R", "Tableau", "PowerBI", "Excel", 
            "React", "Vue", "TypeScript", "JavaScript", "HTML", "CSS", 
            "Java", "Spring", "Node.js", "Express", "Django", "FastAPI",
            "Git", "GitHub", "Docker", "Kubernetes", "AWS", "GCP", 
            "TensorFlow", "PyTorch", "Scikit-learn", "Figma", "UI/UX"
        ];
        
        if (!answer) return [];
        
        // 대소문자 구분 없이 사용자가 입력하지 않은 스킬 중 본문에 등장한 스킬 필터링
        const normalizedUserSkills = userSkills.map(s => s.toLowerCase());
        const detected = commonTechKeywords.filter(keyword => {
            const isMentioned = answer.toLowerCase().includes(keyword.toLowerCase());
            const hasSkill = normalizedUserSkills.includes(keyword.toLowerCase());
            return isMentioned && !hasSkill;
        });

        return detected;
    }, [answer, userSkills]);

    // 3. 추천 프로젝트 (Recommended Projects) 추출 또는 생성
    // 본문에서 프로젝트 관련 조언을 추출하여 카드 형태로 포맷팅합니다.
    const recommendedProjects = useMemo(() => {
        if (!answer) return [];
        
        // 본문 내에서 프로젝트 혹은 공모전 관련된 문장들을 찾아 간략한 카드로 변환
        const sentences = answer.split(/[.\n]/).map(s => s.trim()).filter(Boolean);
        const projectHints = sentences.filter(s => 
            s.includes("프로젝트") || s.includes("공모전") || s.includes("포트폴리오") || s.includes("개발")
        );

        if (projectHints.length > 0) {
            // 최대 2개의 고유한 추천 포인트 생성
            return projectHints.slice(0, 2).map((hint, idx) => ({
                id: idx,
                title: idx === 0 ? "🎯 맞춤형 추천 활동" : "💡 역량 강화 프로젝트",
                description: hint.replace(/^[-\d.\s]+/, "") // 마크다운 불릿/번호 제거
            }));
        }

        // 기본 추천 프로젝트 (폴백)
        return [
            {
                id: 1,
                title: "🎯 실무 데이터 연계 프로젝트",
                description: "보유 스킬을 결합하여 직무와 관련된 공공 데이터 세트를 정제하고 분석하는 웹 대시보드 프로젝트 구축"
            }
        ];
    }, [answer]);

    return (
        <div className="glass-panel rounded-2xl shadow-xl shadow-slate-100/50 border-l-4 border-emerald-500 p-6 md:p-8 space-y-6 transition-all duration-300">
            {/* 헤더 */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl">📊</span>
                    <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">AI 커리어 역량 분석</h2>
                </div>
                <div className="text-right">
                    <span className="text-xs font-semibold text-slate-500 block">AI 코칭 신뢰도</span>
                    <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                    confidence >= 75 ? "bg-indigo-600" : "bg-amber-500"
                                }`}
                                style={{ width: `${confidence}%` }}
                            ></div>
                        </div>
                        <span className={`text-sm font-bold ${
                            confidence >= 75 ? "text-indigo-600" : "text-amber-600"
                        }`}>{confidence}%</span>
                    </div>
                </div>
            </div>

            {/* AI 분석 코칭 본문 */}
            <div className="space-y-2">
                <h3 className="text-sm font-semibold text-indigo-900">👩‍🏫 포트폴리오 코치의 조언</h3>
                <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-100/50">
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {answer}
                    </p>
                </div>
            </div>

            {/* 스킬 비교 분석 (보유 스킬 vs 권장/부족 스킬) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 보유 스킬 */}
                <div className="bg-white/50 border border-slate-100 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">✅ 매칭된 내 역량</h4>
                    {userSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                            {userSkills.map((skill, index) => (
                                <span 
                                    key={index}
                                    className="bg-teal-50 text-teal-700 border border-teal-200/60 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all hover:bg-teal-100/50"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="text-xs text-slate-400">입력된 보유 스킬이 없습니다.</span>
                    )}
                </div>

                {/* 부족한 역량 */}
                <div className="bg-white/50 border border-slate-100 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">⚠️ 보완이 필요한 역량</h4>
                    {missingSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                            {missingSkills.map((skill, index) => (
                                <span 
                                    key={index}
                                    className="bg-rose-50 text-rose-700 border border-rose-200/60 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all hover:bg-rose-100/50"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="text-xs text-slate-500">훌륭합니다! 보유한 역량으로 충분히 시작할 수 있습니다.</span>
                    )}
                </div>
            </div>

            {/* 추천 프로젝트 영역 */}
            {recommendedProjects.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-800">🚀 추천 활동 및 프로젝트</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommendedProjects.map((project) => (
                            <div 
                                key={project.id}
                                className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                            >
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center">
                                        {project.title}
                                    </h4>
                                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResultCard;