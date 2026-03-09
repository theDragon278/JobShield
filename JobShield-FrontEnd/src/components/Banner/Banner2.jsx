// import { motion } from "framer-motion";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { SlideUp } from "../../animation/animate";
import Banner1 from "../../assets/5.jpg";

const Banner2 = () => {
  return (
    <div>
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* text section */}
          <div className="space-y-5 flex justify-center flex-col xl:max-w-125">
            <motion.h1
              variants={SlideUp(0.2)}
              initial="initial"
              whileInView="animate"
              className="text-4xl font-bold font-serif"
            >
              Smarter Way to Verify Jobs
            </motion.h1>
            <motion.p
              variants={SlideUp(0.4)}
              initial="initial"
              whileInView="animate"
              className="text-gray-500 text-sm leading-7"
            >
              Check job authenticity, uncover hidden warning signs, and make
              confident application decisions with clear fraud-risk insights and
              safety guidance.
            </motion.p>
            <motion.div
              variants={SlideUp(0.6)}
              initial="initial"
              whileInView="animate"
              className="flex gap-3"
            >
              <div className="max-w-20 space-y-2">
                <p className="text-3xl font-bold font-serif">1000+</p>
                <p className="text-gray-500 text-sm">Job listings analyzed</p>
              </div>
              <div className="max-w-20 space-y-2">
                <p className="text-3xl font-bold font-serif">100%</p>
                <p className="text-gray-500 text-sm">Risk detection signals</p>
              </div>
              <div className="max-w-20 space-y-2">
                <p className="text-3xl font-bold font-serif">Clear</p>
                <p className="text-gray-500 text-sm">Safety guidance</p>
              </div>
            </motion.div>
            <div>
              <Link to="/jobdetection">
                <motion.button
                  variants={SlideUp(0.6)}
                  initial="initial"
                  whileInView="animate"
                  className="primary-btn bg-black text-white shadow-[5px_5px_0px_0px_#6c6c6c]"
                >
                  Try Job Detection
                </motion.button>
              </Link>
            </div>
          </div>
          {/* image section */}
          <div className="flex flex-col justify-center  ">
            <motion.img
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              src={Banner1}
              alt=""
              className="w-[95%] md:w-full mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
