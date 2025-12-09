import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ isLoading = true }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight-800"
        >
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-20 h-20 border-2 border-cyan/20 rounded-full"
              />

              {/* Spinning arc */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 border-2 border-transparent border-t-cyan rounded-full"
              />

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold gradient-text">EA</span>
              </div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="text-slate-light text-sm font-medium">Loading</span>
              <motion.div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-1 h-1 bg-cyan rounded-full"
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 hero-grid opacity-30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
