"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { letter } from "@/data/letter";

export default function FinalLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">

        {/* Chapter label */}
        <div className="mb-24">
          <div className="flex items-center gap-5">
            <span className="chapter-label whitespace-nowrap text-black/40">
              final chapter
            </span>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transformOrigin: "left",
              }}
              className="h-px flex-1 bg-black/30"
            />
          </div>
        </div>

        {/* Intro */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
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
              duration: 0.8,
            }}
            className="chapter-label mb-8 text-[#7a263a]/55"
          >
            one last page
          </motion.p>

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
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-[clamp(5rem,13vw,11rem)] font-light leading-[0.75] tracking-[-0.05em]"
          >
            For
            <br />

            <span className="italic text-black/50">
              you.
            </span>
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.35,
              duration: 1,
            }}
            className="mx-auto mt-12 max-w-md text-sm leading-7 text-black/45"
          >
            There&apos;s one thing I couldn&apos;t fit into all the pages
            before this.
          </motion.p>

          {/* Open button */}
          {!opened && (
            <motion.button
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.6,
                duration: 0.8,
              }}
              onClick={() => setOpened(true)}
              className="group relative mt-14 cursor-pointer pb-3 text-[10px] uppercase tracking-[0.3em] text-black/55 transition hover:text-[#7a263a]"
            >
              open my letter

              <motion.span
                className="absolute bottom-0 left-0 h-px w-full bg-[#7a263a]/60"
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 1,
                  duration: 1,
                }}
                style={{
                  transformOrigin: "left",
                }}
              />
            </motion.button>
          )}
        </div>

        {/* LETTER */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{
                opacity: 0,
                y: 60,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mx-auto mt-32 max-w-4xl md:mt-44"
            >
              {/* Paper */}
              <div className="relative bg-[#faf8f3] px-7 py-16 shadow-[0_30px_90px_rgba(0,0,0,0.06)] md:px-20 md:py-24">

                {/* Animated border */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                >
                  <motion.rect
                    x="8"
                    y="8"
                    width="calc(100% - 16px)"
                    height="calc(100% - 16px)"
                    fill="none"
                    stroke="#171717"
                    strokeWidth="0.7"
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      opacity: 0.25,
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.2,
                      ease: "easeInOut",
                    }}
                  />
                </svg>

                {/* Letter header */}
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.8,
                    duration: 1,
                  }}
                  className="mb-12 flex items-center justify-between border-b border-black/10 pb-5"
                >
                  <p className="chapter-label text-black/25">
                    personal correspondence
                  </p>

                  <p className="chapter-label text-black/25">
                    41 / ∞
                  </p>
                </motion.div>

                {/* Letter paragraphs */}
                <div className="relative z-10">
                  {letter.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 1 + index * 0.22,
                      }}
                      className={`
                        font-display
                        text-xl
                        leading-[1.8]
                        text-black/70
                        md:text-2xl
                        md:leading-[1.9]
                        ${
                          index === 0
                            ? "mb-8 italic"
                            : "mb-7"
                        }
                      `}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Little ending heart */}
                <svg
                  viewBox="0 0 120 110"
                  fill="none"
                  className="ml-auto mt-12 w-16"
                >
                  <motion.path
                    d="
                      M60 96
                      C51 88 18 64 18 38
                      C18 22 29 14 42 15
                      C51 16 57 22 60 29
                      C64 22 70 16 79 15
                      C93 14 103 23 103 38
                      C103 63 69 88 60 96
                    "
                    stroke="#7a263a"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      opacity: 0.5,
                    }}
                    transition={{
                      delay: 2.2 + letter.length * 0.22,
                      duration: 1.7,
                    }}
                  />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ending */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 2.4 + letter.length * 0.22,
                duration: 1.2,
              }}
              className="mx-auto mt-44 max-w-4xl text-center md:mt-64"
            >
              <p className="chapter-label text-black/30">
                chapter 41
              </p>

              <h3 className="font-display mt-5 text-7xl font-light tracking-[-0.04em] md:text-9xl">
                END
              </h3>

              {/* Cross-out effect */}
              <div className="relative mx-auto mt-16 w-fit">
                <p className="font-display text-3xl italic text-black/45 md:text-5xl">
                  our story is over.
                </p>

                <svg
                  viewBox="0 0 500 50"
                  fill="none"
                  className="absolute left-1/2 top-1/2 w-[108%] -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.path
                    d="M7 31C102 20 207 33 306 23C378 16 431 25 493 18"
                    stroke="#7a263a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                    }}
                    whileInView={{
                      pathLength: 1,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5,
                    }}
                  />
                </svg>
              </div>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 1.7,
                  duration: 1,
                }}
                className="font-display mt-8 text-3xl italic text-black/70 md:text-5xl"
              >
                our story isn&apos;t.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 2.3,
                  duration: 1.2,
                }}
                className="mt-36"
              >
                <p className="chapter-label text-[#7a263a]/55">
                  to be continued...
                </p>

                {/* Final little line */}
                <svg
                  viewBox="0 0 400 50"
                  fill="none"
                  className="mx-auto mt-6 w-52"
                >
                  <motion.path
                    d="M7 26C92 17 181 30 267 21C311 17 348 21 393 16"
                    stroke="#171717"
                    strokeWidth="0.8"
                    strokeLinecap="round"
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

                <p className="mt-12 text-[9px] uppercase tracking-[0.35em] text-black/20">
                  made only for you
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}