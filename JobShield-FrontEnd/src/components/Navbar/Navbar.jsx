// import { motion } from "framer-motion";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo1.png";

const NavLinks = [
  {
    id: 1,
    title: "About",
    link: "#about",
  },
  {
    id: 2,
    title: "Services",
    link: "#services",
  },
];
const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const handleLogoClick = (event) => {
    if (!isHome) {
      return;
    }

    event.preventDefault();
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur"
      >
        <div className="container py-6 flex items-center justify-center md:justify-between">
          {/* Logo section */}
          <Link
            to="/"
            className="flex items-center gap-3 w-full justify-center md:w-auto md:justify-start shrink-0"
            onClick={handleLogoClick}
          >
            <img src={Logo} alt="logo" className="w-12" />
            <span className="text-2xl font-bold">JobShield</span>
          </Link>
          {/* Link section */}
          {isHome && (
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              {NavLinks.map((link) => {
                return (
                  <a
                    key={link.id}
                    href={link.link}
                    className="inline-block mx-4 text-lg font-semibold"
                  >
                    {link.title}
                  </a>
                );
              })}
            </div>
          )}
          {/* Button section */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/jobdetection">
              <button className="primary-btn">Job Detection</button>
            </Link>
          </div>
        </div>
      </motion.div>
      <div className="h-24" aria-hidden="true" />
    </>
  );
};

export default Navbar;
