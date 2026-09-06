"use client";

import { AnimatePresence, motion } from "motion/react";

type StickManGiftProps = {
  active: boolean;
};

export default function StickManGift({
  active,
}: StickManGiftProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="
            pointer-events-none
            fixed
            inset-0
            z-[90]
            overflow-hidden
          "
        >
          {/* ================================= */}
          {/* STICK MAN */}
          {/* ================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 70,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [70, 0, 0, 10],
            }}
            transition={{
              duration: 3.2,
              times: [0, 0.18, 0.82, 1],
              ease: "easeInOut",
            }}
            className="
              absolute
              bottom-[5vh]
              left-1/2
              h-[260px]
              w-[260px]
              -translate-x-1/2
              md:h-[340px]
              md:w-[340px]
            "
          >
            <svg
              viewBox="0 0 320 360"
              fill="none"
              className="h-full w-full overflow-visible"
            >
              {/* Head */}

              <motion.circle
                cx="155"
                cy="75"
                r="29"
                stroke="#171717"
                strokeWidth="2"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 0.62,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.15,
                }}
              />

              {/* Tiny hair */}

              <motion.path
                d="
                  M135 58
                  C143 43 158 39 171 47

                  M146 48
                  C151 39 158 36 164 39
                "
                stroke="#171717"
                strokeWidth="1.4"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 0.4,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                }}
              />

              {/* Body */}

              <motion.path
                d="
                  M155 105
                  C153 146 154 186 155 229
                "
                stroke="#171717"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 0.62,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.35,
                }}
              />

              {/* Left arm */}

              <motion.path
                d="
                  M154 135
                  C129 150 112 170 102 194
                "
                stroke="#171717"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 0.58,
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.55,
                }}
              />

              {/* Giving arm */}

              <motion.path
                d="
                  M156 137
                  C183 139 205 130 228 113
                  C241 104 250 98 261 94
                "
                stroke="#171717"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 0.7,
                }}
                transition={{
                  duration: 1,
                  delay: 0.65,
                  ease: "easeOut",
                }}
              />

              {/* Hand */}

              <motion.path
                d="
                  M259 94
                  C266 91 270 93 274 96

                  M261 94
                  C267 98 270 101 273 105
                "
                stroke="#171717"
                strokeWidth="1.4"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 0.6,
                }}
                transition={{
                  duration: 0.5,
                  delay: 1,
                }}
              />

              {/* Legs */}

              <motion.path
                d="
                  M155 228
                  C141 261 127 293 111 327

                  M155 228
                  C171 261 186 293 201 327
                "
                stroke="#171717"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: 0.6,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.45,
                }}
              />

              {/* Tiny blush / manga mark */}

              <motion.path
                d="
                  M129 81L137 79

                  M173 79L181 77
                "
                stroke="#7a263a"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.35, 0.35, 0],
                }}
                transition={{
                  duration: 2.7,
                  delay: 0.7,
                }}
              />
            </svg>
          </motion.div>

          {/* ================================= */}
          {/* FLOWER BEING OFFERED */}
          {/* ================================= */}

          <motion.div
            initial={{
              x: "18vw",
              y: "18vh",
              scale: 0.42,
              rotate: -8,
              opacity: 0,
            }}
            animate={{
              x: [
                "18vw",
                "16vw",
                "10vw",
                "3vw",
                "0vw",
                "0vw",
              ],

              y: [
                "18vh",
                "17vh",
                "12vh",
                "5vh",
                "0vh",
                "0vh",
              ],

              scale: [
                0.42,
                0.55,
                0.9,
                1.55,
                2.5,
                3.1,
              ],

              rotate: [
                -8,
                -6,
                -3,
                1,
                2,
                1,
              ],

              opacity: [
                0,
                1,
                1,
                1,
                1,
                0,
              ],
            }}
            transition={{
              duration: 3.1,
              times: [
                0,
                0.14,
                0.34,
                0.58,
                0.82,
                1,
              ],
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              absolute
              left-1/2
              top-1/2
              h-24
              w-24
              -translate-x-1/2
              -translate-y-1/2
              md:h-28
              md:w-28
            "
          >
            {/* Soft depth glow */}

            <motion.div
              animate={{
                scale: [0.8, 1.15, 1.4],
                opacity: [0.06, 0.12, 0.04],
              }}
              transition={{
                duration: 2.5,
                ease: "easeOut",
              }}
              className="
                absolute
                inset-[-30%]
                rounded-full
                bg-[#c97889]/20
                blur-xl
              "
            />

            <svg
              viewBox="0 0 120 150"
              fill="none"
              className="
                relative
                h-full
                w-full
                overflow-visible
              "
            >
              {/* Stem */}

              <motion.path
                d="
                  M60 137
                  C58 105 61 76 61 49
                "
                stroke="#66745f"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 0.7,
                }}
              />

              {/* Leaf */}

              <motion.path
                d="
                  M60 98
                  C44 84 31 87 26 95
                  C36 106 48 108 60 98Z
                "
                fill="#87977c"
                fillOpacity="0.48"
                stroke="#66745f"
                strokeWidth="1.3"
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                style={{
                  transformOrigin: "60px 98px",
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                }}
              />

              {/* Top petal */}

              <motion.path
                d="
                  M60 51
                  C48 38 50 18 60 13
                  C72 18 73 37 60 51Z
                "
                fill="#c86f83"
                fillOpacity="0.85"
                stroke="#913c52"
                strokeWidth="1.4"
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                style={{
                  transformOrigin: "60px 51px",
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.1,
                  ease: "easeOut",
                }}
              />

              {/* Right petal */}

              <motion.path
                d="
                  M61 51
                  C73 30 93 29 98 42
                  C102 56 80 64 61 51Z
                "
                fill="#d38191"
                fillOpacity="0.8"
                stroke="#913c52"
                strokeWidth="1.4"
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                style={{
                  transformOrigin: "61px 51px",
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.18,
                }}
              />

              {/* Left petal */}

              <motion.path
                d="
                  M60 51
                  C43 30 24 33 21 47
                  C20 62 43 65 60 51Z
                "
                fill="#bd6075"
                fillOpacity="0.8"
                stroke="#913c52"
                strokeWidth="1.4"
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                style={{
                  transformOrigin: "60px 51px",
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.24,
                }}
              />

              {/* Lower petals */}

              <motion.path
                d="
                  M60 50
                  C44 52 40 67 49 75
                  C58 80 63 65 60 50Z
                "
                fill="#d894a1"
                fillOpacity="0.75"
                stroke="#913c52"
                strokeWidth="1.2"
              />

              <motion.path
                d="
                  M61 50
                  C78 51 84 67 75 75
                  C65 80 59 65 61 50Z
                "
                fill="#c97889"
                fillOpacity="0.75"
                stroke="#913c52"
                strokeWidth="1.2"
              />

              {/* Center */}

              <motion.circle
                cx="60"
                cy="51"
                r="5"
                fill="#c29a59"
                stroke="#8f6d37"
                strokeWidth="1"
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: [0, 1.35, 1],
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                }}
              />
            </svg>
          </motion.div>

          {/* ================================= */}
          {/* LITTLE MESSAGE */}
          {/* ================================= */}

          <motion.p
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: [0, 0, 0.55, 0],
              y: [8, 8, 0, -4],
            }}
            transition={{
              duration: 3.1,
              times: [0, 0.35, 0.62, 1],
            }}
            className="
              absolute
              bottom-[11%]
              left-1/2
              -translate-x-1/2
              font-handwriting
              text-2xl
              text-black/50
              md:text-3xl
            "
          >
            for you.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}