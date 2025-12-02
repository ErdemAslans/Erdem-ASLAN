import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GradientText, Button } from './ui';
import { stats } from '@/data/skills';
import { scrollToSection } from '@/utils/constants';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Orbital animation nodes
  const orbitalNodes = [0, 60, 120, 180, 240, 300];

  return (
    <section id="home" className="relative min-h-screen flex items-center hero-grid overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.06) 0%, transparent 70%)',
            bottom: '10%',
            left: '-5%',
          }}
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="section-container pt-20 relative z-10">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-cyan text-sm font-mono tracking-wider uppercase">
                  AI/ML Engineer
                </p>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-midnight-50">Erdem</span>
                  <br />
                  <GradientText>Aslan</GradientText>
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-lg text-slate-light max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Building intelligent systems that transform enterprise operations. 
                Specialized in multi-agent architectures, medical AI diagnostics, 
                and scalable cloud solutions.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button 
                  variant="primary"
                  onClick={() => scrollToSection('projects')}
                  icon
                  className="group"
                >
                  View Projects
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => scrollToSection('contact')}
                >
                  Get in Touch
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="flex items-center gap-8 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {stats.map((stat, index) => (
                  <div key={stat.label} className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-3xl font-bold">
                        <GradientText>{stat.value}</GradientText>
                      </p>
                      <p className="text-sm text-slate">{stat.label}</p>
                    </div>
                    {index < stats.length - 1 && (
                      <div className="w-px h-12 bg-navy-800" />
                    )}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - Abstract Visualization */}
            <motion.div 
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Orbital rings */}
                <div className="absolute inset-0 rounded-full border border-navy-800/30 animate-spin-slow" />
                <div className="absolute inset-4 rounded-full border border-navy-800/20 animate-spin-reverse" />
                <div className="absolute inset-8 rounded-full border border-navy-800/10 animate-spin-slower" />
                
                {/* Center element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-navy-800/50 to-midnight-900 flex items-center justify-center"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan/20 to-transparent flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-cyan/30" />
                    </div>
                  </motion.div>
                </div>

                {/* Floating nodes */}
                {orbitalNodes.map((deg, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-cyan/60"
                    style={{
                      top: `${50 + 45 * Math.sin(deg * Math.PI / 180)}%`,
                      left: `${50 + 45 * Math.cos(deg * Math.PI / 180)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ 
                      duration: 3 + i * 0.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center gap-2 text-slate">
          <span className="text-xs tracking-wider">SCROLL</span>
          <motion.div 
            className="w-px h-8 bg-gradient-to-b from-cyan to-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
