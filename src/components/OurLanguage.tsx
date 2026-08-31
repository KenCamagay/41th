"use client";

import { motion } from "motion/react";
import { languageNotes } from "@/data/language";


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
            staggerChildren: 0.085,
            delayChildren: 0.15,
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
                duration: 0.09,
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

export default function OurLanguage() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">

        {/* Chapter heading */}
        <div className="mb-24 md:mb-36">
          <div className="mb-8 flex items-center gap-5">
            <span className="chapter-label whitespace-nowrap text-black/40">
              chapter iii
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

          <motion.h2
            initial={{
              opacity: 0,
              y: 25,
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
            Our
            <br />

            <span className="italic text-black/50">
              language.
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
            Somewhere along the way, ordinary words started meaning something
            completely different to us.
          </motion.p>
        </div>

        {/* Scattered manuscript */}
        <div className="relative flex flex-col gap-32 py-20 md:block md:min-h-[1700px] md:py-0">
          {languageNotes.map((item, index) => (
            <motion.div
              key={`${item.text}-${index}`}
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 0.3,
              }}
              className={`
                relative
                max-w-xl
                md:absolute
                ${item.position}
                ${item.rotation}
              `}
            >
              {/* Tiny manuscript number */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2,
                  duration: 0.7,
                }}
                className="chapter-label mb-3 text-black/20"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.p>

              {/* Handwriting animation */}
                <HandwrittenText
                text={item.text}
                className={`
                    font-handwriting
                    leading-none
                    text-black/75
                    ${item.size}
                `}
                />

              {/* Small personal annotation */}
              {item.note && (
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 1.2,
                    duration: 0.8,
                  }}
                  className="mt-4 max-w-xs text-[9px] uppercase leading-5 tracking-[0.22em] text-[#7a263a]/55 md:text-[10px]"
                >
                  ↳ {item.note}
                </motion.p>
              )}

              {/* Hand-drawn underline on some entries */}
              {index % 3 === 0 && (
                <svg
                  viewBox="0 0 400 40"
                  fill="none"
                  className="mt-2 w-[80%]"
                >
                  <motion.path
                    d="M6 25C95 17 181 28 267 20C313 16 350 20 393 17"
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
                      duration: 1.3,
                      delay: 1,
                    }}
                  />
                </svg>
              )}
            </motion.div>
          ))}

          {/* Random sketch arrow */}
          <svg
            viewBox="0 0 250 180"
            fill="none"
            className="pointer-events-none absolute left-[5%] top-[43%] hidden w-36 md:block"
          >
            <motion.path
              d="M25 30C33 101 92 140 189 120M189 120L164 101M189 120L166 139"
              stroke="#171717"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              whileInView={{
                pathLength: 1,
                opacity: 0.3,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 2,
              }}
            />
          </svg>

          {/* Tiny star sketch */}
          <svg
            viewBox="0 0 100 100"
            fill="none"
            className="pointer-events-none absolute right-[24%] top-[57%] hidden w-14 md:block"
          >
            <motion.path
              d="M50 8L55 40L82 26L62 49L91 53L61 59L78 85L54 67L49 94L44 67L19 84L37 58L9 51L38 47L20 22L45 39L50 8Z"
              stroke="#7a263a"
              strokeWidth="0.8"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              whileInView={{
                pathLength: 1,
                opacity: 0.35,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.8,
              }}
            />
          </svg>
        </div>

        {/* Closing line */}
        <motion.div
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
            duration: 1,
          }}
          className="mx-auto mt-24 max-w-2xl text-center md:mt-12"
        >
          <p className="chapter-label text-black/25">
            dictionary for two
          </p>

          <p className="font-display mt-7 text-3xl italic leading-relaxed text-black/55 md:text-5xl">
            somewhere along the way,
            <br />
            we made our own language.
          </p>

          <svg
            viewBox="0 0 500 50"
            fill="none"
            className="mx-auto mt-7 w-[250px] md:w-[380px]"
          >
            <motion.path
              d="M8 29C92 20 169 31 254 23C337 16 404 27 491 18"
              stroke="#7a263a"
              strokeWidth="1"
              strokeLinecap="round"
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
        </motion.div>
      </div>
    </section>
  );
}