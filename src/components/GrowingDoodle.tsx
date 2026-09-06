"use client";

import { motion } from "motion/react";

type GrowingDoodleProps = {
  stage: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export default function GrowingDoodle({
  stage,
  className = "",
}: GrowingDoodleProps) {
  const bloomed = stage === 6;

  const baseDraw = {
    initial: {
      pathLength: 0,
      opacity: 0,
    },

    whileInView: {
      pathLength: 1,
      opacity: 1,
    },
  };

  return (
    <div
      className={`
        pointer-events-none
        absolute
        ${className}
      `}
    >
      <svg
        viewBox="0 0 140 180"
        fill="none"
        className="h-full w-full overflow-visible"
      >
        {/* ================================= */}
        {/* STEM */}
        {/* ================================= */}

        <motion.path
          d="
            M70 169
            C67 143 72 126 69 105
            C66 84 70 66 72 47
          "
          stroke={bloomed ? "#66745f" : "#171717"}
          strokeWidth={bloomed ? "1.8" : "1.2"}
          strokeLinecap="round"
          initial={baseDraw.initial}
          whileInView={baseDraw.whileInView}
          viewport={{
            once: true,
          }}
          animate={
            bloomed
              ? {
                  stroke: "#66745f",
                }
              : undefined
          }
          transition={{
            duration: 1.3,
            ease: "easeInOut",
          }}
        />

        {/* ================================= */}
        {/* FIRST LEAF */}
        {/* ================================= */}

        {stage >= 2 && (
          <motion.path
            d="
              M69 126
              C55 111 42 111 35 117
              C44 128 55 134 69 126Z

              M38 118
              C49 121 58 124 68 126
            "
            stroke={bloomed ? "#68795f" : "#171717"}
            fill={bloomed ? "#87977c" : "transparent"}
            fillOpacity={bloomed ? 0.32 : 0}
            strokeWidth={bloomed ? "1.4" : "1"}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={baseDraw.initial}
            whileInView={baseDraw.whileInView}
            viewport={{
              once: true,
            }}
            animate={
              bloomed
                ? {
                    fillOpacity: 0.32,
                    stroke: "#68795f",
                  }
                : undefined
            }
            transition={{
              duration: 1,
              delay: bloomed ? 0.15 : 0.3,
            }}
          />
        )}

        {/* ================================= */}
        {/* SECOND LEAF */}
        {/* ================================= */}

        {stage >= 3 && (
          <motion.path
            d="
              M70 101
              C82 87 95 87 104 94
              C96 105 84 109 70 101Z

              M101 94
              C91 96 80 99 71 101
            "
            stroke={bloomed ? "#68795f" : "#7a263a"}
            fill={bloomed ? "#87977c" : "transparent"}
            fillOpacity={bloomed ? 0.38 : 0}
            strokeWidth={bloomed ? "1.4" : "1"}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={baseDraw.initial}
            whileInView={baseDraw.whileInView}
            viewport={{
              once: true,
            }}
            animate={
              bloomed
                ? {
                    fillOpacity: 0.38,
                    stroke: "#68795f",
                  }
                : undefined
            }
            transition={{
              duration: 1,
              delay: bloomed ? 0.25 : 0.4,
            }}
          />
        )}

        {/* ================================= */}
        {/* SMALL BRANCH */}
        {/* ================================= */}

        {stage >= 4 && (
          <motion.path
            d="
              M70 78
              C58 72 51 63 48 53
            "
            stroke={bloomed ? "#66745f" : "#171717"}
            strokeWidth={bloomed ? "1.4" : "0.9"}
            strokeLinecap="round"
            initial={baseDraw.initial}
            whileInView={baseDraw.whileInView}
            viewport={{
              once: true,
            }}
            animate={
              bloomed
                ? {
                    stroke: "#66745f",
                  }
                : undefined
            }
            transition={{
              duration: 0.9,
              delay: 0.3,
            }}
          />
        )}

        {/* ================================= */}
        {/* SIDE BUD */}
        {/* ================================= */}

        {stage >= 4 && (
          <motion.path
            d="
              M48 53
              C39 49 38 39 45 33
              C52 37 56 46 48 53Z
            "
            stroke={bloomed ? "#9b4e61" : "#7a263a"}
            fill={bloomed ? "#cf8998" : "transparent"}
            fillOpacity={bloomed ? 0.5 : 0}
            strokeWidth={bloomed ? "1.3" : "1"}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={baseDraw.initial}
            whileInView={baseDraw.whileInView}
            viewport={{
              once: true,
            }}
            animate={
              bloomed
                ? {
                    fillOpacity: 0.5,
                    stroke: "#9b4e61",
                  }
                : undefined
            }
            transition={{
              duration: 1,
              delay: 0.35,
            }}
          />
        )}

        {/* ================================= */}
        {/* CLOSED MAIN BUD */}
        {/* fades away during bloom */}
        {/* ================================= */}

        {stage >= 5 && (
          <motion.path
            d="
              M72 48
              C64 41 63 30 70 23
              C78 29 80 40 72 48Z
            "
            stroke="#7a263a"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={baseDraw.initial}
            whileInView={baseDraw.whileInView}
            viewport={{
              once: true,
            }}
            animate={
              bloomed
                ? {
                    opacity: 0.12,
                    scale: 0.8,
                  }
                : {
                    opacity: 1,
                    scale: 1,
                  }
            }
            style={{
              transformOrigin: "72px 34px",
            }}
            transition={{
              duration: 0.7,
            }}
          />
        )}

        {/* ================================= */}
        {/* FULL COLOR BLOOM */}
        {/* ================================= */}

        {bloomed && (
          <>
            {/* Soft glow behind the flower */}

            <motion.circle
              cx="72"
              cy="28"
              r="25"
              fill="#c77c8d"
              initial={{
                opacity: 0,
                scale: 0.2,
              }}
              animate={{
                opacity: [0, 0.12, 0.05],
                scale: [0.2, 1.25, 1],
              }}
              transition={{
                duration: 1.4,
                ease: "easeOut",
              }}
              style={{
                transformOrigin: "72px 28px",
              }}
            />

            {/* TOP PETAL */}

            <motion.path
              d="
                M72 28
                C64 18 66 5 75 4
                C84 5 87 18 72 28Z
              "
              stroke="#913c52"
              strokeWidth="1.15"
              fill="#c86f83"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
                scale: 0.35,
                rotate: -8,
                fillOpacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
                scale: 1,
                rotate: 0,
                fillOpacity: 0.78,
              }}
              style={{
                transformOrigin: "72px 28px",
              }}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* RIGHT PETAL */}

            <motion.path
              d="
                M73 28
                C82 14 96 14 99 23
                C101 33 87 37 73 28Z
              "
              stroke="#913c52"
              strokeWidth="1.15"
              fill="#d38191"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
                scale: 0.35,
                rotate: -18,
                fillOpacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
                scale: 1,
                rotate: 0,
                fillOpacity: 0.7,
              }}
              style={{
                transformOrigin: "73px 28px",
              }}
              transition={{
                delay: 0.1,
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* LEFT PETAL */}

            <motion.path
              d="
                M72 28
                C61 15 47 18 47 28
                C47 38 61 39 72 28Z
              "
              stroke="#913c52"
              strokeWidth="1.15"
              fill="#bd6075"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
                scale: 0.35,
                rotate: 18,
                fillOpacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
                scale: 1,
                rotate: 0,
                fillOpacity: 0.72,
              }}
              style={{
                transformOrigin: "72px 28px",
              }}
              transition={{
                delay: 0.18,
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* LOWER LEFT PETAL */}

            <motion.path
              d="
                M72 28
                C58 27 52 37 58 44
                C65 51 72 41 72 28Z
              "
              stroke="#913c52"
              strokeWidth="1"
              fill="#d894a1"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
                scale: 0.35,
                fillOpacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
                scale: 1,
                fillOpacity: 0.65,
              }}
              style={{
                transformOrigin: "72px 28px",
              }}
              transition={{
                delay: 0.26,
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* LOWER RIGHT PETAL */}

            <motion.path
              d="
                M73 28
                C87 27 92 38 86 45
                C79 51 73 41 73 28Z
              "
              stroke="#913c52"
              strokeWidth="1"
              fill="#c97889"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
                scale: 0.35,
                fillOpacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
                scale: 1,
                fillOpacity: 0.68,
              }}
              style={{
                transformOrigin: "73px 28px",
              }}
              transition={{
                delay: 0.32,
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* ================================= */}
            {/* GOLDEN CENTER */}
            {/* ================================= */}

            <motion.circle
              cx="72.5"
              cy="28"
              r="4"
              fill="#c29a59"
              stroke="#8f6d37"
              strokeWidth="0.8"
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1.45, 1],
                opacity: [0, 1, 0.95],
              }}
              transition={{
                delay: 0.55,
                duration: 0.7,
                ease: "easeOut",
              }}
            />

            {/* tiny center highlight */}

            <motion.circle
              cx="71.4"
              cy="26.8"
              r="1"
              fill="#faf1cf"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 0.9,
              }}
              transition={{
                delay: 0.9,
                duration: 0.5,
              }}
            />
          </>
        )}

      </svg>
    </div>
  );
}