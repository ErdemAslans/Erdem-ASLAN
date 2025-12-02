import { useScrollPosition } from '@/hooks';

const Background = () => {
  const { scrollY } = useScrollPosition();

  return (
    <>
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none noise-overlay z-50" />

      {/* Ambient Glow Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
            transform: `translate(${scrollY * 0.015}px, ${scrollY * 0.008}px)`
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.04) 0%, transparent 70%)',
            bottom: '10%',
            left: '-5%',
            animationDelay: '2s',
            transform: `translate(${-scrollY * 0.01}px, ${-scrollY * 0.008}px)`
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.03) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(${scrollY * 0.005}px, ${-scrollY * 0.01}px)`,
            animationDelay: '4s',
          }}
        />
      </div>
    </>
  );
};

export default Background;
