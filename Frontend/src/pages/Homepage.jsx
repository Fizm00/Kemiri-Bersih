import { useNavigate } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import AnimateOnScroll from '../components/utils/AnimateOnScroll';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();

  const Navbar = () => (
    <header className="bg-white/90 backdrop-blur-xl fixed top-4 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-5xl mx-auto rounded-2xl border border-white/20 shadow-xl shadow-emerald-500/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white text-lg">♻️</span>
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">Kemiri Bersih</span>
        </div>
        <button
          onClick={() => navigate('/admin/login')}
          className="hidden sm:inline-block bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold py-3 px-6 rounded-xl hover:from-slate-800 hover:to-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Login Pengurus
        </button>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 text-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/4 w-36 h-36 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/20 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-teal-400/30 rounded-full animate-bounce animation-delay-3000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-bounce animation-delay-5000"></div>
      </div>

      <Navbar />

      <main>
        <section className="pt-36 pb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 via-teal-50/40 to-transparent"></div>
          <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
            <AnimateOnScroll>
              <div className="mb-6">
                <div className="inline-block p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-6">
                  <i className="fas fa-leaf text-4xl text-emerald-600"></i>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-emerald-700 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                Ubah Sampah, Raih Rupiah.
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Platform bank sampah digital untuk memberdayakan komunitas dan menjaga lingkungan kita tetap bersih.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200/50 shadow-lg">
                  <span className="text-emerald-700 font-semibold">✨ Mudah • Transparan • Menguntungkan</span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="absolute top-20 left-10 opacity-20">
            <div className="w-20 h-20 border-4 border-emerald-300 rounded-full animate-spin animation-duration-slow"></div>
          </div>
          <div className="absolute bottom-20 right-10 opacity-20">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-300 to-blue-300 rounded-lg rotate-45 animate-pulse"></div>
          </div>
        </section>

        <section className="py-2 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-emerald-50/30 to-white/50"></div>
          <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-10 relative z-10">
            <AnimateOnScroll direction="left">
              <div
                onClick={() => navigate('/leaderboard')}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-white/30 hover:border-emerald-300/50 overflow-hidden flex flex-col h-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-10 flex-grow relative z-10">
                  <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 w-16 h-16 flex items-center justify-center rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-users text-2xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-slate-800">Papan Peringkat Warga</h2>
                  <p className="text-slate-600 leading-relaxed">Lihat kontributor teratas dan lacak progres daur ulang di lingkungan Anda. Bergabunglah dengan komunitas peduli lingkungan!</p>
                </div>
                <div className="bg-gradient-to-r from-slate-50 to-emerald-50 group-hover:from-emerald-500 group-hover:to-emerald-600 transition-all duration-300 p-6 text-emerald-700 group-hover:text-white font-semibold text-lg flex justify-between items-center">
                  <span>Lihat Sekarang</span>
                  <i className="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform duration-300"></i>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <div
                onClick={() => navigate('/admin/login')}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-white/30 hover:border-slate-300/50 overflow-hidden flex flex-col h-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="p-10 flex-grow relative z-10">
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 w-16 h-16 flex items-center justify-center rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-user-shield text-2xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-slate-800">Akses Pengurus</h2>
                  <p className="text-slate-600 leading-relaxed">Masuk ke panel admin untuk mengelola data warga dan transaksi bank sampah dengan sistem yang aman dan terpercaya.</p>
                </div>
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 group-hover:from-slate-700 group-hover:to-slate-800 transition-all duration-300 p-6 text-slate-700 group-hover:text-white font-semibold text-lg flex justify-between items-center">
                  <span>Login Sekarang</span>
                  <i className="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform duration-300"></i>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        <section className="py-16 sm:py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 left-20 w-64 h-64 bg-gradient-to-r from-blue-200 to-emerald-200 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <AnimateOnScroll>
              <div className="mb-8">
                <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-6 py-2 rounded-full font-semibold text-sm border border-emerald-200/50">
                  PROSES MUDAH
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 py-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Hanya 3 Langkah Mudah
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
                Prosesnya sederhana dan transparan. Mulai dari rumah Anda hingga menjadi saldo yang menguntungkan.
              </p>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <AnimateOnScroll>
                <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group hover:-translate-y-2">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">1</div>
                  <div className="text-6xl text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-recycle"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-800">Pilah Sampah</h3>
                  <p className="text-slate-600 leading-relaxed">Pisahkan sampah anorganik seperti botol plastik, kertas, dan logam di rumah dengan rapi dan bersih.</p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group hover:-translate-y-2">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">2</div>
                  <div className="text-6xl text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-dolly"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-800">Setor ke Bank Sampah</h3>
                  <p className="text-slate-600 leading-relaxed">Bawa sampah yang sudah dipilah ke titik penjemputan atau langsung ke lokasi kami dengan mudah.</p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll>
                <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group hover:-translate-y-2">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">3</div>
                  <div className="text-6xl text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-wallet"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-800">Dapatkan Saldo</h3>
                  <p className="text-slate-600 leading-relaxed">Sampah Anda akan ditimbang dan dihargai dengan fair. Saldo langsung masuk ke akun digital Anda!</p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/40 via-white/60 to-teal-50/40"></div>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-10 w-40 h-40 bg-emerald-300 rounded-full filter blur-2xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-teal-300 rounded-full filter blur-2xl animate-pulse animation-delay-2000"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <AnimateOnScroll>
                <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-6 py-2 rounded-full font-semibold text-sm border border-emerald-200/50 mb-6 inline-block">
                  TESTIMONI WARGA
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 py-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Apa Kata Warga?
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                  Cerita nyata dari mereka yang sudah merasakan manfaat dari program bank sampah kami.
                </p>
              </AnimateOnScroll>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              <AnimateOnScroll direction="left">
                <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-white/50 relative group hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute top-4 right-6 text-4xl text-emerald-200 group-hover:text-emerald-300 transition-colors">
                    <i className="fas fa-quote-right"></i>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Ibu Siti</div>
                      <div className="text-sm text-slate-500">Warga RT 05</div>
                    </div>
                  </div>
                  <p className="text-slate-600 italic text-lg leading-relaxed mb-4">
                    "Dulu sampah plastik cuma jadi masalah, sekarang jadi tabungan tambahan buat kebutuhan dapur. Senang sekali lingkungan jadi lebih bersih dan kita dapat manfaatnya!"
                  </p>
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll direction="right">
                <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-white/50 relative group hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute top-4 right-6 text-4xl text-emerald-200 group-hover:text-emerald-300 transition-colors">
                    <i className="fas fa-quote-right"></i>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Bapak Budi</div>
                      <div className="text-sm text-slate-500">Warga RT 02</div>
                    </div>
                  </div>
                  <p className="text-slate-600 italic text-lg leading-relaxed mb-4">
                    "Anak-anak jadi semangat memilah sampah karena mereka bisa lihat poinnya bertambah di papan peringkat. Jadi belajar sambil berbuat baik untuk lingkungan."
                  </p>
                  <div className="flex text-yellow-400">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style jsx>{`
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-5000 { animation-delay: 5s; }
        .animation-duration-slow { animation-duration: 3s; }
      `}</style>
    </div>
  );
};

export default HomePage;