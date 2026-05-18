"use client";

import { Cpu, Layers } from "lucide-react";
import { motion } from "framer-motion";

const skillsCategories = [
  {
    title: "Programming Languages",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
      { name: "JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
      { name: "PHP", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" },
      { name: "C#", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg" },
      { name: "Dart", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg" },
      { name: "C++", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" },
    ]
  },
  {
    title: "Web Development",
    color: "from-fuchsia-500 to-pink-500",
    skills: [
      { name: "HTML5", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" },
      { name: "React", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Bootstrap", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" },
      { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
      { name: "CodeIgniter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg" },
      { name: "Streamlit", icon: "https://streamlit.io/images/brand/streamlit-mark-color.svg" },
    ]
  },
  {
    title: "AI/ML & Data Science",
    color: "from-emerald-500 to-teal-500",
    skills: [
      { name: "TensorFlow", icon: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg" },
      { name: "Scikit-learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "Keras", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/keras/keras-original.svg" },
      { name: "Pandas", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg" },
      { name: "NumPy", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg" },
      { name: "Matplotlib", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/matplotlib/matplotlib-original.svg" },
      { name: "Jupyter", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original.svg" },
    ]
  },
  {
    title: "Mobile Development",
    color: "from-indigo-500 to-purple-500",
    skills: [
      { name: "Flutter", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg" },
      { name: "Kotlin", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kotlin/kotlin-original.svg" },
      { name: "Java", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" },
    ]
  },
  {
    title: "Database",
    color: "from-amber-500 to-orange-500",
    skills: [
      { name: "MySQL", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" },
      { name: "Oracle", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg" },
    ]
  },
  {
    title: "Design Tools",
    color: "from-rose-500 to-red-500",
    skills: [
      { name: "Photoshop", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-original.svg" },
      { name: "Adobe XD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-original.svg" },
      { name: "Figma", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg" },
    ]
  },
  {
    title: "Game Development",
    color: "from-violet-500 to-fuchsia-500",
    skills: [
      { name: "Unity", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/unity/unity-original.svg" },
      { name: "Blender", icon: "https://download.blender.org/branding/community/blender_community_badge_white.svg" },
    ]
  },
  {
    title: "Tools & Others",
    color: "from-slate-400 to-slate-600",
    skills: [
      { name: "Git", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
      { name: "Webpack", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/webpack/webpack-original.svg" },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function TechStack() {
  return (
    <section id="tech-stack" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-brand-950/10 to-[#06060a] pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

      <div className="container-max mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-6 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            Vast Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Tech Arsenal</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            I leverage a massive ecosystem of modern languages, frameworks, and tools to architect solutions that solve any engineering challenge.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {skillsCategories.map((category) => (
            <motion.div
              variants={itemVariants}
              key={category.title}
              className="group glass rounded-3xl p-6 border border-white/[0.04] hover:bg-white/[0.02] transition-colors overflow-hidden relative"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${category.color} opacity-80`} />
                <h3 className="text-lg font-bold text-white tracking-tight">{category.title}</h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-4 gap-4">
                {category.skills.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="flex flex-col items-center justify-center gap-2 group/skill"
                    title={skill.name}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover/skill:bg-white/[0.08] group-hover/skill:border-white/[0.1] group-hover/skill:scale-110 group-hover/skill:-translate-y-1 transition-all duration-300">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-6 h-6 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[9px] font-medium text-slate-500 group-hover/skill:text-slate-300 transition-colors text-center truncate w-full">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
