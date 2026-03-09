import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Banner from "./components/Banner/Banner";
import Banner2 from "./components/Banner/Banner2";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import JobDetection from "./components/JobDetection/JobDetection";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services";
import Testimonial from "./components/Testimonial/Testimonial";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <Banner />
      <Banner2 />
      <Testimonial />
    </>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <main className="overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobdetection" element={<JobDetection />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
