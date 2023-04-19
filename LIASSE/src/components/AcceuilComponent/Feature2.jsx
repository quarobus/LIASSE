import React, { useEffect } from "react";
import { Robot } from "../../assets";
import "./feature2.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Feature2 = () => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("vissible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  const list = {
    vissible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };
  const item1 = {
    vissible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stifness: 300,
        damping: 24,
        delay: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      x: -100,
    },
  };
  const item2 = {
    vissible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stifness: 300,
        damping: 24,
        delay: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      x: 100,
    },
  };
  return (
    <div className="app__features">
      <motion.div
        ref={ref}
        animate={control}
        variants={list}
        className="feature__container"
      >
        <motion.div variants={item2} className="left__feature">
          <img src={Robot} alt="" draggable={false} />
        </motion.div>
        <motion.div variants={item1} className="right__feature">
          <div className="right__text">
            <h1>Highly reputed University</h1>
            <h3>
             Why us? 
            </h3>
            <p>
            Our 9 year experience have allowed us to use the most innovative technologies and methodologies
            </p>
          </div>
          <div className="feature__content">
            <button>View Projects</button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Feature2;
