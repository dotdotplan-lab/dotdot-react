import MainSpace from "./shared/layouts/MainSpace.jsx";

function Home() {
  return (
      <MainSpace>
          <div className="max-h-screen flex items-center justify-center bg-white px-6">
            <div className="max-w-2xl text-center">
              <p className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-4">
                Portfolio
              </p>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-700 leading-tight mb-6">
                포트폴리오용 웹페이지
              </h1>

              <p className="text-lg text-blue-500 font-bold mb-10">
                상단 메뉴를 클릭해주세요.
              </p>

              <div className="w-16 h-px bg-gray-200 mx-auto"></div>
            </div>
          </div>
      </MainSpace>
  );
}

export default Home;