import { useInView } from 'react-intersection-observer';

const AnimateOnScroll = ({ children, direction = 'up' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getDirectionClasses = () => {
    switch (direction) {
      case 'left':
        return inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10';
      case 'right':
        return inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10';
      default: // Arah 'up'
        return inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${getDirectionClasses()}`}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;