// Copyright Sheharyar Abid
// Project: folio
// Inspired by Ayush Singh's original animation style
// Licensed under the MIT License
// License text available at https://opensource.org/licenses/MIT

import { gsap, Linear } from "gsap";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const SkillsSection = () => {
  const skillRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  const [willChange, setWillChange] = useState(false);

  const initSkillsAnimation = (
    skillRef: MutableRefObject<HTMLDivElement>,
    targetSection: MutableRefObject<HTMLDivElement>
  ): ScrollTrigger => {
    const timeline = gsap.timeline({
      defaults: { ease: Linear.easeNone, duration: 0.3 },
    });

    const skillGroups = skillRef.current.querySelectorAll(".skill-item");
    skillGroups.forEach((group, index) => {
      timeline.fromTo(
        group,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4 },
        index * 0.15
      );
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center 80%",
      end: "center top",
      scrub: 0,
      animation: timeline,
      onToggle: (self) => setWillChange(self.isActive),
    });
    return scrollTriggerInstance;
  };

  useEffect(() => {
    const skillsScrollTriggerInstance = initSkillsAnimation(
      skillRef,
      targetSection
    );
    return skillsScrollTriggerInstance.kill;
  }, [skillRef, targetSection]);

const skills = [
  {
    name: "Angular",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",
  },
  {
    name: "React",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    name: "TypeScript",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
  },
  {
    name: "JavaScript",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  },
  {
    name: "HTML / CSS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg",
  },
  {
    name: "TailwindCSS",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "Bootstrap",
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg",
  },
  {
    name: "Node.js",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  },
  {
    name: ".NET",
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/ee/.NET_Core_Logo.svg",
  },
  {
    name: "SQL",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png",
  },
];

  const renderSkills = (): React.ReactNode => (
    <div
      ref={skillRef}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center text-center"
    >
      {skills.map((skill, index) => (
        <div
          key={index}
          className={`skill-item flex items-center gap-4 px-6 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg hover:scale-105 transition-transform ${
            willChange ? "will-change-transform will-change-opacity" : ""
          }`}
        >
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-14 h-14 object-contain"
            loading="lazy"
          />
          <div className="text-lg sm:text-xl font-medium">{skill.name}</div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      className={`tall:pt-20 tall:pb-16 pt-40 pb-24 w-full relative select-none section-container text-center`}
      ref={targetSection}
    >
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-14">
        Technical Skills
      </h2>
      {renderSkills()}
    </section>
  );
};

export default SkillsSection;
