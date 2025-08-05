import React, { useState, useEffect, memo } from 'react';

const LazyImage = ({ src, alt, className, onLoad }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const lowResSrc = `${src}&q=10&w=50`

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageSrc(src);
            setIsLoaded(true);
            onLoad && onLoad();
        };
        img.src = src;
        img.src = `${src}&w=800`; // EDIT: Limit image width to 800px
        img.srcset = `${src}&w=400 400w, ${src}&w=800 800w`; // ADD: Responsive image sizes
        img.sizes = '(max-width: 640px) 400px, 800px'; // ADD: Responsive sizes
    }, [src, onLoad]);
    return (
        <div className={`${className} bg-slate-700 relative overflow-hidden`} style={{ willChange: 'opacity' }}>
            {!isLoaded && (
                <img
                    src={lowResSrc}
                    alt={`${alt} placeholder`}
                    className="w-full h-full object-cover absolute inset-0 blur-sm"
                    loading="lazy"
                />
            )}
            {isLoaded && (
                <img
                    src={imageSrc}
                    alt={alt}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    loading="lazy"
                    style={{ willChange: 'opacity' }} // ADD: Optimize rendering
                />
            )}
        </div>
    );
};

export default memo(LazyImage);