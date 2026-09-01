"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { memories } from "@/data/memories";
import GrowingDoodle from "@/components/GrowingDoodle";

export default function Memories() {
  return (
    <section
      id="story"
      className="relative overflow-hidden px-6 py-28 md:px-12 md:py-44"
    >
      <div className="mx-auto max-w-7xl">
        {/* Chapter heading */}
        <div className="mb-24 md:mb-36">
          <div className="mb-8 flex items-center gap-5">
            <span className="chapter-label whitespace-nowrap text-black/45">
              chapter i
            </span>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: "left" }}
              className="h-px w-full bg-black/40"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display max-w-5xl text-[clamp(4rem,10vw,8rem)] font-light leading-[0.82] tracking-[-0.04em]"
          >
            Previously,
            <br />

            <span className="italic text-black/50">
              in our story...
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 1,
            }}
            className="mt-10 max-w-sm text-sm leading-7 text-black/45"
          >
            Not every memory needs to be extraordinary. Some of my favorites
            are simply the ones where you were there.
          </motion.p>
        </div>

        {/* Manga panels */}
        <div className="grid grid-cols-1 gap-x-7 gap-y-20 md:grid-cols-12 md:gap-y-32">
          {memories.map((memory, index) => (
            <motion.article
              key={memory.number}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 0.9,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={memory.className}
            >
              <div
                className={`group relative ${memory.height} overflow-hidden bg-black/[0.04]`}
              >
                {/* Actual photo */}
                <Image
                  src={memory.image}
                  alt={`Memory ${memory.number}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={`${memory.position} object-cover grayscale-[20%] transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0`}
                />

                {/* Printed manga overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[#f3efe7]/5 mix-blend-multiply" />

                {/* Slight vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

                {/* Border drawing */}
                <svg
                  className="pointer-events-none absolute inset-0 z-20 h-full w-full"
                  preserveAspectRatio="none"
                >
                  <motion.rect
                    x="2"
                    y="2"
                    width="calc(100% - 4px)"
                    height="calc(100% - 4px)"
                    fill="none"
                    stroke="#171717"
                    strokeWidth="1.2"
                    initial={{
                      pathLength: 0,
                    }}
                    whileInView={{
                      pathLength: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.4,
                      delay: 0.15,
                      ease: "easeInOut",
                    }}
                  />
                </svg>

                {/* Panel number */}
                <div className="absolute bottom-5 right-5 z-10">
                  <span className="font-display text-6xl italic text-white/70">
                    {memory.number}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-5 flex gap-5">
                <span className="chapter-label pt-1 text-black/35">
                  {memory.number}
                </span>

                <div>
                  <p className="font-display max-w-md text-xl italic leading-7 text-black/70 md:text-2xl">
                    {memory.caption}
                  </p>

                  <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-[#7a263a]/65">
                    ↳ {memory.note}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <GrowingDoodle
        stage={2}
        className="bottom-[4%] left-[5%] h-28 w-24 opacity-30 md:h-36 md:w-28"
      />
    </section>
  );
}