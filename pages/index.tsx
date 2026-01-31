import React, { useState } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";
import { Navigation } from "../components/Navigation/Navigation";
import useSwr from "swr";
import ReactGa from "react-ga";
import { motion, AnimatePresence } from "framer-motion";


interface indexProps {}

interface Ireply {
  id: number;
  name: string;
  userName: string;
  reply: string;
}



const locomotiveScroll =
  typeof window !== `undefined` ? require("locomotive-scroll").default : null;

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;



const fetcher = (url: any) => fetch(url).then((res) => res.json());

const index: React.FC<indexProps> = () => {


  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const { data: reviews, error } = useSwr("/api/tweets", fetcher);

  if (error) console.log(error);

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Calculate months since October 2025
  const startDate = new Date(2025, 9); // October 2025 (month is 0-indexed)
  const now = new Date();
  const months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());

  const refScroll = React.useRef(null);
  let lscroll: any;
  React.useEffect(() => {
    ReactGa.initialize("UA-177100391-3");
    ReactGa.pageview(window.location.pathname + window.location.search);

    if (!refScroll.current) return;

    // Initialize Locomotive Scroll
    lscroll = new locomotiveScroll({
      el: refScroll.current,
      smooth: true,
      reloadOnContextChange: true,
      multiplier: 0.75,
      inertia: 0.5,
    });

    // ✅ Force update after images load
    const handleLoad = () => {
      lscroll.update(); // update scroll height
    };

    window.addEventListener("load", handleLoad);

    // ✅ Fallback: trigger update after 1s (helps in case image loads don't trigger)
    setTimeout(() => {
      lscroll.update();
    }, 1000);

    // ✅ Image hover effect
    Array.from(document.querySelectorAll(".project-card__middle")).forEach(
      (el: any) => {
        const imgs: any = Array.from(el.querySelectorAll("img"));
        new hoverEffect({
          parent: el,
          intensity: 0.2,
          speedIn: el.dataset.speedin || undefined,
          speedOut: el.dataset.speedout || undefined,
          easing: el.dataset.easing || undefined,
          hover: el.dataset.hover || undefined,
          image1: imgs[0].getAttribute("src"),
          image2: imgs[1].getAttribute("src"),
          displacementImage: el.dataset.displacement,
        });
      }
    );

    // ✅ Custom cursor
    const cursor = document.querySelector(".cursor");
    window.onmousemove = (e: any) => {
      cursor?.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px;`);
    };

    return () => {
      window.removeEventListener("load", handleLoad);
      try {
        lscroll.destroy();
      } catch (e) {
        // ignore if already destroyed
      }
    };
  }, []);



React.useEffect(() => {
  if (isToggleOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}, [isToggleOpen]);

  function toggleBodyScroll(isToggleOpen: boolean) {
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    } else if (isToggleOpen === true) {
      setIsToggleOpen(false);
    }
  }
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);

// Disable body scroll when modal open
React.useEffect(() => {
  document.body.style.overflow = selectedExperience !== null ? "hidden" : "";
}, [selectedExperience]);

const ExperienceDetail: React.FC<{ selected: number | null; onClose: () => void }> = ({
  selected,
  onClose,
}) => {
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);

  // Close on ESC
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (selected !== null) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selected]);

  // Focus close button when opened
  React.useEffect(() => {
    if (selected !== null) {
      setTimeout(() => closeBtnRef.current?.focus(), 80);
    }
  }, [selected]);

  const details = [
    {
      role: "Accenture Roles",
      company: "Accenture",
      duration: "Feb 2025 – Present",
      bullets: [
        "Software Engineer: Working on Enterprise EHS and Risk Management applications.",
        "Associate Software Engineer: Developed UI components for Fiori applications.",
        "App Developer Intern: Assisted in testing SAP ABAP reports and integration workflows.",
      ],
      timeline: [
        { date: "Jan 2026", title: "Software Engineer", desc: "Current role - Working on Enterprise EHS and Risk Management applications, creating Power BI dashboards and reducing defects by ~25%." },
        { date: "Apr 2024", title: "Associate Software Engineer", desc: "Worked on Enablon-based EHS solutions, developing UI components for Fiori applications and collaborating with backend teams." },
        { date: "Feb 2025", title: "App Developer Intern", desc: "Assisted in developing and testing SAP ABAP reports and Fiori applications, learning enterprise-level SAP modules." },
        { date: "Jun 2025", title: "Intern Completion", desc: "Completed intern program with hands-on experience in enterprise-level SAP modules and integration workflows." },
      ],
    },
    {
      role: "Backend Developer Intern",
      company: "NullClass Private Ltd",
      duration: "May 2023 – Jul 2023",
      bullets: [
        "Optimized backend APIs to decrease page loading time.",
        "Integrated modern UI tools and assisted frontend teams.",
      ],
    },
  ];

  const item = selected !== null ? details[selected] : null;

  // Timeline animation variants
  const timelineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <AnimatePresence>
      {selected !== null && item && (
        <motion.div
          className="fixed inset-0 bg-white backdrop-blur-sm flex justify-center items-center z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-[90%] max-w-2xl p-6 rounded-2xl bg-white border border-gray-200 shadow-2xl text-white overflow-y-auto max-h-[85vh]"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="absolute top-4 right-5 w-8 h-8 flex items-center justify-center rounded-full ext-xl font-bold transition-all"
              aria-label="Close detail"
            >
              ✕
            </button>

            {/* Header */}
            <h2 className="text-2xl font-semibold mb-2">
              {item.role} — {item.company}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{item.duration}</p>

            {/* Timeline or Bullets */}
            {selected === 0 && (item as any).timeline ? (
              <motion.ol
                className="timeline-list border-l-2 border-gray-300 pl-4 space-y-6"
                initial="hidden"
                animate="visible"
              >
                {(item as any).timeline.map((t: any, i: number) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={timelineVariants}
                    className="relative mb-4"
                  >
                    <div className="absolute -left-3 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="font-semibold text-gray-800">{t.date}</div>
                    <div className="text-lg font-bold mt-1 ">{t.title}</div>
                    <div className="text-gray-700 text-sm">{t.desc}</div>
                  </motion.li>
                ))}
              </motion.ol>
            ) : (
              <ul className="list-disc list-inside space-y-2">
                {item.bullets.map((b: string, i: number) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={timelineVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-3 text-gray-700"
                  >
                    {b}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

  return (
    <>
      <div id="menu-target" data-scroll-container ref={refScroll}>
        <Head>
          <link rel="icon" href="svg/favicon.svg" />
          <link href="#" rel="canonical" />
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>Aravinth PM — Full Stack Developer & Creative Technologist</title>
          <meta
            name="description"
            content="I'm a self-taught Front End Developer and turning ideas into real life products is my calling."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Aravinth PM &mdash; Full Stack Developer"
          />
          <meta property="og:url" content="https://aravinthpm.vercel.app/" />
          <meta property="og:image" content="webp/preview-image.png" />
          <meta
            property="og:description"
            content="I'm a self-taught Front End Developer and turning ideas into real life products is my calling."
          />
          <meta
            name="twitter:title"
            content="Aravinth PM &mdash; Full Stack Developer"
          />
          <meta
            name="twitter:description"
            content="I'm a self-taught Front End Developer and turning ideas into real life products is my calling."
          />
          <meta name="twitter:image" content="webp/preview-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://aravinthpm.vercel.app/" />
        </Head>
        
        
        <div className="cursor"></div>
        <Navigation
          isOpen={isToggleOpen}
          toggleOpen={() => toggleBodyScroll(isToggleOpen)}
        />
        <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero--heading">
                
                <span>Hi, I'm </span>
                <span className="header__hero--heading-gradient">
                  Aravinth{" "}
                </span>
                <br />
                <span>Turning ideas into </span> <br/>
                <span>products with code.</span>

              </div>
              <a
                data-scroll-to
                className="header__hero--cta"
                href="#sectionProjects"
              >
                EXPLORE WORKS
              </a>
            </div>
          </header>
          <div className="header__footer">
            <div className="header__footer--left">
              
            </div>
            <div className="header__footer--right">
              <a
                href="https://github.com/aravinthpm77"
                rel="noopener"
                target="_blank"
              >
                👾 Github
              </a>
              
              <a
                href="https://www.linkedin.com/in/aravinth-pm-5359071b7/"
                rel="noopener"
                target="_blank"
              >
                💼 LinkedIN
              </a>
              <a
                href="https://www.instagram.com/itz.arvinth/"
                rel="noopener"
                target="_blank"
              >
                {" "}
                📸 Instagram
              </a>
              <a
                href="/resume.pdf"
                rel="noopener"
                target="_blank"
               
                
              >
                📄 Resume
              </a>
            </div>
          </div>
        </div>
        <main className="container">
          <section className="section-about">
            <h1 className="heading-1">
              <span>About Me</span>
            </h1>
            <p className="about-text">
              Hello stranger! My name is Aravinth PM and I build full-stack web projects that solve 
              real problems.<br/>
              I specialize in creating fast, responsive, and scalable applications using 
              technologies like React.js, Next.js, Node.js, and Tailwind CSS. 
              While I’m confident working across the full stack, I have a particular passion 
              for crafting smooth frontend experiences and building responsive, performance-optimized 
              interfaces.<br /><br/>
              I enjoy breaking down complex problems, optimizing workflows, and continuously learning 
              new tools to stay at the edge of modern web development. I'm also experienced with animation 
              libraries like Framer Motion and have integrated secure payment gateways and database solutions
              in multiple projects.<br /><br/>
              Outside of tech, I’m someone who thrives on creativity. My interests span video editing, dance and exploring the world of visual design. Whether it’s editing showreels or contributing to creative collaborations, I love expressing ideas that go beyond code.
              Feel free to browse through my work or connect with me to explore what we can build together.
            </p>
            <p className="resume-link">
              Check out my <a href="/resume.pdf" target="_blank" rel="noopener">resume</a> to know more about my technical skillsets.
            </p>
          </section>
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>What I Do & Know</span> 
            </h1>
            <p className="paragraph">
              Technologies and skills I’ve applied in real-world development and creative projects.
            </p>

            <div className="project-card"
              onClick={() => handleNavigation("/services/web")}
              style={{ cursor: "pointer" }}>
              <div className="project-card__left">
                <h4 className="heading-4">
                  REACT JS, NODE JS, FRAMER MOTION, TAILWIND CSS, EXPRESS JS
                </h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="/img/web-1.jpg" alt="alexxandria model" />
                <img src="/img/web-2.jpg" alt="alexxandria logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="alexxandria-anim"
                  className="heading-2"
                >
                  WEB & APP
                  <br /> DEVELOPMENT
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  href="/services/web"
                  className="project-card__link"
                >
                  CHECK THE SERVICE
                </a>
                <div className="project-card__socials">
                  <a href="#">
                    <img src="svg/dribble.svg" alt="dribble icon" />
                  </a>
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://github.com/aravinthpm77"
                  >
                    <img src="svg/github.svg" alt="github icon" />
                  </a>
                </div>
              </div>
            </div>

<div className="project-card"
              onClick={() => handleNavigation("/services/video")}
              style={{ cursor: "pointer" }}>
              <div className="project-card__left">
                <h4 className="heading-4">AFTER EFFECTS, PREMIER PRO, FINAL CUT</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="webp/adeola-1.webp" alt="adeola model" />
                <img src="/img/video-2.jpg" alt="adeola logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="adeola-anim"
                  className="heading-2"
                >
                  VIDEO EDITING
                  <br /> & ANIMATION
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://www.fiverr.com/s/0bjj38a"
                  className="project-card__link"
                >
                  CHECK OUT SERVICE
                </a>
                <div className="project-card__socials">
                  <a
                    rel="noopener"
                    target="_blank"
                    href="#"
                  >
                    <img src="svg/dribble.svg" alt="dribble icon" />
                  </a>
                  
                </div>
              </div>
            </div> 
          </section>
          <section
            data-scroll
            data-scroll-offset="55%"
            data-scroll-repeat={true}
            data-scroll-class="section-reviews__bg"
            className="section-reviews"
          >
            <div className="section-reviews__top">
              <h1 className="heading-1">
                <span>Mmmm, a little brag </span> <small>😊</small>
              </h1>
              <p className="paragraph paragraph__sub">
                What people are saying about my works
              </p>
            </div>
            <div className="section-reviews__bottom">
              <div className="section-reviews__bottom-wrapper review-card__anim1">
                {reviews?.data.map((review: Ireply) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card__top">
                      <div className="review-card__top--left">
                        <p className="review-card__p">{review.name}</p>
                        <h3 className="review-card__h3">{review.userName}</h3>
                      </div>
                      <div className="review-card__top--right">
                        <img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/twitterx--v1.png" alt="twitter icon" />
                      </div>
                    </div>
                    <div className="review-card__bottom">
                      <h2 className="review-card__h2">{review.reply}</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section-reviews__bottom-wrapper review-card__anim2">
                {reviews?.data.sort().map((review: Ireply) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card__top">
                      <div className="review-card__top--left">
                        <p className="review-card__p">{review.name}</p>
                        <h3 className="review-card__h3">{review.userName}</h3>
                      </div>
                      <div className="review-card__top--right">
                        <img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/twitterx--v1.png" alt="twitter icon" />
                      </div>
                    </div>
                    <div className="review-card__bottom">
                      <h2 className="review-card__h2">{review.reply}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="section-experience">
            <h1 className="heading-1">
              <span>My Experience</span>
            </h1>
            <p className="paragraph">Here’s a quick look at where I’ve worked.</p>
            <div className="experience-list">

              {/* Accenture Card - Multiple roles */}
              <div
                className="experience-card cursor-pointer bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-all duration-300 border border-white/10 hover:border-white/30 p-6 rounded-xl shadow-lg"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedExperience(0)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedExperience(0)}
              >
                <h3 className="experience-company text-lg font-semibold mb-6">Accenture</h3>
                <div className="experience-timeline">
                  <div className="experience-timeline-item">
                    <div className="experience-timeline-marker"></div>
                    <div className="experience-timeline-content">
                      <h2 className="experience-role">Associate Software Engineer</h2>
                      <p className="experience-duration text-sm text-white/60">Oct 2025 - Present . {months +1} mos</p>
                      <p className="experience-description mt-2">
                        Worked on Enablon-based EHS and Risk Management applications, creating Power BI dashboards and reducing reported defects by ~25% through testing and fixes.
                      </p>
                    </div>
                  </div>

                  {/* Role 3 - Intern */}
                  <div className="experience-timeline-item">
                    <div className="experience-timeline-marker"></div>
                    <div className="experience-timeline-content">
                      <h3 className="experience-role">App Developer Intern</h3>
                      <p className="experience-duration text-sm text-white/60">Feb 2025 - Jun 2025 · 5 mos</p>
                      <p className="experience-description mt-2">
                        Assisted in developing and testing SAP ABAP reports and Fiori applications, gaining hands-on experience in enterprise-level SAP modules and integration workflows.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* NullClass Card */}
              <div
                className="experience-card cursor-pointer bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-all duration-300 border border-white/10 hover:border-white/30 p-6 rounded-xl shadow-lg"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedExperience(1)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedExperience(1)}
              >
                <h3 className="experience-company text-lg font-semibold">NullClass Private Ltd</h3>
                <h3 className="experience-role mt-4">Backend Developer Intern</h3>
                <p className="experience-duration text-sm text-white/60">May 2023 - Jul 2023 · 3 mos</p>
                <p className="experience-description mt-2">
                  Decreased page loading time by optimizing backend APIs. Analyzed performance and integrated modern UI tools like Framer.
                </p>
              </div>
            </div>

            {/* Modal for selected experience */}
            <ExperienceDetail selected={selectedExperience} onClose={() => setSelectedExperience(null)} />
          </section>

           <section className="section-socials">
            <h1 className="heading-1">
              <span>Dont be a stranger!</span> 
            </h1>
            <p className="paragraph">Connect with me online</p>
            <div className="section-socials--links">
              <a
                href="https://github.com/aravinthpm77"
                rel="noopener"
                target="_blank"
              >
                👾 GitHub
              </a>
              
              <a
                href="https://www.linkedin.com/in/aravinth-pm-5359071b7/"
                rel="noopener"
                target="_blank"
              >
                💼 LinkedIn
              </a>
              <a
                href="https://www.instagram.com/itz.arvinth/"
                rel="noopener"
                target="_blank"
              >
                📸 Instagram
              </a>
              <a
                href="/resume.pdf"
                rel="noopener"
                target="_blank"
               
                
              >
                📄 Resume
              </a>
            </div>
          </section>
          <section className="section-contact">
            
            <h2 className="section-contact__h2">
              Thanks for visiting! I’m open to new opportunities and excited to work with 
              creative designers and developers. <br />
              If you believe I’d be a great fit for your project, let’s connect—send me an
              <a
                href="mailto:aravinth7703@gmail.com"
                rel="noopener"
                target="_blank"
              >
                &nbsp; email 📧
              </a>
              .
            </h2>
          </section>
         
        </main>
        <footer className="footer">
          <img
            src="svg/adeola-logo-left.svg"
            alt="logo"
          />
          <div className="footer__info" >
            <p>
              <strong>Aravinth PM</strong>
            </p>
          </div>
          <div className="footer__socials">
            <a
              href="https://www.linkedin.com/in/aravinth-pm-5359071b7/"
              target="_blank"
              rel="noopener"
            >
              <img src="svg/dribble.svg" alt="dribble logo" />
            </a>
            <a
              href="https://github.com/aravinthpm77"
              target="_blank"
              rel="noopener"
            >
              <img src="svg/github.svg" alt="github logo" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;
