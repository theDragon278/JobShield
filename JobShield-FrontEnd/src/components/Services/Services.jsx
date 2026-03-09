// import { motion } from "framer-motion";
import { motion } from "motion/react";
import { BiSolidDollarCircle } from "react-icons/bi";
import { FaVectorSquare } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { SlideUp } from "../../animation/animate";

const ServiceCard = [
  {
    id: 1,
    title: "Fake Job Detection",
    description:
      "Analyze job descriptions, company details, and suspicious patterns to quickly determine whether a listing is genuine or fraudulent.",
    icon: <FaVectorSquare />,
    link: "#",
    delay: 0.2,
  },
  {
    id: 2,
    title: "Risk & Red Flag Analysis",
    description:
      "Uncover warning signs such as unrealistic salaries, free email domains, and scam-like language before making an application decision.",
    icon: <FaPenToSquare />,
    link: "#",
    delay: 0.4,
  },
  {
    id: 3,
    title: "Safe Application Guidance",
    description:
      "Get clear safety suggestions and next steps so you can apply confidently while avoiding potential job scams or financial loss.",
    icon: <BiSolidDollarCircle />,
    link: "#",
    delay: 0.6,
  },
];
const Services = () => {
  return (
    <div id="about">
      <div className="container py-20">
        {/* heading title */}
        <div className="space-y-2 text-center max-w-87.5 mx-auto mb-8">
          <motion.h1
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="text-3xl font-bold font-serif"
          >
            What we provide
          </motion.h1>
        </div>
        {/* card section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ServiceCard.map((card) => {
            return (
              <motion.div
                variants={SlideUp(card.delay)}
                initial="initial"
                whileInView={"animate"}
                key={card.id}
                className="space-y-4 border border-black/30 px-6 py-12 hover:bg-black hover:text-white hover:shadow-[7px_7px_0px_0px_#6c6c6c] duration-300"
              >
                <span className="inline-block text-xl border border-black rounded-full p-3">
                  {card.icon}
                </span>
                <p className="text-2xl font-bold font-serif">{card.title}</p>
                <p className="text-gray-400 text-sm">{card.description}</p>
                <a
                  href={card.link}
                  className="inline-block border-b border-black"
                >
                  Learn More
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
