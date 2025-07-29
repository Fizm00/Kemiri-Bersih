// src/pages/admin/AdminDashboardPage.jsx

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminHeader from '../components/admin/AdminHeader';
import { useData } from '../context/DataContext';

// Enhanced StatCard with glassmorphism and micro-interactions
const StatCard = ({ title, value, change, icon, color, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    emerald: {
      bg: 'from-emerald-400 to-emerald-600',
      icon: 'bg-emerald-500/20 text-emerald-400',
      glow: 'shadow-emerald-500/25'
    },
    blue: {
      bg: 'from-blue-400 to-blue-600',
      icon: 'bg-blue-500/20 text-blue-400',
      glow: 'shadow-blue-500/25'
    },
    yellow: {
      bg: 'from-amber-400 to-yellow-500',
      icon: 'bg-amber-500/20 text-amber-400',
      glow: 'shadow-amber-500/25'
    },
    purple: {
      bg: 'from-purple-400 to-purple-600',
      icon: 'bg-purple-500/20 text-purple-400',
      glow: 'shadow-purple-500/25'
    },
  };

  return (
    <motion.div
      className={`relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 p-6 overflow-hidden group cursor-pointer
        ${isHovered ? `shadow-2xl ${colorClasses[color].glow}` : 'shadow-lg shadow-slate-200/50'}`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].bg} opacity-0 group-hover:opacity-5`}
        initial={false}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${colorClasses[color].bg.split(' ')[1]} rounded-full opacity-0 group-hover:opacity-30`}
            initial={{
              x: Math.random() * 100 + '%',
              y: '100%',
              opacity: 0
            }}
            animate={isHovered ? {
              y: '-20%',
              opacity: [0, 0.3, 0],
              transition: {
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: "loop"
              }
            } : {}}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <motion.p
            className="text-sm font-medium text-slate-600 mb-2"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
          >
            {title}
          </motion.p>
          <motion.p
            className="text-3xl font-bold text-slate-900"
            key={value}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {value}
          </motion.p>
        </div>

        <motion.div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorClasses[color].icon} backdrop-blur-sm`}
          whileHover={{
            rotate: 360,
            scale: 1.1,
            transition: { duration: 0.6, type: "spring" }
          }}
        >
          <i className={`fas ${icon} text-xl`}></i>
        </motion.div>
      </div>

      <motion.div
        className="mt-4 flex items-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
          whileHover={{ scale: 1.05 }}
        >
          <motion.i
            className="fas fa-arrow-up text-xs mr-1"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {change}
        </motion.span>
        <span className="text-sm text-slate-500 ml-2">from last month</span>
      </motion.div>
    </motion.div>
  );
};

// Enhanced RecentActivityItem with better animations
const RecentActivityItem = ({ user, action, time, icon, color, index }) => {
  const colorClasses = {
    emerald: 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-emerald-200',
    red: 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-red-200',
    blue: 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-blue-200',
  };

  return (
    <motion.div
      className="group p-4 hover:bg-gradient-to-r hover:from-slate-50 hover:to-white transition-all duration-300 flex items-start space-x-4 border-l-4 border-transparent hover:border-slate-200"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{
        x: 8,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[color]} shadow-lg`}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
      >
        <i className={`fas ${icon} text-sm`}></i>
      </motion.div>
      <div className="flex-1 min-w-0">
        <motion.p
          className="text-sm font-semibold text-slate-800 group-hover:text-slate-900"
          whileHover={{ x: 4 }}
        >
          {user}
        </motion.p>
        <p className="text-sm text-slate-600 group-hover:text-slate-700 mt-0.5">{action}</p>
        <motion.p
          className="text-xs text-slate-400 mt-1 group-hover:text-slate-500"
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
        >
          {time}
        </motion.p>
      </div>
      <motion.div
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
      >
        <i className="fas fa-chevron-right text-slate-400 text-xs"></i>
      </motion.div>
    </motion.div>
  );
};

// Enhanced QuickActionItem with modern glassmorphism
const QuickActionItem = ({ title, description, icon, color, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    emerald: {
      bg: 'from-emerald-500/10 to-emerald-600/20',
      border: 'border-emerald-200/50 hover:border-emerald-300',
      text: 'text-emerald-700',
      glow: 'shadow-emerald-500/20'
    },
    blue: {
      bg: 'from-blue-500/10 to-blue-600/20',
      border: 'border-blue-200/50 hover:border-blue-300',
      text: 'text-blue-700',
      glow: 'shadow-blue-500/20'
    },
    purple: {
      bg: 'from-purple-500/10 to-purple-600/20',
      border: 'border-purple-200/50 hover:border-purple-300',
      text: 'text-purple-700',
      glow: 'shadow-purple-500/20'
    },
    yellow: {
      bg: 'from-amber-500/10 to-yellow-600/20',
      border: 'border-amber-200/50 hover:border-amber-300',
      text: 'text-amber-700',
      glow: 'shadow-amber-500/20'
    },
  };

  return (
    <motion.div
      onClick={onClick}
      className={`relative p-5 rounded-2xl border-2 border-dashed backdrop-blur-sm transition-all duration-300 cursor-pointer group overflow-hidden
        ${colorClasses[color].border} ${isHovered ? `shadow-xl ${colorClasses[color].glow}` : 'shadow-md'}`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].bg} opacity-0 group-hover:opacity-100`}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 flex items-center space-x-4">
        <motion.div
          className={`p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg ${colorClasses[color].text}`}
          whileHover={{
            rotate: [0, -10, 10, 0],
            scale: 1.1,
            transition: { duration: 0.5 }
          }}
        >
          <i className={`fas ${icon} text-xl`}></i>
        </motion.div>
        <div className="flex-1">
          <motion.h3
            className="font-semibold text-slate-900 group-hover:text-slate-800"
            whileHover={{ x: 4 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-sm text-slate-600 group-hover:text-slate-700 mt-1"
            whileHover={{ x: 4 }}
          >
            {description}
          </motion.p>
        </div>
        <motion.div
          className="opacity-0 group-hover:opacity-100"
          animate={{
            x: isHovered ? [0, 4, 0] : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <i className="fas fa-arrow-right text-slate-400"></i>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
const AdminDashboardPage = () => {
  const [adminUser, setAdminUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { users } = useData();

  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (user) setAdminUser(JSON.parse(user));
    setMounted(true);
  }, []);

  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);

  const activities = [
    { user: 'Maria Garcia', action: 'New user registered', time: '2 hours ago', icon: 'fa-user-plus', color: 'emerald' },
    { user: 'John Smith', action: 'Balance deducted: Rp 45.500', time: '4 hours ago', icon: 'fa-arrow-down', color: 'red' },
    { user: 'Sarah Johnson', action: 'Pickup scheduled', time: '6 hours ago', icon: 'fa-truck', color: 'blue' },
    { user: 'Michael Brown', action: 'Account verified', time: '8 hours ago', icon: 'fa-check-circle', color: 'emerald' },
    { user: 'Emma Wilson', action: 'Deposit completed: Rp 75.000', time: '10 hours ago', icon: 'fa-arrow-up', color: 'blue' },
  ];

  const quickActions = [
    { title: 'Add New User', description: 'Register a new user account', icon: 'fa-user-plus', color: 'emerald' },
    { title: 'View All Users', description: 'Manage existing users', icon: 'fa-users', color: 'blue' },
    { title: 'Process Pickup', description: 'Handle waste pickup requests', icon: 'fa-truck', color: 'purple' },
    { title: 'Generate Report', description: 'Create activity reports', icon: 'fa-file-alt', color: 'yellow' },
  ];

  if (!adminUser || !mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-emerald-400/30 border-t-emerald-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white/80 font-medium">Loading Dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-emerald-400/5 to-blue-400/5"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 2
            }}
          />
        ))}
      </div>

      <AdminHeader />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome back, {adminUser.name}! 👋
          </motion.h1>
          <motion.p
            className="text-slate-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Here's what's happening with your waste bank today.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <StatCard
            title="Total Users"
            value={users.length}
            change="+12%"
            icon="fa-users"
            color="emerald"
            index={0}
          />
          <StatCard
            title="Active Accounts"
            value={users.filter(u => u.status === 'active').length}
            change="+8%"
            icon="fa-user-check"
            color="blue"
            index={1}
          />
          <StatCard
            title="Total Balance"
            value={`Rp ${totalBalance.toLocaleString('id-ID')}`}
            change="+15%"
            icon="fa-wallet"
            color="yellow"
            index={2}
          />
          <StatCard
            title="Monthly Pickups"
            value="156"
            change="+23%"
            icon="fa-truck"
            color="purple"
            index={3}
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <motion.div
            className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 border border-white/20 overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <motion.i
                  className="fas fa-clock text-emerald-500 mr-3"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Recent Activities
              </h2>
              <p className="text-slate-600 mt-1">Latest user interactions and system events</p>
            </div>
            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {activities.map((activity, index) => (
                  <RecentActivityItem key={index} {...activity} index={index} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 border border-white/20 p-6 space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center mb-2">
                <motion.i
                  className="fas fa-bolt text-amber-500 mr-3"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Quick Actions
              </h2>
              <p className="text-slate-600">Frequently used management tools</p>
            </div>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <QuickActionItem
                  key={index}
                  {...action}
                  index={index}
                  onClick={() => console.log(`${action.title} clicked`)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;