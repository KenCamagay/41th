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
  const draw = {
    initial: {
      pathLength: 0,
      opacity: 0,
    },
    animate: {
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
          variants={draw}
          initial="initial"
          whileInView="animate"
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
            variants={draw}
            initial="initial"
            whileInView="animate"
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
            variants={draw}
            initial="initial"
            whileInView="animate"
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
            variants={draw}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.5,
            }}
          />
        )}

        {/* Bud */}
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
            variants={draw}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.75,
            }}
          />
        )}

        {/* Main bud */}
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
            variants={draw}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.6,
            }}
          />
        )}

        {/* Full flower */}
        {stage >= 6 && (
          <>
            <motion.path
              d="
                M72 27
                C63 15 68 5 76 7
                C84 9 84 20 72 27Z
              "
              stroke="#7a263a"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={draw}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
            />

            <motion.path
              d="
                M73 27
                C82 13 94 14 96 22
                C98 31 86 35 73 27Z
              "
              stroke="#7a263a"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={draw}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.6,
              }}
            />

            <motion.path
              d="
                M72 27
                C62 16 51 19 51 28
                C51 36 62 36 72 27Z
              "
              stroke="#7a263a"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={draw}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.8,
              }}
            />

            <motion.circle
              cx="73"
              cy="27"
              r="3"
              stroke="#171717"
              strokeWidth="0.9"
              initial={{
                scale: 0,
                opacity: 0,
              }}
              whileInView={{
                scale: 1,
                opacity: 0.55,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 1.4,
                duration: 0.5,
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
}