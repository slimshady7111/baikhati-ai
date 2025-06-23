export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Baikhati AI</h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Platform AI yang membantu kamu mengelola dan memahami keuangan dengan mudah dan cepat.
        </p>
        <a
          href="#"
          className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-300 transition"
        >
          Mulai Sekarang
        </a>
      </div>
    </main>
  );
}
