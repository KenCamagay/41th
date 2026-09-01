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
        {/* Stem */}
        <motion.path
          d="
            M70 169
            C67 143 72 126 69 105
            C66 84 70 66 72 47
          "
          stroke="#171717"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={baseDraw.initial}
          whileInView={baseDraw.whileInView}
          viewport={{ once: true }}
          transition={{
            duration: 1.3,
            ease: "easeInOut",
          }}
        />

        {/* First leaf */}
        {stage >= 2 && (
          <motion.path
            d="
              M69 126
              C55 111 42 111 35 117
              C44 128 55 134 69 126
              M38 118
              C49 121 58 124 68 126
            "
            stroke="#171717"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={baseDraw.initial}
            whileInView={baseDraw.whileInView}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
          />
        )}

        {/* Second leaf */}
        {stage >= 3 && (
          <motion.path
            d="
              M70 101
              C82 87 95 87 104 94
              C96 105 84 109 70 101
              M101 94
              C91 96 80 99 71 101
            "
            stroke="#7a263a"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={baseDraw.initial}
            whileInView={baseDraw.whileInView}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.4,
            }}
          />
        )}

        {/* Small branch */}
        {stage >= 4 && (
          <motion.path
            d="
              M70 78
              C58 72 51 63 48 53
            "
            stroke="#171717"
            strokeWidth="0.9"
            strokeLinecap="round"
            initial={baseDraw.initial}
            whileInView={baseDraw.whileInView}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.5,
            }}
          />
        )}

        {/* Side bud */}
        {stage >= 4 && (
          <motion.path
            d="
              M48 53
              C39 49 38 39 45 33
              C52 37 56 46 48 53Z
            "
            stroke="#7a263a"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={baseDraw.initial}
            whileInView={baseDraw.whileInView}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.75,
            }}
          />
        )}

        {/* Main closed bud */}
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
            viewport={{ once: true }}
            animate={
              stage >= 6
                ? {
                    opacity: 0.28,
                    scale: 0.9,
                  }
                : undefined
            }
            style={{
              transformOrigin: "72px 34px",
            }}
            transition={{
              duration: 1,
              delay: 0.6,
            }}
          />
        )}

        {/* ================================= */}
        {/* BLOOM - explicitly animates on mount */}
        {/* ================================= */}

        {stage >= 6 && (
          <>
            {/* Top petal */}
            <motion.path
              d="
                M72 28
                C64 18 66 5 75 4
                C84 5 87 18 72 28Z
              "
              stroke="#7a263a"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
                scale: 0.45,
                rotate: -8,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              style={{
                transformOrigin: "72px 28px",
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Right petal */}
            <motion.path
              d="
                M73 28
                C82 14 96 14 99 23
                C101 33 87 37 73 28Z
              "
              stroke="#7a263a"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
                scale: 0.4,
                rotate: -18,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              style={{
                transformOrigin: "73px 28px",
              }}
              transition={{
                delay: 0.12,
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Left petal */}
            <motion.path
              d="
                M72 28
                C61 15 47 18 47 28
                C47 38 61 39 72 28Z
              "
              stroke="#7a263a"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
                scale: 0.4,
                rotate: 18,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              style={{
                transformOrigin: "72px 28px",
              }}
              transition={{
                delay: 0.2,
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Lower-left petal */}
            <motion.path
              d="
                M72 28
                C58 27 52 37 58 44
                C65 51 72 41 72 28Z
              "
              stroke="#7a263a"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
                scale: 0.4,
              }}
              animate={{
                pathLength: 1,
                opacity: 0.9,
                scale: 1,
              }}
              style={{
                transformOrigin: "72px 28px",
              }}
              transition={{
                delay: 0.28,
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Lower-right petal */}
            <motion.path
              d="
                M73 28
                C87 27 92 38 86 45
                C79 51 73 41 73 28Z
              "
              stroke="#7a263a"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
                scale: 0.4,
              }}
              animate={{
                pathLength: 1,
                opacity: 0.9,
                scale: 1,
              }}
              style={{
                transformOrigin: "73px 28px",
              }}
              transition={{
                delay: 0.34,
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* Flower center */}
            <motion.circle
              cx="72.5"
              cy="28"
              r="3.2"
              fill="#faf8f3"
              stroke="#171717"
              strokeWidth="0.9"
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1.3, 1],
                opacity: [0, 1, 0.75],
              }}
              transition={{
                delay: 0.55,
                duration: 0.65,
                ease: "easeOut",
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
