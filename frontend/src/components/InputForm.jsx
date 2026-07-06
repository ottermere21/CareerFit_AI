import { useState } from "react";

function InputForm({ onSubmit, isLoading }) {
    const [major, setMajor] = useState("");
    const [skillsInput, setSkillsInput] = useState("");
    const [jobType, setJobType] = useState("");

    function handleSubmit() {
        const skills = skillsInput.split(",").map(s => s.trim()).filter(Boolean);
        onSubmit({ major, skills, jobType });
    }

    return (
        <div className="glass-panel rounded-2xl shadow-xl shadow-slate-100/50 p-6 md:p-8 transition-all duration-300">
            <div className="flex items-center space-x-2 mb-6">
                <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">내 정보 입력</h2>
            </div>
            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">전공</label>
                    <input
                        type="text"
                        value={major}
                        onChange={e => setMajor(e.target.value)}
                        placeholder="예: 컴퓨터공학, 통계학과"
                        className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-800"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">보유 스킬 (쉼표로 구분)</label>
                    <input
                        type="text"
                        value={skillsInput}
                        onChange={e => setSkillsInput(e.target.value)}
                        placeholder="예: React, Figma, Python, SQL"
                        className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-800"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">관심 직무</label>
                    <input
                        type="text"
                        value={jobType}
                        onChange={e => setJobType(e.target.value)}
                        placeholder="예: 프론트엔드 개발자, 데이터 분석가"
                        className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-800"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !major || !skillsInput || !jobType}
                    className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-100 disabled:shadow-none transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none flex items-center justify-center text-sm"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            분석 중...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            역량 분석 요청
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default InputForm;