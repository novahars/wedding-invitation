import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const localImages = [
  { src: "/img/gallery1.webp", position: "object-top pl-3 md:pl-10" },
  { src: "/img/gallery3.webp", position: "object-center pl-3 " },
  { src: "/img/gallery2.webp", position: "object-left pr-5 mt-5 md:mt-12 md:pr-10 " },
  { src: "/img/gallery41.webp", position: "object-center pr-3 md:pr-11 " },

];

const Gallery: React.FC = () => {
  const [visibleImages, setVisibleImages] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setVisibleImages((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.gallery-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-6xl mx-auto">
      {localImages.map((item, index) => (
        <motion.div
          key={index}
          data-index={index}
          className={`gallery-item relative group overflow-hidden w-full aspect-square rounded-full ${visibleImages.includes(index) ? '' : 'opacity-0'
            }
            ${index === 3 ? 'md:col-start-2' : ''}
          `}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={visibleImages.includes(index) ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        >
          <div className="w-full h-full watercolor-frame bg-white p-1 shadow-md">
            <img
              src={item.src}
              alt={`Our Love Story ${index + 1}`}
              className={`w-full h-full object-cover ${item.position} transition-transform duration-1000 ease-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0`}
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 watercolor-frame bg-[#3D5A80]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px] pointer-events-none">
            <span className="text-white font-serif italic text-xl tracking-widest px-4 border-b border-white/40 pb-2">
              Our Story
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Gallery;
