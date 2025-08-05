import { Link } from 'react-router-dom';
import {useData} from '../../context/DataContext';

const Footer = () => {
  const { users } = useData();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-2xl transform rotate-3">
                    <i className="fas fa-recycle text-2xl text-white"></i>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Kemiri Bersih
                  </h3>
                  <p className="text-slate-400 text-xs uppercase tracking-wider">
                    KKN UNY 2025
                  </p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                Menciptakan perubahan positif melalui inovasi berkelanjutan dan pemberdayaan masyarakat untuk lingkungan yang lebih hijau.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{users.length}+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">Partisipan</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">4+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">Program</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold text-white mb-6 relative">
                Navigasi
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              </h4>
              <ul className="space-y-4">
                {[
                  { to: "/", label: "Beranda", icon: "fas fa-home" },
                  { to: "/leaderboard", label: "Papan Peringkat", icon: "fas fa-trophy" },
                  { to: "/about", label: "Tentang Proyek", icon: "fas fa-info-circle" },
                  { to: "#", label: "Galeri Kegiatan", icon: "fas fa-images" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className="group flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <i className={`${item.icon} text-sm w-4 group-hover:text-emerald-400 transition-colors`}></i>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold text-white mb-6 relative">
                Program Kami
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              </h4>
              <ul className="space-y-4">
                {[
                  { label: "Bank Sampah Digital", icon: "fas fa-piggy-bank" },
                  { label: "Edukasi Lingkungan", icon: "fas fa-leaf" },
                  { label: "Daur Ulang Kreatif", icon: "fas fa-sync" },
                  { label: "Komunitas Hijau", icon: "fas fa-users" }
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="group flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <i className={`${item.icon} text-sm w-4 group-hover:text-emerald-400 transition-colors`}></i>
                      <span className="text-sm font-medium">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold text-white mb-6 relative">
                Hubungi Kami
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              </h4>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-map-marker-alt text-emerald-400 mt-1 text-sm"></i>
                  <div>
                    <p className="text-slate-300 text-sm font-medium">Dusun Kemiri</p>
                    <p className="text-slate-400 text-xs">Yogyakarta, Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-envelope text-emerald-400 text-sm"></i>
                  <p className="text-slate-300 text-sm">kemiri.bersih@uny.ac.id</p>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-4 font-semibold">
                  Ikuti Kami
                </p>
                <div className="flex space-x-3">
                  {[
                    { icon: "fab fa-instagram", color: "hover:bg-pink-600", label: "Instagram" },
                    { icon: "fab fa-facebook", color: "hover:bg-blue-600", label: "Facebook" },
                    { icon: "fab fa-twitter", color: "hover:bg-sky-500", label: "Twitter" },
                    { icon: "fab fa-whatsapp", color: "hover:bg-green-600", label: "WhatsApp" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`group relative w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                      aria-label={social.label}
                    >
                      <i className={`${social.icon} text-white text-lg group-hover:scale-110 transition-transform`}></i>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {social.label}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

              {/* Copyright */}
              <div className="flex items-center space-x-4">
                <p className="text-slate-400 text-sm">
                  &copy; {new Date().getFullYear()} KKN-M UNY 2025.
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-6">
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm font-medium">
                  Kebijakan Privasi
                </a>
                <span className="text-slate-600">•</span>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm font-medium">
                  Syarat & Ketentuan
                </a>
                <span className="text-slate-600">•</span>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm font-medium">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;