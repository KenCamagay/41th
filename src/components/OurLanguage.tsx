"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { languageNotes } from "@/data/language";
import GrowingDoodle from "@/components/GrowingDoodle";

function HandwrittenText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const characters = Array.from(text);

  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-80px",
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.055,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
      aria-label={text}
    >
      {characters.map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          aria-hidden="true"
          className="inline-block"
          variants={{
            hidden: {
              opacity: 0,
              y: 3,
              rotate: -2,
              filter: "blur(1px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              rotate: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.08,
                ease: "easeOut",
              },
            },
          }}
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </motion.p>
  );
}

const desktopLayouts = [
  "md:left-[7%] md:top-[4%]",
  "md:right-[7%] md:top-[17%]",
  "md:left-[18%] md:top-[31%]",
  "md:right-[14%] md:top-[46%]",
  "md:left-[6%] md:top-[61%]",
  "md:right-[4%] md:top-[73%]",
  "md:left-[31%] md:top-[86%]",
];

const annotationLabels = [
  "unofficial translation",
  "meaning",
  "used privately",
  "translation",
  "see also",
  "definition",
  "no official explanation",
];

export default function OurLanguage() {
  const [activeNote, setActiveNote] = useState<number | null>(null);

  return (
    <section
      className="
        relative
        overflow-hidden
        px-6
        py-32
        md:px-12
        md:py-44
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* ================================= */}
        {/* CHAPTER HEADING */}
        {/* ================================= */}

        <div className="relative mb-20 md:mb-28">
          <div className="mb-8 flex items-center gap-5">
            <span className="chapter-label whitespace-nowrap text-black/40">
              chapter iii
            </span>

            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
              }}
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

          <motion.h2
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              font-display
              text-[clamp(4rem,10vw,8rem)]
              font-light
              leading-[0.85]
              tracking-[-0.04em]
            "
          >
            Our
            <br />

            <span className="italic text-black/50">
              language.
            </span>
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.3,
              duration: 1,
            }}
            className="
              mt-10
              max-w-sm
              text-sm
              leading-7
              text-black/45
            "
          >
            Somewhere along the way, ordinary words
            started meaning something completely
            different to us.
          </motion.p>

          {/* Small dictionary label */}
          <motion.div
            initial={{
              opacity: 0,
              rotate: -5,
            }}
            whileInView={{
              opacity: 1,
              rotate: -3,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.7,
              duration: 0.8,
            }}
            className="
              absolute
              right-[4%]
              top-[62%]
              hidden
              md:block
            "
          >
            <p
              className="
                font-handwriting
                text-2xl
                text-[#7a263a]/35
              "
            >
              private lexicon
            </p>

            <p
              className="
                mt-1
                text-[8px]
                uppercase
                tracking-[0.28em]
                text-black/20
              "
            >
              K &amp; R / vol. 01
            </p>
          </motion.div>
        </div>

        {/* ================================= */}
        {/* PRIVATE DICTIONARY */}
        {/* ================================= */}

        <div
          className="
            relative
            flex
            flex-col
            gap-20
            py-12
            md:block
            md:min-h-[1320px]
            md:py-0
          "
        >

          {/* ================================= */}
          {/* FAINT BACKGROUND MANUSCRIPT */}
          {/* ================================= */}

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.5,
            }}
            className="
              pointer-events-none
              absolute
              left-[42%]
              top-[5%]
              hidden
              -rotate-6
              font-handwriting
              text-[9rem]
              leading-none
              text-black/[0.025]
              md:block
            "
          >
            US
          </motion.p>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.3,
              duration: 1.5,
            }}
            className="
              pointer-events-none
              absolute
              right-[35%]
              top-[37%]
              hidden
              rotate-6
              font-display
              text-[12rem]
              font-light
              italic
              text-[#7a263a]/[0.025]
              md:block
            "
          >
            &amp;
          </motion.p>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.4,
              duration: 1.5,
            }}
            className="
              pointer-events-none
              absolute
              left-[32%]
              top-[69%]
              hidden
              -rotate-3
              font-handwriting
              text-7xl
              text-black/[0.025]
              md:block
            "
          >
            say it again
          </motion.p>

          {/* ================================= */}
          {/* WINDING THREAD */}
          {/* ================================= */}

          <svg
            viewBox="0 0 1200 1320"
            fill="none"
            preserveAspectRatio="none"
            className="
              pointer-events-none
              absolute
              inset-0
              hidden
              h-full
              w-full
              md:block
            "
          >
            {/* Very faint shadow thread */}
            <path
              d="
                M225 85
                C370 110 430 150 550 190

                C690 235 1010 205 1000 315

                C990 410 715 405 650 485

                C570 585 830 635 910 705

                C990 780 885 870 720 855

                C570 840 320 830 245 945

                C170 1060 440 1100 570 1140

                C690 1175 730 1220 700 1280
              "
              stroke="#171717"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.06"
            />

            {/* Main wine thread */}
            <motion.path
              d="
                M225 85
                C370 110 430 150 550 190

                C690 235 1010 205 1000 315

                C990 410 715 405 650 485

                C570 585 830 635 910 705

                C990 780 885 870 720 855

                C570 840 320 830 245 945

                C170 1060 440 1100 570 1140

                C690 1175 730 1220 700 1280
              "
              stroke="#7a263a"
              strokeWidth="1.05"
              strokeLinecap="round"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              whileInView={{
                pathLength: 1,
                opacity: 0.22,
              }}
              viewport={{
                once: true,
                margin: "-120px",
              }}
              transition={{
                duration: 4.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Little connection nodes */}
            {[
              [225, 85],
              [998, 315],
              [650, 485],
              [910, 705],
              [720, 855],
              [245, 945],
              [570, 1140],
            ].map(([cx, cy], index) => (
              <motion.circle
                key={index}
                cx={cx}
                cy={cy}
                r="4"
                fill="#faf8f3"
                stroke="#7a263a"
                strokeWidth="1"
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                whileInView={{
                  scale: 1,
                  opacity: 0.5,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.5 + index * 0.18,
                  duration: 0.5,
                }}
              />
            ))}
          </svg>

          {/* ================================= */}
          {/* LANGUAGE ENTRIES */}
          {/* ================================= */}

          {languageNotes.map((item, index) => {
            const isActive = activeNote === index;

            return (
              <motion.div
                key={`${item.text}-${index}`}
                initial={{
                  opacity: 0,
                  y: 20,
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
                  duration: 0.7,
                  delay: index * 0.04,
                }}
                onHoverStart={() => {
                  setActiveNote(index);
                }}
                onHoverEnd={() => {
                  setActiveNote(null);
                }}
                onTap={() => {
                  setActiveNote(
                    isActive ? null : index,
                  );
                }}
                className={`
                  group
                  relative
                  z-10
                  max-w-xl
                  cursor-default
                  md:absolute
                  ${desktopLayouts[index % desktopLayouts.length]}
                  ${item.rotation}
                `}
              >

                {/* Number + dictionary marker */}

                <div className="mb-3 flex items-center gap-3">

                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 0.2,
                      duration: 0.7,
                    }}
                    className="
                      chapter-label
                      text-black/20
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.p>

                  <motion.div
                    initial={{
                      scaleX: 0,
                    }}
                    whileInView={{
                      scaleX: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 0.25,
                      duration: 0.8,
                    }}
                    style={{
                      transformOrigin: "left",
                    }}
                    className="
                      h-px
                      w-8
                      bg-black/10
                    "
                  />

                  <p
                    className="
                      text-[7px]
                      uppercase
                      tracking-[0.28em]
                      text-black/15
                    "
                  >
                    entry
                  </p>

                </div>

                {/* Handwriting */}

                <HandwrittenText
                  text={item.text}
                  className={`
                    font-handwriting
                    leading-none
                    text-black/75
                    transition-colors
                    duration-500
                    group-hover:text-black/90
                    ${item.size}
                  `}
                />

                {/* ================================= */}
                {/* VARYING DECORATIONS */}
                {/* ================================= */}

                {index % 3 === 0 && (
                  <svg
                    viewBox="0 0 400 40"
                    fill="none"
                    className="
                      mt-1
                      w-[80%]
                    "
                  >
                    <motion.path
                      d="
                        M6 25
                        C95 17 181 28 267 20
                        C313 16 350 20 393 17
                      "
                      stroke="#7a263a"
                      strokeWidth="0.9"
                      strokeLinecap="round"
                      initial={{
                        pathLength: 0,
                        opacity: 0,
                      }}
                      whileInView={{
                        pathLength: 1,
                        opacity: 0.35,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 1.3,
                        delay: 0.7,
                      }}
                    />
                  </svg>
                )}

                {index === 2 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      rotate: -5,
                    }}
                    whileInView={{
                      opacity: 1,
                      rotate: -3,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 1,
                    }}
                    className="
                      absolute
                      -right-12
                      -top-5
                      hidden
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#7a263a]/20
                      md:flex
                    "
                  >
                    <span
                      className="
                        font-handwriting
                        text-lg
                        text-[#7a263a]/35
                      "
                    >
                      us
                    </span>
                  </motion.div>
                )}

                {index === 4 && (
                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 0.8,
                    }}
                    className="
                      absolute
                      -right-20
                      top-1/2
                      hidden
                      rotate-6
                      font-handwriting
                      text-xl
                      text-black/20
                      md:block
                    "
                  >
                    exactly this →
                  </motion.p>
                )}

                {/* ================================= */}
                {/* HIDDEN / REVEALED NOTE */}
                {/* ================================= */}

                {item.note && (
                  <div className="relative mt-4 min-h-[54px]">

                    <AnimatePresence mode="wait">

                      {isActive ? (
                        <motion.div
                          key="revealed"
                          initial={{
                            opacity: 0,
                            y: 7,
                            rotate: -1,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            rotate: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -5,
                          }}
                          transition={{
                            duration: 0.35,
                          }}
                        >
                          <p
                            className="
                              mb-1
                              text-[7px]
                              uppercase
                              tracking-[0.28em]
                              text-black/20
                            "
                          >
                            {annotationLabels[
                              index %
                                annotationLabels.length
                            ]}
                          </p>

                          <p
                            className="
                              max-w-xs
                              text-[9px]
                              uppercase
                              leading-5
                              tracking-[0.2em]
                              text-[#7a263a]/65
                              md:text-[10px]
                            "
                          >
                            ↳ {item.note}
                          </p>

                        </motion.div>
                      ) : (
                        <motion.p
                          key="hidden"
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                          className="
                            text-[8px]
                            uppercase
                            tracking-[0.24em]
                            text-black/15
                          "
                        >
                          hover / tap to translate
                        </motion.p>
                      )}

                    </AnimatePresence>

                  </div>
                )}

              </motion.div>
            );
          })}

          {/* ================================= */}
          {/* RANDOM MANUSCRIPT ARTIFACTS */}
          {/* ================================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
            className="
              pointer-events-none
              absolute
              left-[48%]
              top-[24%]
              hidden
              -rotate-3
              md:block
            "
          >
            <p
              className="
                text-[7px]
                uppercase
                tracking-[0.32em]
                text-black/15
              "
            >
              see also:
            </p>

            <p
              className="
                mt-2
                font-handwriting
                text-2xl
                text-black/20
              "
            >
              “us”
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            className="
              pointer-events-none
              absolute
              right-[8%]
              top-[58%]
              hidden
              rotate-3
              md:block
            "
          >
            <p
              className="
                font-handwriting
                text-xl
                text-[#7a263a]/30
              "
            >
              // no official translation
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              rotate: -12,
            }}
            whileInView={{
              opacity: 1,
              rotate: -7,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              pointer-events-none
              absolute
              bottom-[18%]
              right-[27%]
              hidden
              md:block
            "
          >
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                border
                border-black/10
              "
            >
              <p
                className="
                  font-display
                  text-2xl
                  italic
                  text-black/20
                "
              >
                41
              </p>
            </div>
          </motion.div>

          {/* Tiny star */}

          <svg
            viewBox="0 0 100 100"
            fill="none"
            className="
              pointer-events-none
              absolute
              right-[25%]
              top-[43%]
              hidden
              w-12
              md:block
            "
          >
            <motion.path
              d="
                M50 8
                L55 40
                L82 26
                L62 49
                L91 53
                L61 59
                L78 85
                L54 67
                L49 94
                L44 67
                L19 84
                L37 58
                L9 51
                L38 47
                L20 22
                L45 39
                L50 8Z
              "
              stroke="#7a263a"
              strokeWidth="0.8"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              whileInView={{
                pathLength: 1,
                opacity: 0.25,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.8,
              }}
            />
          </svg>

          {/* K&R manuscript mark */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
            }}
            className="
              hidden
              md:absolute
              md:bottom-[2%]
              md:left-[8%]
              md:block
            "
          >
            <p
              className="
                text-[7px]
                uppercase
                tracking-[0.3em]
                text-black/15
              "
            >
              private archive
            </p>

            <p
              className="
                mt-2
                font-handwriting
                text-3xl
                text-black/25
              "
            >
              K &amp; R
            </p>
          </motion.div>

        </div>

        {/* ================================= */}
        {/* CLOSING */}
        {/* ================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
          className="
            relative
            mx-auto
            mt-20
            max-w-2xl
            text-center
            md:mt-16
          "
        >
          <p className="chapter-label text-black/25">
            dictionary for two
          </p>

          <p
            className="
              font-display
              mt-7
              text-3xl
              italic
              leading-relaxed
              text-black/55
              md:text-5xl
            "
          >
            somewhere along the way,
            <br />
            we made our own language.
          </p>

          <svg
            viewBox="0 0 500 50"
            fill="none"
            className="
              mx-auto
              mt-7
              w-[250px]
              md:w-[380px]
            "
          >
            <motion.path
              d="
                M8 29
                C92 20 169 31 254 23
                C337 16 404 27 491 18
              "
              stroke="#7a263a"
              strokeWidth="1"
              strokeLinecap="round"
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
                duration: 1.7,
              }}
            />
          </svg>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.8,
              duration: 1,
            }}
            className="
              mt-8
              text-[7px]
              uppercase
              tracking-[0.32em]
              text-black/15
            "
          >
            continued in every conversation after this
          </motion.p>
        </motion.div>

      </div>

      <GrowingDoodle
        stage={5}
        className="
          bottom-[2%]
          right-[6%]
          h-36
          w-28
          opacity-35
          md:h-48
          md:w-40
        "
      />
    </section>
  );
}