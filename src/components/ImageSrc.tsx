import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ImgHTMLAttributes, ReactNode } from 'react';

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> {
  src: string | null;
  fallbackSrc?: string;
  loadingPlaceholder?: ReactNode;
  errorPlaceholder?: ReactNode;
  onLoadingComplete?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  cacheExpiry?: number; // Cache expiry in milliseconds, default 1 week
}

const ImageComponent: React.FC<ImageProps> = ({
  src,
  fallbackSrc = '/images/noImage.png',
  alt = 'image',
  loadingPlaceholder,
  errorPlaceholder,
  onLoadingComplete,
  onError,
  className = '',
  aspectRatio = 'aspect-square',
  objectFit = 'cover',
  priority = false,
  cacheExpiry = 7 * 24 * 60 * 60 * 1000, // Default 1 week
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [imageSrc, setImageSrc] = useState<string>(src || fallbackSrc);
  const [isVisible, setIsVisible] = useState(priority);
  
  // Function to create a cache key from URL
  const getCacheKey = useCallback((url: string): string => {
    return `img_cache_${url}`;
  }, []);

  // Set up image with caching logic
  useEffect(() => {
    if (!src) {
      setImageSrc(fallbackSrc);
      setLoading(false);
      return;
    }

    // Try to get from cache first
    try {
      const cacheKey = getCacheKey(src);
      const cachedData = localStorage.getItem(cacheKey);
      
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        
        // Check if cache is still valid
        if (parsedData && 
            parsedData.timestamp && 
            Date.now() - parsedData.timestamp < cacheExpiry) {
          // Use cached image source
          setImageSrc(src);
          setLoading(false);
          onLoadingComplete?.();
          return;
        }
      }
    } catch (e) {
      console.warn('Cache access error:', e);
      // Continue with normal loading if cache fails
    }
    
    // If not in cache or cache expired, use the original source
    setImageSrc(src);
    setLoading(true);
    
  }, [src, fallbackSrc, getCacheKey, cacheExpiry, onLoadingComplete]);

  // Intersection Observer setup for lazy loading
  useEffect(() => {
    if (!priority) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      });
      
      const elementId = `image-${src || fallbackSrc}`.replace(/[^\w-]/g, '_');
      const element = document.getElementById(elementId);
      if (element) {
        observer.observe(element);
      }
      
      return () => observer.disconnect();
    }
  }, [src, fallbackSrc, priority]);

  const handleLoad = useCallback(() => {
    setLoading(false);
    onLoadingComplete?.();
    
    // Cache the successfully loaded image
    if (src) {
      try {
        const cacheKey = getCacheKey(src);
        localStorage.setItem(cacheKey, JSON.stringify({
          timestamp: Date.now()
        }));
      } catch (e) {
        console.warn('Cache write error:', e);
      }
    }
  }, [src, getCacheKey, onLoadingComplete]);

  const handleError = useCallback(() => {
    const error = new Error(`Failed to load image: ${imageSrc}`);
    setError(error);
    setLoading(false);
    setImageSrc(fallbackSrc);
    onError?.(error);
  }, [imageSrc, fallbackSrc, onError]);
  
  const defaultLoadingPlaceholder = (
    <div className="w-full h-full animate-pulse bg-gray-200 rounded" />
  );

  const defaultErrorPlaceholder = (
    <img
      src="/images/noImage.png"
      alt="Error loading image"
      className={`w-[400px] h-full rounded-md max-[450px]:w-[250px] object-${objectFit}`}
    />
  );

  const containerClasses = `
    relative
    overflow-hidden
    ${aspectRatio}
    ${className}
  `.trim();

  const imageClasses = `
    w-full
    h-full
    transition-opacity
    duration-300
    ${loading ? 'opacity-0' : 'opacity-100'}
    object-${objectFit}
  `.trim();

  // Create a sanitized ID for the element
  const elementId = `image-${src || fallbackSrc}`.replace(/[^\w-]/g, '_');

  if (!isVisible) {
    return (
      <div id={elementId} className={containerClasses}>
        {loadingPlaceholder || defaultLoadingPlaceholder}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {loading && (loadingPlaceholder || defaultLoadingPlaceholder)}
      {error && (errorPlaceholder || defaultErrorPlaceholder)}
      {!error && (
        <img
          src={imageSrc}
          alt={alt}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          {...props}
        />
      )}
    </div>
  );
};

export default ImageComponent;
