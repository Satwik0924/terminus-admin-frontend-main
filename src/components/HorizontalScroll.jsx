'use client';

import { useRef , useState , useEffect} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  { src: 'https://www.pngmart.com/files/22/White-Background-PNG-Photo.png', text: '' },
  { src: 'https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-78b21707-b60f-4e60-a57c-717aabc6732b.jpg?e=webp&cX=105.98305084745763&cY=0&cW=122.03389830508475&cH=160', text: 'Text for Image 1' },
  { src: 'https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-5f67c8eb-7a08-41ca-a7bb-1e5b91bff03e.jpg?e=webp&cX=0&cY=17.04444444444445&cW=334&cH=437.9111111111111', text: 'Text for Image 2' },
  { src: 'https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-4df42c0e-8c08-4e22-ad25-e2333cca4f7c.jpg?e=webp&cX=106.17675544794189&cY=0&cW=121.64648910411623&cH=160', text: 'Text for Image 3' },
  { src: 'https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-a34f793c-c89f-4d8f-b81b-890799cf8f72.jpg?e=webp&cX=0&cY=17.04444444444445&cW=334&cH=437.9111111111111', text: 'Text for Image 4' },
  { src: 'https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-3d0348ad-fb97-4804-abad-21c7950f61e7.jpg?e=webp&cX=0&cY=17.04444444444445&cW=334&cH=437.9111111111111', text: 'Text for Image 5' },
  { src: 'https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-26f45099-2bd3-4f7e-8f04-6d2c021b56f6.jpg?e=webp&cX=80.12348668280872&cY=0&cW=189.75302663438256&cH=248', text: 'Text for Image 5' },
  { src: 'https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-c9318ece-ed9c-4bd7-97db-ad896c37c7e3.jpg?e=webp&cX=0&cY=17.737341772151893&cW=334&cH=436.5253164556962', text: 'Text for Image 5' },
  { src: 'https://i-p.rmcdn.net/6704dad37ea051caab873de5/5068988/image-c5c58d3a-b26d-499b-9866-957656578f4b.jpg?e=webp&cX=345.44309927360774&cY=0&cW=309.1138014527845&cH=404', text: 'Text for Image 5' },
];

export default function HorizontalScrollCarousel() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // Trigger horizontal scroll only after user has scrolled past half the screen
  const x = useTransform(scrollYProgress, [0, 0.3, 1], ['0%', '0%', '-80%']);

  return (
    <section
      ref={targetRef}
      style={{ position: 'relative', height: '300vh'  }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            gap: '32px', // Increased gap between cards
            x,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                width: '300px', // Reduced size for responsiveness
                height: '400px',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'transform 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector('.overlay');
                overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector('.overlay');
                overlay.style.opacity = '0';
              }}
            >
              <img
                src={image.src}
                alt={``}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  
                }}
              />
              <div
                className="overlay"
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: '#000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: '0',
                  transition: 'opacity 0.3s',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {image.text}
              </div>
            </div>
          ))}
           {/* Add text aligned with the images */}
           <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '16px', // space between the images and the text
              width: '300px', // keep it same width as images
            }}
          >
            <p
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#333',
              }}
            >
              Setting Milestones
            </p>
            <p
              style={{
                fontSize: '18px',
                textAlign: 'center',
                color: '#555',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div
            style={{
              position: 'relative',
              width: '300px',
              height: '400px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://www.pngmart.com/files/22/White-Background-PNG-Photo.png"
              alt="Additional image"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            </div>
            <div
            style={{
              position: 'relative',
              width: '300px',
              height: '400px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://www.pngmart.com/files/22/White-Background-PNG-Photo.png"
              alt="Additional image"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            </div>
        </motion.div>
      </div>
    </section>
  );
}
