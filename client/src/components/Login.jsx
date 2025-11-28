export default function Login({ setUsername }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    if (name) setUsername(name);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-200">
      <h1 className="text-4xl mb-4 font-bold">🌿 WonPday 🌿</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          name="name"
          placeholder="닉네임을 입력하세요"
          className="px-3 py-2 rounded border mb-3"
        />
        <button type="submit" className="bg-green-500 px-4 py-2 text-white rounded-lg">
          입장하기
        </button>
      </form>
    </div>
  );
}
