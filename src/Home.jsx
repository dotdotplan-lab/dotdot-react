import MainSpace from "./shared/layouts/MainSpace.jsx";

function Home() {

  const infos = [
    { id: 1, gubun: "Frontend", langs: "JavaScript", devenv: "React, Tailwind CSS, Zustand, React Query, TinyMCE, ad-grid", batch: "Vercel", url: "https://youtu.be/LAQTHe-ciwc" },
    { id: 2, gubun: "Backend", langs: "Java" , devenv: "Spring Boot, Mybatis, lombok, jUnit(Build: Gradle)", batch: "AWS EC2(Ubuntu), Docker, Docker Compose", url: "https://youtu.be/wZbT7MyvCKY"},
    { id: 3, gubun: "Database", langs: "SQL" , devenv: "MariaDB", batch: "(Backend 인프라 내 컨테이너로 구동)", url: ""},
  ];

  return (
      <MainSpace>
          <div className="max-h-screen flex items-center justify-center bg-white px-6">
            <div className="max-w-2xl text-center">
              <p className="text-2xl text-blue-500 font-bold">
                포트폴리오 시연용 웹사이트(React)
              </p>
              <p className="text-sm text-gray-500 mb-10 underline italic">
                포트폴리오 시연용 웹사이트 (Vue3) : 준비중.
              </p>
              <hr className="text-gray-300" />
              <br />
              <p className="text-xl text-gray-700 font-bold tracking-widest uppercase mb-4">+ 개발 주요 정보 +</p>
              <p className="text-purple-700">통합 개발 환경(IDE) : IntelliJ</p>

              <div className="px-4 md:px-8 my-6">
                <div className="max-w-7xl mx-auto border border-slate-200 rounded-md overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-200 text-slate-900 text-left text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
                      <tr className="divide-x divide-slate-300">
                        <th scope="col" className="px-4 py-3.5">영역</th>
                        <th scope="col" className="px-4 py-3.5">언어</th>
                        <th scope="col" className="px-4 py-3.5">프레임워크 & 라이브러리</th>
                        <th scope="col" className="px-4 py-3.5">배포 & 인프라</th>
                        <th scope="col" className="px-4 py-3.5">시연 화면</th>
                      </tr>
                      </thead>

                      <tbody className="text-sm divide-y divide-slate-200 text-left text-sm font-semibold">
                      {infos.map((info) => (
                        <tr key={info.id} className="divide-x divide-slate-200">
                          <td className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap">
                            {info.gubun}
                          </td>
                          <td className="px-4 py-4 text-slate-500">
                            {info.langs}
                          </td>
                          <td className="px-4 py-4 text-slate-500">
                            {info.devenv}
                          </td>
                          <td className="px-4 py-4 text-slate-500">
                            {info.batch}
                          </td>
                          <td className="px-4 py-4 text-slate-500">
                            {info.url ? (
                                <a href={info.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline hover:text-blue-700"
                                  >
                                  보러가기
                                </a>
                              ) : (
                              <span className="text-gray-400">-</span>
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
      </MainSpace>
  );
}

export default Home;