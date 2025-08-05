// Data Admin
export const adminAccounts = [
  { username: 'admin1', password: 'admin123', name: 'John Smith' },
  { username: 'admin2', password: 'admin456', name: 'Sarah Johnson' },
  // Tambahkan akun lain jika perlu
];

// Data User (warga)
export const initialUsers = [
  { id: 1, name: 'Ahmad Sutanto', email: 'ahmad@example.com', balance: 850000, totalWaste: 45, status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: 'Siti Nurhaliza', email: 'siti@example.com', balance: 720000, totalWaste: 38, status: 'active', joinDate: '2024-02-20' },
  { id: 3, name: 'Budi Setiawan', email: 'budi@example.com', balance: 680000, totalWaste: 34, status: 'active', joinDate: '2024-03-10' },
  { id: 4, name: 'Maya Sari', email: 'maya@example.com', balance: 550000, totalWaste: 29, status: 'inactive', joinDate: '2024-02-28' },
  { id: 5, name: 'Riko Pratama', email: 'riko@example.com', balance: 480000, totalWaste: 25, status: 'active', joinDate: '2024-01-05' },
  { id: 6, name: 'Indah Permata', email: 'indah@example.com', balance: 420000, totalWaste: 22, status: 'active', joinDate: '2024-03-12' },
  { id: 7, name: 'Andi Wijaya', email: 'andi@example.com', balance: 380000, totalWaste: 19, status: 'active', joinDate: '2024-03-18' },
  { id: 8, name: 'Dewi Lestari', email: 'dewi@example.com', balance: 320000, totalWaste: 16, status: 'inactive', joinDate: '2024-03-22' },
  { id: 9, name: 'Tono Hartono', email: 'tono@example.com', balance: 280000, totalWaste: 14, status: 'active', joinDate: '2024-03-25' },
  { id: 10, name: 'Yuniarso', email: 'yuniarso@example.com', balance: 240000, totalWaste: 12, status: 'active', joinDate: '2024-03-28' },
  { id: 11, name: 'Fahmi Hermawan', email: 'fahmi@example.com', balance: 200000, totalWaste: 10, status: 'active', joinDate: '2024-03-30' },
  { id: 12, name: 'Rizal Pratama', email: 'rizal@example.com', balance: 180000, totalWaste: 8, status: 'active', joinDate: '2024-04-01' },
  { id: 13, name: 'Dwiki Prasetyo', email: 'dwiki@example.com', balance: 160000, totalWaste: 6, status: 'active', joinDate: '2024-04-03' },
  { id: 14, name: 'Mariyah Sari', email: 'rizal@example.com', balance: 180000, totalWaste: 8, status: 'active', joinDate: '2024-04-01' },
  { id: 15, name: 'Sutanto', email: 'fahmi@example.com', balance: 200000, totalWaste: 10, status: 'active', joinDate: '2024-04-01' },
  { id: 16, name: 'Rangga', email: 'dwiki@example.com', balance: 160000, totalWaste: 6, status: 'active', joinDate: '2024-04-03' },
  { id: 17, name: 'Paijo', email: 'rizal@example.com', balance: 180000, totalWaste: 8, status: 'active', joinDate: '2024-04-01' },
  { id: 18, name: 'Kadiman', email: 'fahmi@example.com', balance: 200000, totalWaste: 10, status: 'active', joinDate: '2024-04-01' },
  { id: 19, name: 'Maryono', email: 'dwiki@example.com', balance: 160000, totalWaste: 6, status: 'active', joinDate: '2024-04-03' },
];

export const teamMembers = [
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
