import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

interface indexProps {}

const transition: { duration: number; ease: number[] } = {
  duration: 1.4,
  ease: [0.6, 0.05, 0.28, 0.9], // ✅ All values are within 0–1 range
};

const navList: { initial: any; animate: any } = {
  initial: {
    x: 0,
  },
  animate: {
    x: 0,
    delay: 1.8,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
}

const navItem: { initial: any; animate: any } = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { ...transition },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.28, 0.9] }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    }
  }
};

const locomotiveScroll = typeof window !== `undefined` ? require('locomotive-scroll').default : null

const index: React.FC<indexProps> = ({}) => {
  const router = useRouter()
  const refScroll = React.useRef(null)
  const scrollRef = React.useRef<any>(null)

  React.useEffect(() => {
    if (!refScroll.current) return

    scrollRef.current = new locomotiveScroll({
      el: refScroll.current,
      smooth: true,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    })

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy()
        scrollRef.current = null
      }
    }
  }, [])


  

const skillGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const skillBoxVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120 } },
};


  function updateScroll() {
    if (scrollRef.current) {
      scrollRef.current.destroy()
      scrollRef.current = null
    }
    setTimeout(() => {
      if (!refScroll.current) return
      scrollRef.current = new locomotiveScroll({
        el: refScroll.current,
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      })
    }, 100)
  }
  const [modalVideo, setModalVideo] = React.useState<{src: string, title: string, orientation: 'vertical' | 'horizontal'} | null>(null);

  return (
    <motion.div data-scroll-container ref={refScroll} initial='initial' animate='animate'>
      <Head>
         <link rel="icon" href="/svg/favicon.svg" />
          <link href="#" rel="canonical" />
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
        <title>Aravinth - Services - Video</title>
        <link rel='icon' href='/vercel.svg' />
      </Head>
      <header data-scroll-section className='home-header'>
        <div className='home-header__left'>
          
          <nav className='navigation' style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
            onClick={() => router.push('/')}
            style={{
              padding: '1.3rem 1.4rem',
              background: 'black',
              border: 'none',
              borderRadius: 50,
              cursor: 'pointer',
              fontWeight: '900',
              color: 'white',
              fontSize: '1.5rem',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#383838';
              (e.currentTarget as HTMLButtonElement).style.color = '#FFD700';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'black';
              (e.currentTarget as HTMLButtonElement).style.color = 'white';
            
            }}
            aria-label="Go back"
          >
            ←
          </motion.button>
            <motion.img
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              src="/svg/favicon.svg"
              alt='aravinth logo'
            />
            <motion.ul variants={navList} className='navigation__list'>
              <motion.li variants={navItem} className='navigation__item'>
                <a onClick={updateScroll} href='#sectionFeatures'>
                  Features
                </a>
              </motion.li>
              <motion.li variants={navItem} className='navigation__item'>
                <a onClick={updateScroll} href='#sectionSkills'>
                  Skills
                </a>
              </motion.li>
              <motion.li variants={navItem} className='navigation__item'>
                <a onClick={updateScroll} href='#sectionGallery'>
                  Projects
                </a>
              </motion.li>
            </motion.ul>
          </nav>
          <div className='home-hero'>
            <motion.h4
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2, ...transition } }}
              className='hero-h4'>
              Captivating Videos, <br />
              Stunning Edits, Unforgettable Animations
            </motion.h4>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.6, ...transition } }}
              className='hero-h1'>
              Edit Cuts
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, ...transition } }}
              className='home-hero__footer'>
              <a href="https://www.fiverr.com/s/8zEDp84" target="_blank" rel="noopener noreferrer">
                <img src='https://img.icons8.com/ios-filled/50/fiverr--v2.png' alt='Fiverr icon' style={{ width: '36px', marginRight: '1.5rem' }} />
              </a>
              
              <a href="https://www.linkedin.com/in/aravinth-pm-5359071b7/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <img src="/img/ld.png" alt="LinkedIn" style={{ width: '32px', marginRight: '1.5rem' }} />
                </a>
                <a href="https://www.instagram.com/itz.arvinth/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <img src="https://img.icons8.com/fluency-systems-regular/48/instagram-new--v1.png" alt="Instagram" style={{ width: '32px' }} />
                </a>
            </motion.div>
          </div>
        </div>
        <div className='home-header__right'>
          <motion.img
            initial={{ opacity: 0, scale: 1.4, x: 400 }}
            animate={{ opacity: 1, scale: 1, x: 0, transition: { delay: 1.1, ...transition } }}
            src="/webp/bg1.webp"
            alt='maplehouse'
          />
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 1.8, ...transition } }}
            className='hero-unit'>
            <h2 className='hero-unit__h2'>5+</h2>
            <p className='hero-unit__p'>DEPLOYS DONE</p>
          </motion.div>
        </div>
      </header>
      <main className='main'>
        <section data-scroll-section id='sectionFeatures' className='section-features'>
          <motion.div
            className="feature-container"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="feature" key={0} variants={sectionVariants}>
              <img src='https://img.icons8.com/color/96/video-editing.png' alt='editing icon' />
              <h2 className='heading-2'>Professional Video Editing</h2>
              <p className='paragraph'>
                Transform your raw footage into cinematic stories. I use <b>Adobe Premiere Pro</b>, <b>Final Cut Pro</b>, and <b>After Effects</b> to deliver crisp, engaging edits for YouTube, social media, ads, and more.
              </p>
            </motion.div>
            <motion.div className="feature" key={1} variants={sectionVariants}>
              <img src='https://img.icons8.com/color/96/adobe-after-effects.png' alt='animation icon' />
              <h2 className='heading-2'>Motion Graphics & Animation</h2>
              <p className='paragraph'>
                Bring your ideas to life with custom animations, logo reveals, explainer videos, and kinetic typography. I craft smooth, eye-catching motion using <b>After Effects</b> and <b>Photoshop</b>.
              </p>
            </motion.div>
            <motion.div className="feature" key={6} variants={sectionVariants}>
            <img src='https://img.icons8.com/color/96/blender-3d.png' alt='blender icon' />
            <h2 className='heading-2'>Logo Animation & 3D Visuals</h2>
            <p className='paragraph'>
                I create stunning logo animations and high-tech 3D visuals using <b>Blender</b> and advanced motion design tools. Make your brand stand out with cinematic intros, animated logos, and immersive 3D effects.
            </p>
            </motion.div>
            <motion.div className="feature" key={3} variants={sectionVariants}>
              <img src='https://img.icons8.com/color/96/fiverr.png' alt='fiverr icon' />
              <h2 className='heading-2'>Freelance & Remote</h2>
              <p className='paragraph'>
                Trusted by clients worldwide on <b>Fiverr</b> and beyond. Fast delivery, clear communication, and 100% satisfaction guaranteed. I adapt to your workflow and timezone, making collaboration seamless and stress-free.
              </p>
            </motion.div>
            <motion.div className="feature" key={4} variants={sectionVariants}>
              <img src='https://img.icons8.com/color/96/youtube-play.png' alt='youtube icon' />
              <h2 className='heading-2'>YouTube & Social Content</h2>
              <p className='paragraph'>
                Specialized in editing for <b>YouTube</b>, <b>Instagram Reels</b>, and <b>Shorts</b>—optimized for engagement and shareability. I craft attention-grabbing intros, dynamic transitions, and platform-specific formats to boost your online presence.
              </p>
            </motion.div>
            <motion.div className="feature" key={5} variants={sectionVariants}>
              <img src='https://img.icons8.com/color/96/film-reel.png' alt='film reel icon' />
              <h2 className='heading-2'>Short Videos & Ads Edits</h2>
              <p className='paragraph'>
                From concept to final cut, I create compelling short films, commercials, and promos that leave a lasting impression. My edits are tailored for maximum impact, storytelling, and brand recall—perfect for marketing and campaigns.
              </p>
            </motion.div>
          </motion.div>
        </section>
      
        <section data-scroll-section id='sectionGallery' className='section-gallery'>
          <div className='gallery-container'>
            <h2 className='heading-2'>
              Few Video<br />Outss
            </h2>
            <div className='gallery'>
              <div className='gallery__left'>
                <div className='gallery__left--top' 
>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => setModalVideo({ src: '/video/video1.mp4', title: 'Showreel', orientation: 'vertical' })}
                  >
                    <img src='/img/video1.png' width="100" height="300" alt='Showreel' style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', height: '100%' }} />
                    
                  </div>
                </div>
                <div className='gallery__left--bottom'>
                  <h3 className='gallery-h3'>
                    Few Video<br />Outss
                  </h3>
                  <p className='gallery-p'>and we offer 4 of those</p>
                </div>
              </div>
              <div className='gallery__right'>
                <div className='gallery__right--top'>
                  <div className='gallery__right--top-left'>
                    <div
                      
                      onClick={() => setModalVideo({ src: '/video/video2.mp4', title: 'Client Work', orientation: 'horizontal' })}
                    >
                      <img src='/img/video2.png' alt='Client Work' />
                      
                    </div>
                  </div>
                  <div className='gallery__right--top-right'>
                   <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => setModalVideo({ src: '/video/video3.mp4', title: 'Client Work' ,orientation: 'vertical' })}
                    >
                    <img src='/img/video3.png' alt='maple image' />
                  </div>
                  </div>
                </div>
                <div className='gallery__right--bottom'>
                  <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => setModalVideo({ src: '/video/video4.mp4', title: 'Client Work' ,orientation: 'horizontal' })}
                    >
                    <img src='/img/video4.png' alt='maple image' />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }}>
              <button
                type="button"
                style={{
      
                  padding: '1.5rem 3rem',
                  background: '#dea833',
                  color: '#18181b',
                  border: 'none',
                  
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  transition: 'background 0.2s'
                }}
                onClick={() => window.open('https://drive.google.com/drive/folders/18jX7bkOluXbd1cjvvVqE0Q4D8NHKb1rG?usp=drive_link', '_blank')}
              >
                Show More
              </button>
            </div>
          </div>
        </section>

        <section data-scroll-section id='sectionSkills' className='section-skills'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.6, 0.05, 0.28, 0.9] }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              pointerEvents: 'none',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(ellipse 60% 80% at 20% 20%, #FFD70033 0%, #18181b 100%)',
              filter: 'blur(24px)',
              opacity: 0.7,
            }}
          />
          <motion.div
            className='skills-container'
            style={{ position: 'relative', zIndex: 1 }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className='skills-left'>
              <h2 className='heading-2'>
                My Creative <br /> Toolkit
              </h2>
              <p className='paragraph'>
                I use industry-leading tools to deliver professional results for every project.
              </p>
            </div>
            <div className='skills-right'>
              <motion.div
                className='skills-grid'
                variants={skillGridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {[
                  { src: 'https://img.icons8.com/color/48/adobe-after-effects--v1.png', label: 'After Effects' },
                  { src: 'https://img.icons8.com/color/48/adobe-premiere-pro--v1.png', label: 'Premiere Pro' },
                  { src: 'https://img.icons8.com/color/96/final-cut-pro-x.png', label: 'Final Cut Pro' },
                  { src: 'https://img.icons8.com/color/48/adobe-photoshop--v1.png', label: 'Photoshop' },
                  { src: 'https://img.icons8.com/ios-filled/50/fiverr--v2.png', label: 'Fiverr' },
                  { src: 'https://img.icons8.com/color/96/blender-3d.png', label: 'Blender' }, // <-- Added Blender skill
                  // Add more if needed
                ].map((skill) => (
                  <motion.div
                    className='skill-box'
                    key={skill.label}
                    variants={skillBoxVariants}
                    whileHover={{ translateY: '-6px', boxShadow: '0 8px 32px rgba(255,215,0,0.18)' }}
                  >
                    <img src={skill.src} alt={skill.label} />
                    <h5 className='heading-5'>{skill.label}</h5>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <footer data-scroll-section className='footer'>
        <motion.div
          className="footer__container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className='footer__top'>
            <h2 className='heading-2 heading-2__sub'>Book Consultation</h2>
            <form className='contact-form'>
              <div className='contact-form__left'>
                <input type='text' placeholder='enter your name' />
                <input type='email' placeholder='enter your email' />
                <input type='tel' placeholder='enter your telephone' />
              </div>
              <div className='contact-form__right'>
                <textarea placeholder='write something...'></textarea>
                <button type='submit'>SEND MESSAGE</button>
              </div>
            </form>
          </div>

          <div className='footer__bottom'>
            <div className='footer__bottom--box'>
              <p className='footer-p'>
                +91 91591-33383
                <br />
              </p>
            </div>
            <div className='footer__bottom--box'>
              <p className='footer-p'>
                Hosur , Tamil Nadu, India
              </p>
            </div>
            <div className='footer__bottom--box'>
              <div className='footer-socials'>
                <a href="https://www.fiverr.com/s/8zEDp84" target="_blank" rel="noopener noreferrer">
                    <img src='https://img.icons8.com/ios-filled/50/fiverr--v2.png' alt='Fiverr icon' style={{ width: '36px', marginRight: '1.5rem' }} />
                </a>
                <a href="https://www.linkedin.com/in/aravinth-pm-5359071b7/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <img src="/img/ld.png" alt="LinkedIn" style={{ width: '32px', marginRight: '1.5rem' }} />
                </a>
                <a href="https://www.instagram.com/itz.arvinth/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <img src="https://img.icons8.com/fluency-systems-regular/48/instagram-new--v1.png" alt="Instagram" style={{ width: '32px' }} />
                </a>
              </div>
            </div>
          </div>
          <p className='footer-copyright'>© Copyright 2025 / Aravinth pm </p>
        </motion.div>
      </footer>

      {modalVideo && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setModalVideo(null)}
        >
          <div
            style={{
              position: 'relative',
              background: '#111',
              borderRadius: '1rem',
              maxWidth: '90vw',
              maxHeight: '80vh',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <video
              src={modalVideo.src}
              controls
              autoPlay
              style={
                modalVideo.orientation === 'vertical'
                  ? { height: '85vh', width: 'auto', maxWidth: '100vw', borderRadius: '1rem', background: '#000' }
                  : { width: '60vw', maxWidth: 600, borderRadius: '1rem', background: '#000' }
              }
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default index