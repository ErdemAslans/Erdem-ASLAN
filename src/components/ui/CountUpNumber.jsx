import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CountUpNumber = ({ 
  end, 
  duration = 2.5, 
  suffix = '', 
  prefix = '',
  decimals = 0,
  className = '' 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Parse the end value if it's a string like "35+"
  const numericEnd = typeof end === 'string' 
    ? parseInt(end.replace(/\D/g, '')) || 0 
    : end;
  
  const actualSuffix = typeof end === 'string' 
    ? end.replace(/[0-9]/g, '') || suffix
    : suffix;

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          start={0}
          end={numericEnd}
          duration={duration}
          suffix={actualSuffix}
          prefix={prefix}
          decimals={decimals}
          separator=","
        />
      ) : (
        `${prefix}0${actualSuffix}`
      )}
    </span>
  );
};

export default CountUpNumber;