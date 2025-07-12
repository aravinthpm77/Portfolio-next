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


  
const skills = [
  { src: 'https://img.icons8.com/color/96/react-native.png', label: 'React' },
  { src: 'https://img.icons8.com/color/96/tailwind_css.png', label: 'Tailwind CSS' },
  { src: 'https://img.icons8.com/color/96/nodejs.png', label: 'Node.js' },
  { src: 'https://img.icons8.com/color/96/nextjs.png', label: 'Next.js' },
  { src: 'https://img.icons8.com/color/96/vue-js.png', label: 'Vue.js' },
  { src: 'https://img.icons8.com/ios/50/express-js.png', label: 'Express' },
  { src: 'https://img.icons8.com/color/96/mongodb.png', label: 'MongoDB' },
  { src: 'https://img.icons8.com/color/96/mysql-logo.png', label: 'MySQL' },
  { src: 'https://img.icons8.com/color/96/html-5--v1.png', label: 'HTML' },
  { src: 'https://img.icons8.com/color/96/css3.png', label: 'CSS' },
  { src: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg', label: 'Framer Motion' },
  { src: 'https://img.icons8.com/color/96/javascript--v1.png', label: 'JavaScript' },
  { src: 'https://img.icons8.com/color/96/php.png', label: 'PHP' },
  { src: 'https://img.icons8.com/color/96/sass.png', label: 'SCSS' },
];
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
        <title>Aravinth - Services - Web</title>
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
              Building fast, <br />
              scalable websites that speak your vision

. 
            </motion.h4>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.6, ...transition } }}
              className='hero-h1'>
              Web Works
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6, ...transition } }}
              className='home-hero__footer'>
              <a href="https://github.com/aravinthpm77" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <img src="/img/github.png" alt="GitHub" style={{ width: '32px', marginRight: '1.5rem' }} />
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
            <motion.div
              className="feature"
              key={0}
              variants={sectionVariants}
            >
              <img src='https://img.icons8.com/parakeet-line/192/code.png' alt='face icon' />
              <h2 className='heading-2'>
                Code<br />
                Craft
              </h2>
              <p className='paragraph'>
              I build clean, scalable, and efficient web applications tailored to your needs. Using modern technologies like React.js, Next.js, Node.js, and Tailwind CSS, I turn ideas into interactive, seamless user experiences that work flawlessly across devices.
              </p>
            </motion.div>
            <motion.div
              className="feature"
              key={1}
              variants={sectionVariants}
            >
              <img src='https://img.icons8.com/pulsar-line/192/fast-delivery.png' alt='eye icon' />
              <h2 className='heading-2'>
                Project<br />
                Power 
              </h2>
              <p className='paragraph'>
               From simple landing pages to complex full-stack apps, I have hands-on experience delivering projects on time with best practices in UI/UX, performance, and security. Each project reflects my commitment to quality and innovation.
              </p>
            </motion.div>
            <motion.div
              className="feature"
              key={2}
              variants={sectionVariants}
            >
              <img  src="https://img.icons8.com/external-tal-revivo-light-tal-revivo/192/external-sellcast-the-first-video-marketplace-to-fully-integrate-and-utilize-the-power-of-live-video-logo-light-tal-revivo.png" alt="external-sellcast-the-first-video-marketplace-to-fully-integrate-and-utilize-the-power-of-live-video-logo-light-tal-revivo"/>
              <h2 className='heading-2'>
                Speed &<br/>
                Performance
                </h2>
              <p className='paragraph'>
                Optimized loading times and smooth interactions are my priorities. I leverage cutting-edge techniques like server-side rendering and code-splitting to ensure your website is fast and responsive, giving users the best experience possible.
              </p>
            </motion.div>
            <motion.div
              className="feature"
              key={3}
              variants={sectionVariants}
            >
              <img src="https://img.icons8.com/pulsar-line/192/private2.png" alt='smart icon' />
              <h2 className='heading-2'>
                Secure &<br />
                Reliable
              </h2>
              <p className='paragraph'>
                Security is baked into every line of code I write. From authentication and authorization to data protection, I build websites and apps that safeguard your users and data, ensuring trust and peace of mind.
              </p>
            </motion.div>
            <motion.div
              className="feature"
              key={4}
              variants={sectionVariants}
            >
              <img  src="https://img.icons8.com/pulsar-line/192/media-queries.png" alt='wifi icon' />
              <h2 className='heading-2'>
                Responsive  <br />
                Design
              </h2>
              <p className='paragraph'>
                Your website will look stunning on any device. I specialize in creating mobile-first, fully responsive designs using Tailwind CSS and modern CSS techniques so that your content shines on smartphones, tablets, and desktops alike.
              </p>
            </motion.div>
            <motion.div
              className="feature"
              key={5}
              variants={sectionVariants}
            >
              <img src='https://img.icons8.com/material-outlined/192/installing-updates.png' alt='door icon' />
              <h2 className='heading-2'>
                Continuous<br />
                 Growth
              </h2>
              <p className='paragraph'>
               Technology never stands still, and neither do I. I’m always learning new tools and frameworks to keep your projects on the cutting edge, so you get innovative solutions that scale and evolve with your business.
              </p>
            </motion.div>
          </motion.div>
        </section>
      
        <section data-scroll-section id='sectionGallery' className='section-gallery'>
          <div className='gallery-container'>
            <h2 className='heading-2'>
              Where Comfort<br /> Meets Design
            </h2>
            <div className='gallery'>
              <div className='gallery__left'>
                <div className='gallery__left--top'>
                  <a href="https://github.com/aravinthpm77/Ticket-Booking-App" target="_blank" rel="noopener noreferrer">
                    <img src='/img/booking.png' alt='villa image' />
                    <h4 className='gallery-caption'>Ticket Booking</h4>
                  </a>
                </div>
                <div className='gallery__left--bottom'>
                  <h3 className='gallery-h3'>
                    Where Comfort<br /> Meets Design
                  </h3>
                  <p className='gallery-p'>and we offer 4 of those</p>
                </div>
              </div>
              <div className='gallery__right'>
                <div className='gallery__right--top'>
                  <div className='gallery__right--top-left'>
                    <a href="https://github.com/aravinthpm77/SafeSecure" target="_blank" rel="noopener noreferrer">
                      <img src='/img/sales.png' alt='oak image' />
                      <h4 className='gallery-caption'>SafeSecure</h4>
                    </a>
                  </div>
                  <div className='gallery__right--top-right'>
                    <a href="https://github.com/aravinthpm77/Rentify" target="_blank" rel="noopener noreferrer">
                      <img src='/img/rentify.png' alt='oakville image' />
                      <h4 className='gallery-caption'>Rentify</h4>
                    </a>
                  </div>
                </div>
                <div className='gallery__right--bottom'>
                  <a href="https://github.com/aravinthpm77/SocialCommunity" target="_blank" rel="noopener noreferrer">
                    <img src='/img/social.png' alt='maple image' />
                    <h4 className='gallery-caption'>Social Community</h4>
                  </a>
                </div>
              </div>
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
                My Core <br /> Skills
              </h2>
              <p className='paragraph'>
                I specialize in building modern, scalable web applications using a robust set of technologies. Here are the tools and frameworks I use to deliver high-quality solutions:
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
                {skills.map((skill, idx) => (
                  <motion.div
                    className='skill-box'
                    key={skill.label}
                    variants={skillBoxVariants}
                    whileHover={{translateY:'-6px' , boxShadow: '0 8px 32px rgba(255,215,0,0.18)' }}
                    
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
                <a href="https://github.com/aravinthpm77" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <img src="/img/github.png" alt="GitHub" style={{ width: '32px', marginRight: '1.5rem' }} />
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
    </motion.div>
  )
}

export default index