import React, { useState } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";
import { cubicBezier } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import useSwr from "swr";
import ReactGa from "react-ga";

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
    lscroll.destroy();
  };
}, []);




  function toggleBodyScroll(isToggleOpen: boolean) {
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    } else if (isToggleOpen === true) {
      setIsToggleOpen(false);
    }
  }

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
          <title>Aravinth PM &mdash; Full Stack Developer</title>
          <meta
            name="description"
            content="I'm a self-taught Front End Developer and turning ideas into real life products is my calling."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Aravinth PM &mdash; Full Stack Developer"
          />
          <meta property="og:url" content="https://adeolaadeoti.xyz/" />
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
          <meta name="twitter:url" content="https://adeolaadeoti.xyz/" />
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
                VIEW SERVICES
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
            </div>
          </div>
        </div>
        <main className="container">
          <p className="about-text">
            Hello stranger! 👋, my name is Aravinth PM and I build full-stack web projects <br/> that solve real problems.
Alongside, I freelance in video editing to bring ideas to life visually.
          </p>
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>Services I Offer </span> <small>💼</small>
            </h1>
            <p className="paragraph">
              Yeah, I work Hard. Here are some of the services I Offer.
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

            <div className="project-card">
              <div className="project-card__left">
                <h4 className="heading-4">PHOTOSHOP, FIGMA, ILLUSTRATOR, CANVA</h4>
              </div>
              <div
                className="project-card__middle"
                data-displacement="webp/myDistorsionImage.webp"
              >
                <img src="img/graphic-1.jpg" alt="graphic" />
                <img src="img/graphic-2.jpg" alt="graphic logo" />
              </div>
              <div className="project-card__right">
                <h2
                  data-scroll
                  data-scroll-offset="35%"
                  data-scroll-repeat={true}
                  data-scroll-class="safarika-anim"
                  className="heading-2"
                >
                  GRAPHIC 
                  <br /> & DESIGN
                </h2>
                <a
                  rel="noopener"
                  target="_blank"
                  href="https://github.com/aravinthpm77"
                  className="project-card__link"
                >
                  CHECK THE SERVICE
                </a>
                <div className="project-card__socials">
                  <a
                    rel="noopener"
                    target="_blank"
                    href="https://www.fiverr.com/s/0bjj38a"
                  >
                    <img src="svg/dribble.svg" alt="dribble icon" />
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
                What people are saying about my last portfolio
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
                        <img src="svg/twitter.svg" alt="twitter icon" />
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
                        <img src="svg/twitter.svg" alt="twitter icon" />
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
              <span>My Experience</span> <small>🚀</small>
            </h1>
            <p className="paragraph">Here’s a quick look at where I’ve worked.</p>
            <div className="experience-list">
              <div className="experience-card">
                <h3 className="experience-role">App Developer Intern</h3>
                <p className="experience-company">Accenture</p>
                <p className="experience-duration">Feb 2025 – Jun 2025</p>
                <p className="experience-description">
                  Assisted in developing and testing SAP ABAP reports and Fiori applications, gaining hands-on experience in enterprise-level SAP modules and integration workflows. </p>
              </div>

              <div className="experience-card">
                <h3 className="experience-role">Backend Developer Intern</h3>
                <p className="experience-company">NullClass Private Ltd</p>
                <p className="experience-duration">May 2023 – Jul 2023</p>
                <p className="experience-description">
                  Decreased page loading time by optimizing backend APIs. Analyzed performance and integrated modern UI tools like Framer.
                </p>
              </div>

              

              
            </div>
          </section>

           <section className="section-socials">
            <h1 className="heading-1">
              <span>Dont be a stranger!</span> <small>👋</small>
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
            </div>
          </section>
          <section className="section-contact">
            <h1 className="heading-1">
              <span>Sold Yet? </span> <small>🤙</small>
            </h1>
            <h2 className="section-contact__h2">
              Thanks for stopping by, I’m currently looking to join a new team
              of creative designers and developers. If you think we might be a
              good fit for one another, send me an
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
            src="svg/adeola-logo-footer.svg"
            alt="design and devloped by adeola"
          />
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
