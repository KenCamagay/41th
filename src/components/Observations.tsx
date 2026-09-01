"use client";

import { motion } from "motion/react";
import { observations } from "@/data/observations";
import GrowingDoodle from "@/components/GrowingDoodle";

export default function Observations() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">

        {/* Chapter heading */}
        <div className="mb-32 md:mb-48">
          <div className="mb-8 flex items-center gap-5">
            <span className="chapter-label whitespace-nowrap text-black/40">
              chapter ii
            </span>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.3,
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
            className="font-display max-w-5xl text-[clamp(4rem,9vw,8rem)] font-light leading-[0.88] tracking-[-0.04em]"
          >
            Things I still
            <br />
            <span className="italic text-black/50">notice about you.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.25,
              duration: 1,
            }}
            className="mt-10 max-w-sm text-sm leading-7 text-black/45"
          >
            The kind of things that probably seem too small to mention.
            Maybe that&apos;s why I remember them.
          </motion.p>
        </div>

        {/* Notes */}
        <div className="relative">
          {observations.map((item, index) => {
            const alignment =
              item.align === "right"
                ? "ml-auto text-right"
                : item.align === "center"
                  ? "mx-auto text-center"
                  : "mr-auto text-left";

            return (
              <motion.article
                key={item.id}
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
                  margin: "-100px",
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`
                  relative
                  isolate
                  mb-44
                  max-w-xl
                  md:mb-64
                  ${alignment}
                `}
              >
                {/* Small number */}
                <p className="chapter-label relative z-10 mb-5 text-black/25">
                  observation / {item.id}
                </p>

                {/* Main observation */}
                <p className="font-display relative z-10 text-3xl font-light leading-[1.15] text-black/75 md:text-5xl">
                  {item.text}
                </p>

                {/* Wine annotation */}
                <p className="relative z-10 mt-6 text-[10px] uppercase tracking-[0.25em] text-[#7a263a]/65 md:text-xs">
                  ↳ {item.note}
                </p>

                {/* Different sketch per observation */}

                {index === 0 && (
                  <svg
                    viewBox="0 0 350 60"
                    fill="none"
                    className="absolute -bottom-12 left-0 w-[240px] md:w-[320px]"
                  >
                    <motion.path
                      d="M7 36C91 24 176 39 343 21"
                      stroke="#7a263a"
                      strokeWidth="1"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: 0.25,
                      }}
                    />
                  </svg>
                )}

                {index === 1 && (
                  <svg
                    viewBox="0 0 200 150"
                    fill="none"
                    className="absolute -left-28 top-0 hidden w-28 md:block"
                  >
                    <motion.path
                      d="M21 20C35 84 74 118 153 112M153 112L133 95M153 112L134 127"
                      stroke="#171717"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: 0.2,
                      }}
                    />
                  </svg>
                )}

                {index === 2 && (
                    <svg
                        viewBox="0 0 500 180"
                        fill="none"
                        className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        z-0
                        w-[120%]
                        -translate-x-1/2
                        -translate-y-1/2
                        "
                    >
                        <motion.path
                        d="M44 92C69 31 159 25 251 31C359 36 450 45 459 96C467 145 367 155 250 151C137 148 25 141 44 92Z"
                        stroke="#7a263a"
                        strokeWidth="0.9"
                        strokeLinecap="round"
                        initial={{
                            pathLength: 0,
                            opacity: 0,
                        }}
                        whileInView={{
                            pathLength: 1,
                            opacity: 0.4,
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                        }}
                        />
                    </svg>
                    )}

                {index === 3 && (
                  <div className="absolute -right-16 -top-16 hidden rotate-12 md:block">
                    <span className="font-display text-6xl italic text-black/10">
                      “
                    </span>
                  </div>
                )}

                {index === 4 && (
                  <svg
                    viewBox="0 0 160 160"
                    fill="none"
                    className="absolute -left-16 -top-20 w-24 opacity-50"
                  >
                    <motion.path
                      d="M81 18L88 63L126 40L101 76L145 80L102 88L128 124L91 101L82 145L75 101L37 126L61 88L18 81L60 75L34 38L73 62L81 18Z"
                      stroke="#171717"
                      strokeWidth="0.8"
                      strokeLinejoin="round"
                      initial={{
                        pathLength: 0,
                      }}
                      whileInView={{
                        pathLength: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.7,
                      }}
                    />
                  </svg>
                )}

                {index === 5 && (
                  <svg
                    viewBox="0 0 500 60"
                    fill="none"
                    className="absolute -bottom-14 left-1/2 w-[90%] -translate-x-1/2"
                  >
                    <motion.path
                      d="M8 33C114 19 190 38 279 27C359 18 419 30 491 21"
                      stroke="#7a263a"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      initial={{
                        pathLength: 0,
                      }}
                      whileInView={{
                        pathLength: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.8,
                      }}
                    />
                  </svg>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* Section ending */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
          }}
          className="mx-auto mt-10 max-w-xl text-center"
        >
          <p className="chapter-label text-black/30">
            note to self
          </p>

          <p className="font-display mt-6 text-3xl italic leading-10 text-black/55 md:text-4xl">
            maybe love is just paying attention for a really long time.
          </p>
        </motion.div>
      </div>
      <GrowingDoodle
        stage={4}
        className="bottom-[3%] left-[7%] h-36 w-28 opacity-30 md:h-44 md:w-36"
      />
    </section>
  );
}