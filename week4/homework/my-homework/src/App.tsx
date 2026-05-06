import "./App.css";

function App() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-primary text-2xl font-bold">primary 색상 텍스트</h1>
      <div className="bg-primary text-white p-4 rounded-md">primary 배경</div>
      <div className="bg-primary-hover text-white p-4 rounded-md">
        primary-hover 배경
      </div>
      <div className="bg-danger text-white p-4 rounded-md">danger 배경</div>
      <div className="bg-surface p-4 rounded-md">surface 배경</div>
    </div>
  );
}

export default App;
