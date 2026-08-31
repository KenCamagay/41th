"use client";

import { motion } from "motion/react";

const leaves = [
  {
    id: 1,
    top: "12%",
    delay: 0,
    duration: 12,
    size: 32,
    y: 130,
  },
  {
    id: 2,
    top: "19%",
    delay: 1.2,
    duration: 14,
    size: 24,
    y: 80,
  },
  {
    id: 3,
    top: "31%",
    delay: 5,
    duration: 13,
    size: 36,
    y: 150,
  },
  {
    id: 4,
    top: "43%",
    delay: 2.6,
    duration: 15,
    size: 27,
    y: 100,
  },
  {
    id: 5,
    top: "58%",
    delay: 7,
    duration: 12,
    size: 30,
    y: 140,
  },
  {
    id: 6,
    top: "70%",
    delay: 3.5,
    duration: 14,
    size: 22,
    y: 90,
  },
  {
    id: 7,
    top: "82%",
    delay: 8.5,
    duration: 13,
    size: 35,
    y: 120,
  },
];

function Leaf({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className="overflow-visible"
    >
      {/* Leaf body */}
      <path
        d="
          M14 48
          C20 22 43 9 67 12
          C64 37 48 60 20 65
          C21 59 18 53 14 48Z
        "
        stroke="#7a263a"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />

      {/* Center vein */}
      <path
        d="M20 62C31 47 43 34 64 15"
        stroke="#171717"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* Tiny veins */}
      <path
        d="M34 46L27 35M43 37L39 26M48 32L57 34"
        stroke="#171717"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}

function WindLine() {
  return (
    <svg
      viewBox="0 0 500 100"
      fill="none"
      className="h-auto w-[500px]"
    >
      <path
        d="
          M5 55
          C75 29 134 32 194 50
          C254 68 315 68 371 47
          C414 31 454 32 495 42
        "
        stroke="#171717"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.14"
      />

      <path
        d="
          M70 70
          C132 55 181 57 235 68
          C289 78 344 73 397 58
        "
        stroke="#7a263a"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.13"
      />
    </svg>
  );
}

export default function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* ================================= */}
      {/* WIND STREAMS */}
      {/* ================================= */}

      <motion.div
        className="absolute top-[20%]"
        initial={{ x: "-650px", opacity: 0 }}
        animate={{
          x: ["-650px", "115vw"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "linear",
        }}
      >
        <WindLine />
      </motion.div>

      <motion.div
        className="absolute top-[62%]"
        initial={{ x: "-650px", opacity: 0 }}
        animate={{
          x: ["-650px", "115vw"],
          opacity: [0, 0.8, 0.8, 0],
        }}
        transition={{
          duration: 18,
          delay: 5,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "linear",
        }}
      >
        <WindLine />
      </motion.div>

      {/* ================================= */}
      {/* FLYING LEAVES */}
      {/* ================================= */}

      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{
            top: leaf.top,
          }}
          initial={{
            x: "-10vw",
            y: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            x: ["-10vw", "25vw", "55vw", "85vw", "110vw"],

            y: [
              0,
              leaf.y * 0.35,
              -leaf.y * 0.15,
              leaf.y * 0.65,
              leaf.y,
            ],

            rotate: [
              0,
              90,
              170,
              280,
              420,
            ],

            opacity: [
              0,
              0.45,
              0.5,
              0.4,
              0,
            ],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{
              y: [0, -14, 8, -10, 0],
              rotateX: [0, 35, -20, 20, 0],
              rotateY: [0, -30, 25, -20, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Leaf size={leaf.size} />
          </motion.div>
        </motion.div>
      ))}

      {/* ================================= */}
      {/* SMALL WIND-BLOWN LEAF GROUP */}
      {/* ================================= */}

      <motion.div
        className="absolute top-[38%]"
        initial={{
          x: "-15vw",
          opacity: 0,
        }}
        animate={{
          x: ["-15vw", "115vw"],
          opacity: [0, 0.45, 0.45, 0],
        }}
        transition={{
          duration: 11,
          delay: 4,
          repeat: Infinity,
          repeatDelay: 9,
          ease: "easeInOut",
        }}
      >
        <div className="relative h-32 w-48">

          <motion.div
            className="absolute left-0 top-3"
            animate={{
              rotate: [0, 150, 300],
              y: [0, 30, 5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <Leaf size={22} />
          </motion.div>

          <motion.div
            className="absolute left-14 top-12"
            animate={{
              rotate: [40, -130, -280],
              y: [0, -25, 20],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
            }}
          >
            <Leaf size={29} />
          </motion.div>

          <motion.div
            className="absolute left-28 top-0"
            animate={{
              rotate: [-30, 130, 320],
              y: [0, 20, -15],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
            }}
          >
            <Leaf size={19} />
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}