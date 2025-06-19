import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation} from 'framer-motion';

const Home: React.FC = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
      setIsLoaded(true);
    };
    sequence();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      y: 100, 
      opacity: 0, 
      scale: 0.8,
      rotateX: 45,
      filter: "blur(10px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
        duration: 1.2,
      } ,
    },
  };

  const buttonVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      rotateY: 180,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 200,
        delay: 0.3,
      },
    },
  };

  const FloatingElement: React.FC<{ 
    size: number; 
    color: string; 
    top: string; 
    left: string; 
    delay: number;
    duration: number;
  }> = ({ size, color, top, left, delay, duration }) => (
    <motion.div
      className="absolute rounded-full opacity-30"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        top,
        left,
      }}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        rotate: [0, 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large background blobs */}
        <motion.div
          className="absolute -top-40 -right-40 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-red-200 to-pink-200 rounded-full opacity-20 blur-3xl"
          animate={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 30 },
            y: { type: "spring", stiffness: 50, damping: 30 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        
        <motion.div
          className="absolute -bottom-40 -left-40 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl"
          animate={{
            x: mousePosition.x * -25,
            y: mousePosition.y * -25,
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            x: { type: "spring", stiffness: 40, damping: 25 },
            y: { type: "spring", stiffness: 40, damping: 25 },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Floating particles */}
        <FloatingElement size={6} color="#ef4444" top="20%" left="10%" delay={0} duration={4} />
        <FloatingElement size={4} color="#3b82f6" top="30%" left="85%" delay={1} duration={5} />
        <FloatingElement size={8} color="#8b5cf6" top="70%" left="15%" delay={2} duration={6} />
        <FloatingElement size={3} color="#10b981" top="15%" left="70%" delay={0.5} duration={3} />
        <FloatingElement size={10} color="#f59e0b" top="80%" left="80%" delay={1.5} duration={7} />
        <FloatingElement size={5} color="#ec4899" top="60%" left="90%" delay={2.5} duration={4} />

        {/* Grid overlay */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        ref={containerRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-12">
          <motion.div
            className="bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-2xl font-bold text-lg sm:text-2xl shadow-2xl relative overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              rotate: [0, -1, 1, 0],
              boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20"
              animate={{ x: [-100, 200] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            DMI
            
          </motion.div>
        </motion.div>

        {/* Main Headline */}
        <motion.div variants={itemVariants} className="text-center mb-4 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-tight tracking-tight">
            <motion.div
              className="mb-2 sm:mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent"
                whileHover={{ 
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                Design
              </motion.span>{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent"
                whileHover={{ 
                  rotateY: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                Made
              </motion.span>
            </motion.div>
            
            <motion.div className="relative">
              <motion.span
                className="relative z-10 text-red-600 font-black"
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                Intelligent
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-red-100 rounded-lg -skew-x-12 -z-10"
                initial={{ scaleX: 0, transformOrigin: 0 }}
                animate={{ scaleX: isLoaded ? 1 : 0 }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.div 
          variants={itemVariants} 
          className="text-center mb-4 sm:mb-8 max-w-xs sm:max-w-2xl lg:max-w-4xl"
        >
          <motion.p 
            className="text-lg sm:text-2xl lg:text-3xl text-gray-700 font-bold leading-tight"
            whileHover={{ scale: 1.01 }}
          >
            From brand kit to launch-ready content, websites & apps — powered by AI.
          </motion.p>
        </motion.div>

        {/* Description */}
        {/* <motion.div 
          variants={itemVariants} 
          className="text-center mb-8 sm:mb-16 max-w-xs sm:max-w-2xl lg:max-w-4xl"
        >
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            Join 500+ funded startups using DMI to create professional brand identities, social content, and app interfaces in minutes, not months.
          </p>
        </motion.div> */}

        {/* CTA Buttons */}
        <motion.div 
          variants={buttonVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center w-full max-w-xs sm:max-w-lg"
        >
          <motion.button
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-2xl relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              y: -3,
              boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
              animate={{ scale: [0, 1.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>✓</span>
              Try the Demo
            </span>
          </motion.button>

          <motion.button
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg border-2 border-gray-200 hover:border-red-600 shadow-2xl relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              y: -3,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Join Waitlist
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-12 sm:mt-20 text-center w-full max-w-xs sm:max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-8 lg:gap-12">
            {[
              { icon: '🚀', text: '500+ Startups', color: 'bg-green-400' },
              { icon: '🤖', text: 'AI-Powered', color: 'bg-blue-400' },
              { icon: '⚡', text: 'Minutes, Not Months', color: 'bg-purple-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-4 rounded-full shadow-lg border border-gray-100"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + index * 0.1, type: "spring", stiffness: 200 }}
              >
                <div className={`w-2 h-2 sm:w-3 sm:h-3 ${stat.color} rounded-full animate-pulse`} />
                <span className="font-semibold text-gray-700 text-xs sm:text-base">
                  {stat.text}
                </span>
                <span className="text-sm sm:text-lg">{stat.icon}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute top-10 left-10 w-12 h-12 sm:w-16 sm:h-16 border-2 border-red-200 rounded-full opacity-30">
        <motion.div
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="absolute bottom-10 right-10 w-10 h-10 sm:w-12 sm:h-12 border-2 border-blue-200 rounded-full opacity-30">
        <motion.div
          className="w-full h-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default Home;