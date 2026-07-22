import MainSpace from "./layouts/MainSpace.jsx";

function Home() {
  // 1. 데이터 정의
  const infos = [
    {
      id: 1,
      gubun: "Frontend",
      langs: "JavaScript",
      devenv: ["React", "Tailwind CSS", "TanStack Query", "TinyMCE", "AG Grid"],
      batch: "Vercel",
      url: "https://youtu.be/LAQTHe-ciwc",
    },
    {
      id: 2,
      gubun: "Backend",
      langs: "Java",
      devenv: ["Spring Boot", "MyBatis", "Lombok", "JUnit 5", "Gradle"],
      batch: "AWS EC2, Docker Compose, Nginx",
      url: "https://youtu.be/wZbT7MyvCKY",
    },
    {
      id: 3,
      gubun: "Database",
      langs: "SQL",
      devenv: ["MariaDB"],
      batch: "Docker Container (AWS EC2)",
      url: "",
    },
  ];

  const devEnvironments = [
    { label: "IDE", value: "IntelliJ IDEA" },
    { label: "Domain", value: "DuckDNS" },
    { label: "Web Server", value: "Nginx" },
    { label: "HTTPS", value: "Let's Encrypt" },
    { label: "OS", value: "Ubuntu 24.04 LTS" },
  ];

  const rawArchitectureText = `Client (React)
      │
   Vercel
      │
    HTTPS
      │
    Nginx
      │
 Docker Compose
      │
 Spring Boot
      │
   MyBatis
      │
   MariaDB`;

  return (
      <MainSpace>
        <div>
          <div className="max-w-7xl mx-auto space-y-4">

            <div className="text-center space-y-1.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                포트폴리오 시연용 웹사이트 <span className="text-blue-600">(React)</span>
              </h1>
              <p className="text-xs text-slate-500">
                React와 Spring Boot 기반으로 개발한 포트폴리오 시연용 웹 애플리케이션입니다. </p>
              <br />
              <p className="text-xs text-slate-500 italic">
                포트폴리오 시연용 웹사이트 (Vue3)는 준비중입니다.
              </p>
            </div>

            <div className="w-fit mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
              <div className="flex flex-col lg:flex-row gap-6 items-start w-fit">

                <div className="w-[650px] shrink-0 space-y-5">

                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      개발 환경
                    </h2>
                    <div className="grid grid-cols-5 gap-2">
                      {devEnvironments.map((env, idx) => (
                          <div key={idx} className="p-2 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between">
                            <span className="text-[10px] font-semibold text-slate-400">{env.label}</span>
                            <span className="text-xs font-bold text-slate-800 mt-0.5 truncate" title={env.value}>
                          {env.value}
                        </span>
                          </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      기술 스택 및 시연 영상
                    </h2>
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs text-slate-600 table-fixed">
                        <thead className="bg-slate-50 uppercase font-semibold border-b border-slate-200 text-slate-500">
                        <tr>
                          <th className="w-[12%] px-3 py-2.5 text-center">영역</th>
                          <th className="w-[10%] px-3 py-2.5 text-center">언어</th>
                          <th className="w-[33%] px-3 py-2.5 text-center">프레임워크, 라이브러리</th>
                          <th className="w-[32%] px-3 py-2.5 text-center">배포 인프라</th>
                          <th className="w-[12%] px-2 py-2.5 text-center">관련 영상</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-normal">
                        {infos.map((info) => (
                            <tr key={info.id}>
                              <td className="px-3 py-2.5 font-semibold text-slate-700">
                              <span>
                                {info.gubun}
                              </span>
                              </td>
                              <td >
                                {info.langs}
                              </td>
                              <td className="px-3 py-2.5">
                                <div className="flex flex-wrap gap-1">
                                  {Array.isArray(info.devenv) ? (
                                      info.devenv.map((item, index) => (
                                          <span key={index} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-500">
                                      {item}
                                    </span>
                                      ))
                                  ) : (
                                      <span className="text-xs">{info.devenv}</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-3 py-2.5 text-slate-600 text-[11px] leading-relaxed break-words">
                                {info.batch}
                              </td>
                              <td className="px-2 py-2.5 text-center">
                                {info.url ? (
                                    <a
                                        href={info.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="items-center justify-center px-2 py-1 text-[7px] font-medium text-white bg-red-500 rounded"
                                    >
                                      ▶
                                    </a>
                                ) : (
                                    <span className="text-slate-300 text-xs">-</span>
                                )}
                              </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                <div className="shrink-0 flex justify-center items-center self-center h-full">
                  <div className="w-fit rounded-xl px-4 py-3 bg-white border border-slate-200 text-slate-700 font-mono flex flex-col items-center justify-between shadow-xs">
                    <div className="w-full text-center border-b border-slate-700 pb-1.5 mb-1.5 whitespace-nowrap">
                    <span className="text-[10px] font-bold tracking-wider text-slate-700 uppercase">
                      시스템 구조
                    </span>
                    </div>

                    <div className="py-1">
                    <pre className="text-[11px] leading-relaxed text-slate-700 font-semibold whitespace-pre text-center">
                      {rawArchitectureText}
                    </pre>
                    </div>

                    <div className="w-full text-[9px] text-slate-500 text-center border-t border-slate-800/80 pt-1.5 mt-1.5 whitespace-nowrap">
                      전체 데이터 처리 흐름
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </MainSpace>
  );
}

export default Home;