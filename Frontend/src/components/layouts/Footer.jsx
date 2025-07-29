const Footer = () => {
  return (
    <footer className="bg-white/70 backdrop-blur-lg border-t border-slate-200/80">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="md:col-span-1">
            <div className="flex items-center justify-center sm:justify-start mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl shadow-lg mr-3">
                <i className="fas fa-recycle text-xl text-white"></i>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">Kemiri Bersih</span>
            </div>
            <p className="text-slate-600 text-sm">
              Inisiatif KKN UNY 2025 untuk lingkungan yang lebih bersih dan masyarakat yang berdaya.
            </p>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-800 mb-3">Jelajahi</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Cara Kerja</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Papan Peringkat</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Tentang Proyek</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 mb-3">Kontak & Media Sosial</h4>
            <p className="text-sm text-slate-600 mb-3">Dusun Kemiri, Yogyakarta</p>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors"><i className="fab fa-facebook text-xl"></i></a>
              <a href="#" className="text-slate-500 hover:text-emerald-600 transition-colors"><i className="fab fa-twitter text-xl"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200/80 mt-8 pt-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} KKN-M UNY, 2025. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;