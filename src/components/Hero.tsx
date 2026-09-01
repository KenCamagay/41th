"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import GrowingDoodle from "@/components/GrowingDoodle";

export default function Hero() {
  const goToStory = () => {
    document.getElementById("story")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10 md:px-12">
      {/* Outer manga/editorial frame */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="pointer-events-none absolute inset-4 border border-black/25 md:inset-7"
      />

      {/* Top left label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute left-8 top-8 md:left-12 md:top-11"
      >
        <p className="chapter-label text-black/55">
          private edition
        </p>
      </motion.div>

      {/* Vertical side text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="vertical-text chapter-label absolute right-8 top-1/2 hidden -translate-y-1/2 md:block"
      >
        you + me / still ongoing
      </motion.p>

     {/* Curvy hand-drawn K & R */}
<svg
  className="
    pointer-events-none
    absolute
    left-[5%]
    top-[19%]
    h-28
    w-44
    md:h-40
    md:w-60
  "
  viewBox="0 0 320 190"
  fill="none"
>
  {/* K - main flowing stroke */}
  <motion.path
    d="
      M58 34
      C52 62 52 102 57 153

      M58 96
      C75 79 95 61 115 47

      M59 97
      C79 109 98 129 118 151
    "
    stroke="#171717"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.48 }}
    transition={{
      duration: 1.7,
      delay: 0.9,
      ease: "easeInOut",
    }}
  />

  {/* Curved ampersand */}
  <motion.path
    d="
      M145 78
      C156 59 181 57 185 72
      C189 89 164 101 153 114
      C142 127 148 145 166 147
      C184 149 200 134 205 115

      M151 87
      C161 104 178 124 204 146
    "
    stroke="#7a263a"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.42 }}
    transition={{
      duration: 1.5,
      delay: 2.4,
      ease: "easeInOut",
    }}
  />

  {/* R - flowing loop */}
  <motion.path
    d="
      M232 40
      C228 71 229 112 234 153

      M233 42
      C258 32 286 38 286 62
      C286 85 263 96 234 92

      M247 93
      C263 112 278 132 294 151
    "
    stroke="#171717"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.48 }}
    transition={{
      duration: 1.8,
      delay: 3.2,
      ease: "easeInOut",
    }}
  />

  {/* Loose signature underline */}
  <motion.path
    d="
      M41 158
      C96 167 158 166 212 162
      C251 159 280 162 305 157
    "
    stroke="#171717"
    strokeWidth="0.8"
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.18 }}
    transition={{
      duration: 1.4,
      delay: 5,
      ease: "easeInOut",
    }}
  />
</svg>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="chapter-label mb-5 text-black/55"
        >
          chapter
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.4,
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-display text-[clamp(8rem,23vw,18rem)] font-light leading-[0.65] tracking-[-0.06em]"
        >
          41
        </motion.h1>

        {/* Drawn underline */}
        <svg
          viewBox="0 0 500 50"
          className="mx-auto mt-6 w-[250px] md:w-[380px]"
          fill="none"
        >
          <motion.path
            d="M8 30C92 22 173 32 257 25C336 18 400 25 491 18"
            stroke="#171717"
            strokeWidth="1.3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.5,
              delay: 1.2,
              ease: "easeInOut",
            }}
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9 }}
          className="mt-7"
        >
          <p className="font-display text-2xl italic text-black/75 md:text-3xl">
            another chapter has been waiting for you.
          </p>

          <p className="mx-auto mt-4 max-w-md text-xs leading-6 tracking-wide text-black/45 md:text-sm">
            Some stories are written in ink.
            <br />
            I think ours is written in little moments.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 1 }}
          onClick={goToStory}
          className="group mx-auto mt-12 flex cursor-pointer flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-black/55 transition hover:text-black"
        >
          begin

          <ArrowDown
            size={15}
            strokeWidth={1}
            className="transition-transform duration-300 group-hover:translate-y-1.5"
          />
        </motion.button>
      </div>

      {/* Bottom left */}
      <p className="chapter-label absolute bottom-9 left-8 text-black/35 md:left-12">
        vol. 01
      </p>

      {/* Bottom right */}
      <p className="chapter-label absolute bottom-9 right-8 text-black/35 md:right-12">
        41 months
      </p>
      <GrowingDoodle
        stage={1}
        className="bottom-[7%] right-[7%] h-20 w-16 opacity-30 md:h-28 md:w-24"
      />
    </section>
  );
}