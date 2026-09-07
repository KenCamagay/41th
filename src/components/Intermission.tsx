"use client";

import { motion } from "motion/react";
import GrowingDoodle from "@/components/GrowingDoodle";

const stats = [
  {
    value: "41",
    label: "months",
  },
  {
    value: "01",
    label: "us",
  },
  {
    value: "∞",
    label: "little moments",
  },
  {
    value: "...",
    label: "still counting",
  },
];

export default function Intermission() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">
        {/* Top line */}
        <div className="flex items-center gap-5">
          <span className="chapter-label whitespace-nowrap text-black/40">
            intermission
          </span>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }}
            transition={{
              duration: 1.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="h-px flex-1 bg-black/30"
          />
        </div>

        {/* Large statement */}
        <div className="relative py-28 text-center md:py-40">
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
            }}
            className="chapter-label mb-7 text-black/35"
          >
            somehow, it&apos;s already been
          </motion.p>

          <motion.div
            initial={{
                opacity: 0,
                scale: 0.93,
            }}
            whileInView={{
                opacity: 1,
                scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10"
            >
            <span className="font-display block text-[clamp(10rem,27vw,23rem)] font-light leading-[0.55] tracking-[-0.08em]">
              41
            </span>

            <span className="chapter-label mt-10 block text-black/45">
              months
            </span>
          </motion.div>

         {/* Hand-drawn heart */}
          <motion.div
            animate={{
              scale: [1, 1.045, 1, 1.025, 1, 1],
            }}
            transition={{
              duration: 1.55,
              times: [0, 0.12, 0.24, 0.36, 0.48, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: "center",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[61%]
              w-[360px]
              -translate-x-1/2
              -translate-y-1/2
              md:w-[510px]
            "
          >
            <svg
              viewBox="0 0 600 520"
              fill="none"
              className="h-full w-full"
            >
              <motion.path
                d="
                  M300 445
                  C270 416 89 298 89 164
                  C89 88 143 49 202 55
                  C252 60 284 91 301 129
                  C320 88 353 59 401 55
                  C462 49 511 91 511 164
                  C511 294 333 414 300 445
                "
                stroke="#7a263a"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 0.42,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 2.3,
                  delay: 0.35,
                  ease: "easeInOut",
                }}
              />

              {/* Second imperfect sketch stroke */}
              <motion.path
                d="
                  M301 447
                  C267 412 100 294 99 166
                  C98 101 145 61 203 65
                  C251 68 282 100 301 137
                  C321 99 355 68 401 65
                  C457 60 501 101 500 166
                  C498 290 335 410 301 447
                "
                stroke="#7a263a"
                strokeWidth="0.65"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                whileInView={{
                  pathLength: 1,
                  opacity: 0.18,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 2.6,
                  delay: 0.55,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-2 border-y border-black/20 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              className="relative px-4 py-10 text-center md:py-14"
            >
              {index !== 0 && (
                <div className="absolute left-0 top-[20%] hidden h-[60%] w-px bg-black/15 md:block" />
              )}

              <p className="font-display text-5xl font-light md:text-6xl">
                {stat.value}
              </p>

              <p className="chapter-label mt-3 text-black/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Small ending line */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
            duration: 1,
          }}
          className="font-display mx-auto mt-20 max-w-xl text-center text-2xl italic leading-9 text-black/55 md:text-3xl"
        >
          and somehow, I still don&apos;t think we&apos;re anywhere near the
          good part yet.
        </motion.p>
      </div>
      <GrowingDoodle
        stage={3}
        className="bottom-[5%] right-[6%] h-32 w-28 opacity-30 md:h-40 md:w-32"
      />

    </section>
  );
}