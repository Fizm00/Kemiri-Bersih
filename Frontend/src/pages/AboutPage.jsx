import React, { useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Footer from '../components/layouts/Footer';
import Background1 from '../assets/Background1.jpg';

const teamMembers = [
    {
        name: 'Andi Pratama',
        role: 'Koordinator Tim',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        bio: 'Memimpin inisiatif kebersihan lingkungan dan koordinasi program.',
        skills: ['Leadership', 'Project Management', 'Environmental Planning'],
        university: 'Universitas Negeri Yogyakarta'
    },
    {
        name: 'Sari Dewi',
        role: 'Spesialis Edukasi',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        bio: 'Fokus pada program edukasi lingkungan untuk masyarakat.',
        skills: ['Education', 'Community Outreach', 'Public Speaking'],
        university: 'Universitas Negeri Yogyakarta'
    },
    {
        name: 'Budi Santoso',
        role: 'Manager Bank Sampah',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        bio: 'Mengelola sistem bank sampah digital dan ekonomi sirkular.',
        skills: ['Digital Systems', 'Waste Management', 'Economics'],
        university: 'Universitas Negeri Yogyakarta'
    },
    {
        name: 'Maya Anggraini',
        role: 'Koordinator Daur Ulang',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        bio: 'Mengembangkan program daur ulang dan kreativitas sampah.',
        skills: ['Recycling', 'Creative Design', 'Workshop Management'],
        university: 'Universitas Negeri Yogyakarta'
    },
    {
        name: 'Rizki Fajar',
        role: 'Teknologi & Inovasi',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        bio: 'Mengembangkan solusi teknologi untuk pengelolaan sampah.',
        skills: ['Web Development', 'IoT Systems', 'Data Analysis'],
        university: 'Universitas Negeri Yogyakarta'
    },
    {
        name: 'Indira Sari',
        role: 'Hubungan Masyarakat',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        bio: 'Menjalin komunikasi dan kerjasama dengan komunitas lokal.',
        skills: ['Public Relations', 'Communication', 'Event Planning'],
        university: 'Universitas Negeri Yogyakarta'
    },
    {
        name: 'Dimas Prasetyo',
        role: 'Dokumentasi & Media',
        image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
        bio: 'Mendokumentasikan kegiatan dan mengelola media sosial.',
        skills: ['Photography', 'Video Editing', 'Social Media'],
        university: 'Universitas Negeri Yogyakarta'
    },
    {
        name: 'Lestari Wulan',
        role: 'Kesehatan Lingkungan',
        image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
        bio: 'Fokus pada aspek kesehatan dari program kebersihan lingkungan.',
        skills: ['Health Assessment', 'Environmental Science', 'Research'],
        university: 'Universitas Negeri Yogyakarta'
    },
    {
        name: 'Agung Wijaya',
        role: 'Logistik & Operasional',
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
        bio: 'Mengelola logistik dan operasional kegiatan lapangan.',
        skills: ['Operations', 'Supply Chain', 'Field Coordination'],
        university: 'Universitas Negeri Yogyakarta'
    },
    {
        name: 'Putri Maharani',
        role: 'Analisis & Evaluasi',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        bio: 'Melakukan analisis dampak dan evaluasi program berkelanjutan.',
        skills: ['Data Analysis', 'Impact Assessment', 'Report Writing'],
        university: 'Universitas Negeri Yogyakarta'
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
        icon: '📱',
        title: 'Aplikasi Mobile',
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
        background: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop',
        fadeDirection: 'left',
        gradient: 'from-blue-900/80 via-cyan-900/70 to-slate-900/60'
    },
    {
        id: 'mission',
        background: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop',
        fadeDirection: 'right',
        gradient: 'from-purple-900/80 via-indigo-900/70 to-slate-900/60'
    },
    {
        id: 'team',
        background: 'https://images.unsplash.com/photo-1525026198548-4baa812f1183?q=80&w=2000&auto=format&fit=crop',
        fadeDirection: 'left',
        gradient: 'from-orange-900/80 via-amber-900/70 to-slate-900/60'
    },
    {
        id: 'footer',
        background: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop',
        fadeDirection: 'right',
        gradient: 'from-slate-900/90 via-gray-900/80 to-black/70'
    }
];

const AboutPage = () => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [currentSection, setCurrentSection] = useState(0);
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
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
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
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full shadow-lg"
                        style={{
                            left: `${10 + i * 12}%`,
                            top: `${20 + (i % 3) * 25}%`,
                            backgroundColor: currentSection === 0 ? '#34d399' :
                                currentSection === 1 ? '#60a5fa' :
                                    currentSection === 2 ? '#a78bfa' : '#fbbf24',
                            boxShadow: `0 0 10px ${currentSection === 0 ? '#34d399' :
                                currentSection === 1 ? '#60a5fa' :
                                    currentSection === 2 ? '#a78bfa' : '#fbbf24'}`
                        }}
                        animate={{
                            y: [-20, -100, -20],
                            x: [-10, 10, -10],
                            opacity: [0.4, 0.9, 0.4],
                            scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
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
                            Transformasi lingkungan berkelanjutan melalui inovasi, teknologi,
                            dan pemberdayaan masyarakat Dusun Kemiri.
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
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mx-auto max-w-fit shadow-2xl border border-slate-700/50"
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
                                    className="bg-slate-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-slate-700/50 hover:border-slate-600/70"
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <motion.div
                                        className="text-4xl sm:text-5xl mb-4 sm:mb-6 text-center"
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        transition={{ duration: 0.3 }}
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

                {/* Mission & Vision Section */}
                <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <motion.div
                        className="max-w-6xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mx-auto max-w-fit shadow-2xl border border-slate-700/50"
                            variants={itemVariants}
                        >
                            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                Misi & Visi
                            </span>
                        </motion.h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                            <motion.div
                                className="bg-slate-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-500"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 sm:mb-8">
                                    <motion.div
                                        className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 shadow-xl"
                                        whileHover={{ rotate: 180 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <span className="text-2xl sm:text-3xl text-white">🎯</span>
                                    </motion.div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-purple-400 text-center sm:text-left">Misi Kami</h3>
                                </div>
                                <p className="text-slate-300 leading-relaxed text-base sm:text-lg text-center sm:text-left">
                                    Mendorong transformasi berkelanjutan melalui edukasi komprehensif,
                                    implementasi teknologi inovatif, dan pembangunan ekosistem kolaboratif
                                    yang memberdayakan setiap lapisan masyarakat.
                                </p>
                            </motion.div>

                            <motion.div
                                className="bg-slate-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-500"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 sm:mb-8">
                                    <motion.div
                                        className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 shadow-xl"
                                        whileHover={{ rotate: -180 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <span className="text-2xl sm:text-3xl text-white">🌟</span>
                                    </motion.div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-indigo-400 text-center sm:text-left">Visi Kami</h3>
                                </div>
                                <p className="text-slate-300 leading-relaxed text-base sm:text-lg text-center sm:text-left">
                                    Menjadi katalis perubahan yang mewujudkan Dusun Kemiri sebagai
                                    model komunitas berkelanjutan terdepan dengan lingkungan bersih
                                    dan ekonomi sirkular yang kuat.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* Team Section */}
                <section className="min-h-screen flex items-center justify-center px-4 py-32">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <motion.div className="text-center mb-24" variants={itemVariants}>
                            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-fit shadow-2xl border border-slate-700/50">
                                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                    Tim Perubahan
                                </span>
                            </h2>
                            <p className="text-xl text-slate-300 max-w-3xl mx-auto bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700/50">
                                Bertemu dengan para agent of change yang berdedikasi menghadirkan
                                solusi inovatif untuk keberlanjutan lingkungan Dusun Kemiri.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                            {teamMembers.map((member, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-slate-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer border border-slate-700/50 hover:border-orange-500/30 group"
                                    variants={cardVariants}
                                    whileHover="hover"
                                    onClick={() => setSelectedMember(member)}
                                >
                                    {/* Avatar sama */}
                                    <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-2">{member.name}</h3>
                                    <p className="text-xs sm:text-sm text-orange-400 text-center font-medium mb-3 sm:mb-4">{member.role}</p>
                                    <p className="text-xs sm:text-sm text-slate-300 text-center line-clamp-3 leading-relaxed">{member.bio}</p>

                                    <motion.div
                                        className="mt-4 sm:mt-6 flex justify-center"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="text-xs text-orange-400 bg-orange-900/50 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-orange-500/30">
                                            Klik untuk detail
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <motion.div
                            className="text-center mt-12 sm:mt-16"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="bg-gradient-to-r from-orange-500/95 to-amber-600/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <motion.h3
                                        className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Mari Bergabung Menciptakan Perubahan!
                                    </motion.h3>
                                    <motion.p
                                        className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90"
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        Jadilah bagian dari revolusi hijau dan berkontribusi dalam
                                        membangun masa depan berkelanjutan.
                                    </motion.p>
                                    <motion.button
                                        className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-600 font-bold rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
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
                            </motion.div>
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
                                {/* Image sama */}
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedMember.name}</h3>
                                <p className="text-base sm:text-lg text-orange-400 font-medium mb-2">{selectedMember.role}</p>
                                <p className="text-sm text-slate-400 mb-4">{selectedMember.university}</p>
                                <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">{selectedMember.bio}</p>
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-white mb-3">Keahlian:</h4>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {selectedMember.skills.map((skill, skillIndex) => (
                                            <motion.span
                                                key={skillIndex}
                                                className="px-2 sm:px-3 py-1 bg-gradient-to-r from-orange-900/70 to-amber-900/70 text-orange-300 text-xs font-medium rounded-full border border-orange-500/30"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.3 + skillIndex * 0.1, type: 'spring', stiffness: 200 }}
                                            >
                                                {skill}
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

            <section className="h-16 sm:h-32"></section>
            <div className="relative z-30 mt-16 sm:mt-20">
                <Footer />
            </div>
        </div>

    );
};

export default AboutPage;
