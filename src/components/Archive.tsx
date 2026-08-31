"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { archivePhotos } from "@/data/archive";

export default function Archive() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-24 md:mb-32">
          <div className="mb-8 flex items-center gap-5">
            <span className="chapter-label whitespace-nowrap text-black/40">
              chapter iii
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
              className="h-px flex-1 bg-black/30"
            />
          </div>

          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-[clamp(4rem,10vw,8rem)] font-light leading-[0.85] tracking-[-0.04em]"
          >
            The
            <br />
            <span className="italic text-black/50">archive.</span>
          </motion.h2>

          <div className="mt-10 flex max-w-lg items-start gap-5">
            <span className="text-xs text-[#7a263a]/60">↳</span>

            <p className="text-xs leading-6 tracking-wide text-black/45 md:text-sm">
              fragments of us I thought were worth keeping.
            </p>
          </div>
        </div>

        {/* Archive info */}
        <div className="mb-8 flex items-end justify-between border-b border-black/20 pb-4">
          <p className="chapter-label text-black/30">
            photographic record
          </p>

          <p className="chapter-label text-black/30">
            01 — {String(archivePhotos.length).padStart(2, "0")}
          </p>
        </div>

        {/* Photos */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {archivePhotos.map((photo, index) => (
            <motion.figure
              key={photo.id}
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-80px",
              }}
              transition={{
                duration: 0.8,
                delay: (index % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group ${photo.className}`}
            >
              <div
                className={`relative ${photo.height} overflow-hidden bg-black/[0.04]`}
              >
                <Image
                  src={photo.image}
                  alt={`Archive photograph ${photo.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={`${photo.position} object-cover grayscale-[35%] transition duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0`}
                />

                {/* Paper tint */}
                <div className="pointer-events-none absolute inset-0 bg-[#f3efe7]/10 mix-blend-multiply" />

                {/* Border */}
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
                    strokeWidth="0.8"
                    initial={{
                      pathLength: 0,
                    }}
                    whileInView={{
                      pathLength: 1,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.3,
                      delay: 0.15,
                    }}
                  />
                </svg>

                {/* Number */}
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="chapter-label bg-[#f3efe7]/80 px-2 py-1 text-black/60 backdrop-blur-[2px]">
                    {photo.id}
                  </span>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>

        {/* Bottom manuscript details */}
        <div className="relative mt-10 flex items-center justify-between border-t border-black/20 pt-5">
          <p className="chapter-label text-black/25">
            archive / 41
          </p>

          <p className="chapter-label text-black/25">
            still developing
          </p>

          {/* Sketch arrow */}
          <svg
            viewBox="0 0 180 80"
            fill="none"
            className="absolute -top-3 right-32 hidden w-28 md:block"
          >
            <motion.path
              d="M8 58C53 60 91 48 143 20M143 20L129 18M143 20L138 34"
              stroke="#7a263a"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
              }}
              whileInView={{
                pathLength: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
              }}
            />
          </svg>
        </div>

        {/* Ending */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
          className="mx-auto mt-32 max-w-2xl text-center"
        >
          <p className="font-display text-3xl italic leading-relaxed text-black/55 md:text-5xl">
            I&apos;d keep every version of us.
          </p>

          <p className="chapter-label mt-6 text-[#7a263a]/55">
            even the blurry ones.
          </p>
        </motion.div>
      </div>
    </section>
  );
}