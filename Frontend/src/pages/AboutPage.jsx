import React, { useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Footer from '../components/layouts/Footer';
import Background1 from '../assets/Background1.jpg';
import Background2 from '../assets/Background2.jpg';
import Background3 from '../assets/Background3.jpg';
import Background4 from '../assets/Background4.jpg';
import Background5 from '../assets/Background5.jpg';
import Profile1 from '../assets/ProfilePict/Profile1.jpg';
import Profile2 from '../assets/ProfilePict/Profile2.jpg';
import Profile3 from '../assets/ProfilePict/Profile3.jpg';
import Profile4 from '../assets/ProfilePict/Profile4.jpg';
import Profile5 from '../assets/ProfilePict/Profile5.jpg';
import Profile6 from '../assets/ProfilePict/Profile6.jpg';
import Profile7 from '../assets/ProfilePict/Profile7.jpg';
import Profile8 from '../assets/ProfilePict/Profile8.jpg';
import Profile9 from '../assets/ProfilePict/Profile9.jpg';
import Profile10 from '../assets/ProfilePict/Profile10.jpg';



// 1. UPDATE teamMembers array - tambahkan hierarchy dan priority
const teamMembers = [
    {
        name: 'Mochammad Faris',
        role: 'Ketua Tim',
        image: Profile1,
        bio: 'Memimpin inisiatif kebersihan lingkungan dan koordinasi program.',
        majors: 'Civil Engineering',
        university: 'Universitas Negeri Yogyakarta',
        hierarchy: 'leader', // TAMBAHKAN hierarchy
        priority: 1 // TAMBAHKAN priority untuk sorting
    },
    {
        name: 'Hana Wijayanti',
        role: 'Bendahara',
        image: Profile2,
        bio: 'Mengelola keuangan dan sumber daya untuk program kebersihan.',
        majors: 'Management',
        university: 'Universitas Negeri Yogyakarta',
        hierarchy: 'core', // TAMBAHKAN hierarchy
        priority: 2
    },
    {
        name: 'Marha Karamina',
        role: 'Sekretaris',
        image: Profile3,
        bio: 'Mengatur administrasi dan dokumentasi kegiatan.',
        majors: 'Statistics',
        university: 'Universitas Negeri Yogyakarta',
        hierarchy: 'core',
        priority: 3
    },
    {
        name: 'Yusnan Arya',
        role: 'Sponsorship',
        image: Profile4,
        bio: 'Membangun kemitraan dengan sponsor untuk mendukung program.',
        majors: 'Civil Engineering',
        university: 'Universitas Negeri Yogyakarta',
        hierarchy: 'core',
        priority: 4
    },
    {
        name: 'Firza Himawan',
        role: 'Logistik',
        image: Profile5,
        bio: 'Mengelola logistik dan distribusi sumber daya untuk kegiatan lapangan.',
        majors: 'Information Technology',
        university: 'Universitas Negeri Yogyakarta',
        hierarchy: 'specialist',
        priority: 5
    },
    {
        name: 'Gregorius Beryl',
        role: 'Logistik',
        image: Profile6,
        bio: 'Mengelola logistik dan distribusi sumber daya untuk kegiatan lapangan.',
        majors: 'Civil Engineering',
        university: 'Universitas Negeri Yogyakarta',
        hierarchy: 'specialist',
        priority: 6
    },
    {
        name: 'Muhammad Rafi',
        role: 'Humas',
        image: Profile7,
        bio: 'Bertanggung jawab atas komunikasi dan hubungan masyarakat.',
        majors: 'Civil Engineering',
        university: 'Universitas Negeri Yogyakarta',
        hierarchy: 'specialist',
        priority: 7
    },
    {
        name: 'Farahhuda Atikah',
        role: 'Humas',
        image: Profile8,
        bio: 'Fokus pada aspek kesehatan dari program kebersihan lingkungan.',
        majors: 'Statistics',
        university: 'Universitas Negeri Yogyakarta',
        hierarchy: 'support',
        priority: 8
    },
    {
        name: 'Anaaaaa',
        role: 'PDD',
        image: Profile9,
        bio: 'Mendokumentasikan kegiatan dan mengelola media sosial.',
        majors: 'Manajemen',
        university: 'Universitas Negeri Yogyakarta',
        hierarchy: 'support',
        priority: 9
    },
    {
        name: 'Wahyu Nur Cahyanto',
        role: 'PDD',
        image: Profile10,
        bio: 'Mendokumentasikan kegiatan dan mengelola media sosial.',
        majors: 'Information Technology',
        university: 'Universitas Negeri Yogyakarta',
        hierarchy: 'support',
        priority: 10
    }
];

const features = [
    {
        icon: '🌱',
        title: 'Edukasi Lingkungan',
        description: 'Program komprehensif untuk meningkatkan kesadaran masyarakat tentang pentingnya menjaga lingkungan.',
        color: 'from-emerald-400 to-green-600'
    },
    {
        icon: '♻️',
        title: 'Bank Sampah Digital',
        description: 'Sistem modern untuk mengelola sampah dengan teknologi digital dan reward system.',
        color: 'from-blue-400 to-cyan-600'
    },
    {
        icon: '🏆',
        title: 'Kompetisi Kebersihan',
        description: 'Lomba rutin untuk memotivasi partisipasi aktif masyarakat dalam menjaga kebersihan.',
        color: 'from-purple-400 to-indigo-600'
    },
    {
        icon: '💻',
        title: 'Aplikasi Website',
        description: 'Platform digital untuk memudahkan pelaporan dan monitoring kebersihan lingkungan.',
        color: 'from-pink-400 to-rose-600'
    }
];

const sections = [
    {
        id: 'hero',
        background: Background1,
        fadeDirection: 'right',
        gradient: 'from-emerald-900/80 via-teal-900/70 to-slate-900/60'
    },
    {
        id: 'features',
        background: Background2,
        fadeDirection: 'left',
        gradient: 'from-blue-900/80 via-cyan-900/70 to-slate-900/60'
    },
    {
        id: 'mission',
        background: Background3,
        fadeDirection: 'right',
        gradient: 'from-purple-900/80 via-indigo-900/70 to-slate-900/60'
    },
    {
        id: 'team',
        background: Background4,
        fadeDirection: 'left',
        gradient: 'from-orange-900/80 via-amber-900/70 to-slate-900/60'
    },
    {
        id: 'footer',
        background: Background5,
        fadeDirection: 'right',
        gradient: 'from-slate-900/90 via-gray-900/80 to-black/70'
    }
];

const LazyImage = ({ src, alt, className, onLoad }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageSrc(src);
            setIsLoaded(true);
            onLoad && onLoad();
        };
        img.src = src;
    }, [src, onLoad]);
    return (
        <div className={`${className} bg-slate-700 animate-pulse`}>
            {isLoaded && (
                <img
                    src={imageSrc}
                    alt={alt}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    loading="lazy"
                />
            )}
        </div>
    );
};

const AboutPage = () => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const containerRef = useRef(null);

    const navigate = useNavigate();

    const handleNavigateBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Calculate which section is currently visible
    const sectionProgress = useTransform(scrollYProgress, (value) => {
        const sectionIndex = Math.floor(value * sections.length);
        return Math.min(sectionIndex, sections.length - 1);
    });

    useEffect(() => {
        return sectionProgress.onChange((latest) => {
            setCurrentSection(latest);
        });
    }, [sectionProgress]);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, []);

    useEffect(() => {
        // Set smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Cleanup function to reset scroll behavior
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 20,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 80,
                damping: 20,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, rotateY: -15, scale: 0.9 },
        visible: {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
        hover: {
            scale: 1.05,
            rotateY: 5,
            z: 50,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
            },
        },
    };

    return (
        <div ref={containerRef} className="relative min-h-[500vh] overflow-hidden">
            {/* Dynamic Background Layers */}
            {sections.map((section, index) => {
                const sectionStart = index / sections.length;
                const sectionEnd = (index + 1) / sections.length;

                const opacity = useTransform(
                    scrollYProgress,
                    [
                        Math.max(0, sectionStart - 0.1),
                        sectionStart,
                        sectionEnd,
                        Math.min(1, sectionEnd + 0.1)
                    ],
                    [0, 1, 1, 0]
                );

                const scale = useTransform(
                    scrollYProgress,
                    [sectionStart, sectionEnd],
                    [1.1, 1]
                );

                return (
                    <motion.div
                        key={section.id}
                        className="fixed inset-0 w-full h-full"
                        style={{ opacity, scale }}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url("${section.background}")`,
                            }}
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient}`} />

                        {/* Directional Fade - UBAH MENJADI GELAP */}
                        <div
                            className={`absolute inset-0 ${section.fadeDirection === 'right'
                                ? 'bg-gradient-to-r from-transparent via-slate-900/40 to-slate-900/80'
                                : 'bg-gradient-to-l from-transparent via-slate-900/40 to-slate-900/80'
                                }`}
                        />

                        {/* Additional fade from bottom - UBAH MENJADI GELAP */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    </motion.div>
                );
            })}

            {/* Floating Particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
                {[...Array(4)].map((_, i) => ( // KURANGI dari 8 jadi 4
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full shadow-lg"
                        style={{
                            left: `${20 + i * 20}%`,
                            top: `${30 + (i % 2) * 40}%`,
                            backgroundColor: currentSection === 0 ? '#34d399' :
                                currentSection === 1 ? '#60a5fa' :
                                    currentSection === 2 ? '#a78bfa' : '#fbbf24',
                        }}
                        animate={{
                            y: [-20, -80, -20], // KURANGI jarak animasi
                            opacity: [0.3, 0.7, 0.3], // KURANGI opacity range
                        }}
                        transition={{
                            duration: 6 + i, // PERLAMBAT animasi
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "linear" // GUNAKAN linear untuk performa lebih baik
                        }}
                    />
                ))}
            </div>

            <motion.header
                className="bg-white/90 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        <motion.div
                            className="flex items-center space-x-2 sm:space-x-4"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <motion.div
                                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="text-white text-sm sm:text-lg">♻️</span>
                                </motion.div>
                                <div>
                                    <h1 className="text-lg sm:text-xl font-semibold text-slate-900">Kemiri Bersih</h1>
                                    <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">Community Leaderboard</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.button
                            className="inline-flex items-center px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium text-slate-700 bg-white/80 border border-slate-300 rounded-lg hover:bg-emerald-50 hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            onClick={handleNavigateBack}
                        >
                            <span className="mr-1 sm:mr-2">←</span>
                            Kembali
                        </motion.button>
                    </div>
                </div>
            </motion.header>


            {/* Content Sections */}
            <div className="relative z-20">
                {/* Hero Section */}
                <section className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="inline-block p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full mb-6 sm:mb-8 shadow-xl"
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                <span className="text-2xl sm:text-3xl">🌿</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-2"
                            variants={itemVariants}
                        >
                            <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent drop-shadow-2xl">
                                Kemiri Bersih
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 bg-slate-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-700/50"
                            variants={itemVariants}
                        >
                            <span className="text-emerald-400 font-semibold"> Bank Sampah </span> Dusun Kemiri hadir sebagai solusi lingkungan berkelanjutan melalui inovasi, teknologi, dan pemberdayaan masyarakat dalam pengelolaan sampah.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
                        >
                            <motion.button
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Mulai Perjalanan
                            </motion.button>
                            <motion.button
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/90 backdrop-blur-sm text-slate-700 font-bold rounded-xl sm:rounded-2xl border border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Pelajari Lebih Lanjut
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Waste Bank Program Section */}
                <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    {/* Floating Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl"
                            animate={{
                                x: [0, 100, 0],
                                y: [0, -50, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute top-1/3 -right-32 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl"
                            animate={{
                                x: [0, -80, 0],
                                y: [0, 60, 0],
                                scale: [1, 0.8, 1],
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"
                            animate={{
                                x: [0, -60, 0],
                                y: [0, -40, 0],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    <motion.div
                        className="max-w-6xl mx-auto relative z-10"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                    >

                        {/* Hero Feature Card */}
                        <motion.div
                            className="bg-gradient-to-br from-slate-800/40 via-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 mb-16 overflow-hidden relative"
                            variants={itemVariants}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10 rounded-3xl" />
                            <div className="relative z-10">
                                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                                    <motion.div
                                        className="flex-shrink-0"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl">
                                            <motion.span
                                                className="text-5xl"
                                            >
                                                🏦
                                            </motion.span>
                                        </div>
                                    </motion.div>
                                    <div className="text-center lg:text-left">
                                        <h3 className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text mb-4">
                                            Konsep Tanpa Bangunan Fisik
                                        </h3>
                                        <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl">
                                            Bank sampah yang didesain tanpa memerlukan bangunan fisik untuk
                                            <span className="text-emerald-400 font-semibold"> meminimalisir penggunaan lahan </span>
                                            sekaligus mengoptimalkan pengelolaan sampah masyarakat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Modern Feature Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                            {[
                                {
                                    icon: "📍",
                                    title: "Pengumpulan Terpusat",
                                    subtitle: "Titik Kumpul Strategis",
                                    description: "Sampah dikumpulkan di satu tempat yang strategis untuk memudahkan proses pengambilan dan pengangkutan",
                                    gradient: "from-blue-400 to-indigo-600",
                                    bgGradient: "from-blue-500/20 to-indigo-500/20"
                                },
                                {
                                    icon: "🚛",
                                    title: "Pengangkutan Pengepul",
                                    subtitle: "Sistem Angkut Terpadu",
                                    description: "Pengepul mengangkut sampah dari titik kumpul untuk dijual dan dikonversi menjadi nilai ekonomi bagi warga",
                                    gradient: "from-orange-400 to-red-600",
                                    bgGradient: "from-orange-500/20 to-red-500/20"
                                },
                                {
                                    icon: "💰",
                                    title: "Saldo Tabungan Warga",
                                    subtitle: "Konversi Otomatis",
                                    description: "Hasil penjualan sampah ke pengepul otomatis menjadi saldo tabungan yang dikelola transparan oleh pengurus",
                                    gradient: "from-purple-400 to-pink-600",
                                    bgGradient: "from-purple-500/20 to-pink-500/20"
                                },
                                {
                                    icon: "🌐",
                                    title: "Platform Web Terintegrasi",
                                    subtitle: "Dashboard Digital",
                                    description: "Saldo tabungan bank sampah milik warga terekap dan dapat dimonitor melalui sistem web yang dikelola pengurus",
                                    gradient: "from-emerald-400 to-teal-600",
                                    bgGradient: "from-emerald-500/20 to-teal-500/20"
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="group bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-700 overflow-hidden relative"
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`} />
                                    <div className="relative z-10">
                                        <motion.div
                                            className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-500`}
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: [0, -10, 10, 0],
                                            }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <span className="text-3xl">{feature.icon}</span>
                                        </motion.div>

                                        <div className="mb-4">
                                            <h4 className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-2`}>
                                                {feature.title}
                                            </h4>
                                            <p className="text-slate-400 font-medium">{feature.subtitle}</p>
                                        </div>

                                        <p className="text-slate-300 leading-relaxed text-lg">
                                            {feature.description}
                                        </p>

                                        <motion.div
                                            className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full mt-6`}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            transition={{ duration: 1.5, delay: index * 0.2 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <motion.div
                        className="max-w-6xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-slate-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 mx-auto max-w-fit shadow-lg border border-white/10"
                            variants={itemVariants}
                        >
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Program Unggulan
                            </span>
                        </motion.h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-slate-800/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 hover:border-white/20"
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <motion.div
                                        className="text-4xl sm:text-5xl mb-4 sm:mb-6 text-center"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-center">{feature.title}</h3>
                                    <p className="text-sm sm:text-base text-slate-300 text-center leading-relaxed mb-4 sm:mb-6">{feature.description}</p>
                                    <motion.div
                                        className={`h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '100%' }}
                                        transition={{ duration: 1, delay: index * 0.2 }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Team Section */}
                <section className="min-h-screen flex items-center justify-center px-4 py-32">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }} // TAMBAH once: true
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15, // KURANGI stagger
                                    delayChildren: 0.1, // KURANGI delay
                                },
                            },
                        }}
                    >
                        <motion.div
                            className="text-center mb-16" // KURANGI margin
                            variants={{
                                hidden: { opacity: 0, y: 30 }, // KURANGI movement
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.4 } // PERCEPAT animasi
                                },
                            }}
                        >
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-fit shadow-2xl border border-slate-700/50">
                                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                    Meet The Team
                                </span>
                            </h2>
                            <p className="text-xl text-slate-300 max-w-3xl mx-auto bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700/50">
                                Bertemu dengan para agent of change yang berdedikasi menghadirkan
                                solusi inovatif untuk keberlanjutan lingkungan Dusun Kemiri.
                            </p>
                        </motion.div>

                        {/* Leader Section */}
                        <motion.div
                            className="mb-12"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
                        >
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full border border-yellow-500/30 shadow-lg">
                                    <span className="text-2xl mr-3">👑</span>
                                    <span className="text-yellow-400 font-bold text-lg">Pemimpin Tim</span>
                                </div>
                            </div>

                            {teamMembers.filter(member => member.hierarchy === 'leader').map((member, index) => (
                                <div
                                    key={index}
                                    className="max-w-md mx-auto bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer group hover:scale-105" // KURANGI duration, tambah hover scale langsung
                                    onClick={() => setSelectedMember(member)}
                                >
                                    <div className="text-center">
                                        <div className="relative inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <LazyImage
                                                src={member.image}
                                                alt={member.name}
                                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400/50"
                                            />
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                                <span className="text-white text-sm">👑</span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                        <p className="text-yellow-400 font-semibold mb-4 text-lg">{member.role}</p>
                                        <p className="text-slate-300 text-center leading-relaxed">{member.bio}</p>

                                        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="text-sm text-yellow-400 bg-yellow-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/30">
                                                Klik untuk detail lengkap
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Core Team Section */}
                        <motion.div
                            className="mb-12"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } }
                            }}
                        >

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {teamMembers.filter(member => member.hierarchy === 'core').map((member, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer group hover:scale-105"
                                        onClick={() => setSelectedMember(member)}
                                    >
                                        <div className="text-center">
                                            <div className="relative inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <LazyImage
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-20 h-20 rounded-full overflow-hidden shadow-xl border-2 border-emerald-400/50"
                                                />
                                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                                                    <span className="text-white text-xs">⭐</span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                                            <p className="text-emerald-400 font-medium mb-3 text-sm">{member.role}</p>
                                            <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">{member.bio}</p>

                                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="text-xs text-emerald-400 bg-emerald-900/50 backdrop-blur-sm px-3 py-2 rounded-full border border-emerald-500/30">
                                                    Klik untuk detail
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Specialists Section - OPTIMIZED */}
                        <motion.div
                            className="mb-12"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }
                            }}
                        >

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {teamMembers.filter(member => member.hierarchy === 'specialist').map((member, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group hover:scale-105"
                                        onClick={() => setSelectedMember(member)}
                                    >
                                        <div className="text-center">
                                            <div className="relative inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <LazyImage
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-20 h-20 rounded-full overflow-hidden shadow-xl border-2 border-blue-400/50"
                                                />
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                                    <span className="text-white text-xs">🎯</span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                                            <p className="text-blue-400 font-medium mb-3 text-sm">{member.role}</p>
                                            <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed">{member.bio}</p>

                                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="text-xs text-blue-400 bg-blue-900/50 backdrop-blur-sm px-2 py-1 rounded-full border border-blue-500/30">
                                                    Detail
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Support Team Section - OPTIMIZED */}
                        <motion.div
                            className="mb-12"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3 } }
                            }}
                        >

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {teamMembers.filter(member => member.hierarchy === 'support').map((member, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-slate-900/40 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-500/30 hover:border-slate-400/50 transition-all duration-300 cursor-pointer group hover:scale-105"
                                        onClick={() => setSelectedMember(member)}
                                    >
                                        <div className="text-center">
                                            <div className="relative inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <LazyImage
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-20 h-20 rounded-full overflow-hidden shadow-xl border-2 border-slate-400/50"
                                                />
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-slate-400 to-gray-500 rounded-full flex items-center justify-center shadow-lg">
                                                    <span className="text-white text-xs">🛠️</span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                                            <p className="text-slate-400 font-medium mb-3 text-sm">{member.role}</p>
                                            <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed">{member.bio}</p>

                                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="text-xs text-slate-400 bg-slate-900/50 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-500/30">
                                                    Klik untuk detail
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </section>
            </div>

            {/* Team Member Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMember(null)}
                    >
                        <motion.div
                            className="bg-slate-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-700/50"
                            initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
                            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotateY: 30 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                {/* Member Image */}
                                <div className="relative inline-block mb-6">
                                    <LazyImage
                                        src={selectedMember.image}
                                        alt={selectedMember.name}
                                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-2xl border-4 border-orange-400/50 mx-auto"
                                    />
                                    {/* Hierarchy Badge */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white text-sm sm:text-base">
                                            {selectedMember.hierarchy === 'leader' && '👑'}
                                            {selectedMember.hierarchy === 'core' && '⭐'}
                                            {selectedMember.hierarchy === 'specialist' && '🎯'}
                                            {selectedMember.hierarchy === 'support' && '🛠️'}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedMember.name}</h3>
                                <p className="text-base sm:text-lg text-orange-400 font-medium mb-2">{selectedMember.role}</p>
                                <p className="text-sm text-slate-400 mb-4">{selectedMember.university}</p>
                                <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">{selectedMember.bio}</p>

                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-white mb-3">Keahlian:</h4>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {(Array.isArray(selectedMember.majors) ? selectedMember.majors : [selectedMember.majors]).map((major, majorIndex) => (
                                            <motion.span
                                                key={majorIndex}
                                                className="px-2 sm:px-3 py-1 bg-gradient-to-r from-orange-900/70 to-amber-900/70 text-orange-300 text-xs font-medium rounded-full border border-orange-500/30"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.3 + majorIndex * 0.1, type: 'spring', stiffness: 200 }}
                                            >
                                                {major}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                <motion.button
                                    className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 shadow-xl"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedMember(null)}
                                >
                                    Tutup
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA DITEMPATKAN DI SINI, MENGGANTIKAN SPACER */}
            <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-10 mb-24">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <div
                        className="bg-gradient-to-r from-orange-500/95 to-amber-600/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden max-w-5xl mx-auto"
                    >
                        <div className="relative z-10">
                            <h3
                                className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
                            >
                                Mari Bergabung Menciptakan Perubahan!
                            </h3>
                            <p
                                className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90"
                            >
                                Jadilah bagian dari revolusi hijau dan berkontribusi dalam
                                membangun masa depan berkelanjutan.
                            </p>
                            <motion.button
                                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-600 font-bold rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.span
                                    className="mr-2 sm:mr-3 text-xl sm:text-2xl"
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    🚀
                                </motion.span>
                                Gabung Sekarang
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="relative z-30">
                <Footer />
            </div>
        </div>


    );
};

export default AboutPage;
