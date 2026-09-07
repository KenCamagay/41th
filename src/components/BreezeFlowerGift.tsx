"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useState,
} from "react";

type Point = {
  x: number;
  y: number;
};

type BreezeFlowerGiftProps = {
  active: boolean;
  sourcePoint: Point | null;
  onComplete?: () => void;
};

export default function BreezeFlowerGift({
  active,
  sourcePoint,
  onComplete,
}: BreezeFlowerGiftProps) {
  const [viewport, setViewport] =
    useState({
      width: 0,
      height: 0,
    });

  useEffect(() => {
    const update = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update();
    window.addEventListener(
      "resize",
      update,
    );

    return () => {
      window.removeEventListener(
        "resize",
        update,
      );
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const timer = window.setTimeout(() => {
      onComplete?.();
    }, 3900);

    return () => {
      window.clearTimeout(timer);
    };
  }, [active, onComplete]);

  if (
    !active ||
    !sourcePoint ||
    viewport.width === 0
  ) {
    return null;
  }

  const startX = sourcePoint.x - 35;
  const startY = sourcePoint.y - 100;

  const endX =
    viewport.width / 2 - 42;

  const endY =
    viewport.height * 0.38;

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
            z-[100]
            overflow-hidden
          "
        >
          <motion.div
            initial={{
              left: startX,
              top: startY,
              opacity: 0,
              scale: 0.9,
              rotate: -8,
            }}
            animate={{
              left: [
                startX,
                startX + 28,
                viewport.width * 0.68,
                endX,
                endX,
              ],
              top: [
                startY,
                startY - 30,
                startY - 130,
                endY - 10,
                endY,
              ],
              scale: [
                0.9,
                1.02,
                1.18,
                2.2,
                4,
              ],
              rotate: [
                -8,
                8,
                -4,
                2,
                0,
              ],
              opacity: [
                0,
                1,
                1,
                1,
                0,
              ],
            }}
            transition={{
              duration: 3.8,
              times: [
                0,
                0.12,
                0.42,
                0.8,
                1,
              ],
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              absolute
              h-[100px]
              w-[70px]
            "
            style={{
              transformOrigin:
                "50% 100%",
            }}
          >
            {/* Breeze trails */}
            <motion.svg
              viewBox="0 0 260 120"
              fill="none"
              className="
                absolute
                left-[-150px]
                top-[8px]
                h-[120px]
                w-[260px]
                overflow-visible
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [
                  0,
                  0.7,
                  0.55,
                  0.3,
                  0,
                ],
              }}
              transition={{
                duration: 3.8,
                times: [
                  0,
                  0.18,
                  0.45,
                  0.78,
                  1,
                ],
              }}
            >
              <motion.path
                d="
                  M12 62
                  C58 45 90 52 126 64
                  C156 74 186 73 247 52
                "
                stroke="#171717"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 0.55, 0.3],
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.08,
                }}
              />

              <motion.path
                d="
                  M28 79
                  C72 67 112 70 147 81
                  C183 93 210 92 254 75
                "
                stroke="#7a263a"
                strokeWidth="0.8"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 0.45, 0.18],
                }}
                transition={{
                  duration: 1.9,
                  delay: 0.2,
                }}
              />

              <motion.path
                d="
                  M35 44
                  C77 31 115 33 149 44
                  C184 55 215 56 248 46
                "
                stroke="#171717"
                strokeWidth="0.7"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 0.28, 0.12],
                }}
                transition={{
                  duration: 1.6,
                  delay: 0.28,
                }}
              />
            </motion.svg>

            {/* Small petals */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0.7, 0],
              }}
              transition={{
                duration: 3.2,
                times: [
                  0,
                  0.2,
                  0.7,
                  1,
                ],
              }}
              className="absolute inset-0"
            >
              <motion.div
                animate={{
                  x: [-10, -50, -85],
                  y: [8, -16, -35],
                  rotate: [0, 18, -12],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.2,
                }}
                className="
                  absolute
                  left-[12px]
                  top-[22px]
                  h-3
                  w-2
                  rounded-full
                  border
                  border-[#7a263a]/40
                "
              />

              <motion.div
                animate={{
                  x: [-4, -42, -70],
                  y: [15, 20, 0],
                  rotate: [0, -10, 22],
                  opacity: [0, 0.55, 0],
                }}
                transition={{
                  duration: 2.7,
                  delay: 0.35,
                }}
                className="
                  absolute
                  left-[22px]
                  top-[28px]
                  h-3
                  w-2
                  rounded-full
                  border
                  border-[#7a263a]/30
                "
              />
            </motion.div>

            {/* Flower */}
            <svg
              viewBox="0 0 70 105"
              fill="none"
              className="relative h-full w-full overflow-visible"
            >
              {/* stem */}
              <path
                d="
                  M35 100
                  C34 82 36 64 35 48
                "
                stroke="#66745f"
                strokeWidth="1.7"
                strokeLinecap="round"
              />

              {/* leaf */}
              <path
                d="
                  M35 75
                  C24 65 15 67 12 73
                  C19 82 28 82 35 75Z
                "
                fill="#87977c"
                fillOpacity="0.55"
                stroke="#66745f"
                strokeWidth="1"
              />

              {/* top petal */}
              <path
                d="
                  M35 49
                  C26 38 28 22 36 18
                  C45 22 45 39 35 49Z
                "
                fill="#c86f83"
                fillOpacity="0.9"
                stroke="#913c52"
                strokeWidth="1.2"
              />

              {/* right petal */}
              <path
                d="
                  M36 49
                  C47 33 61 35 64 44
                  C66 54 51 59 36 49Z
                "
                fill="#d38191"
                fillOpacity="0.86"
                stroke="#913c52"
                strokeWidth="1.2"
              />

              {/* left petal */}
              <path
                d="
                  M35 49
                  C23 34 8 37 7 47
                  C7 58 22 59 35 49Z
                "
                fill="#bd6075"
                fillOpacity="0.86"
                stroke="#913c52"
                strokeWidth="1.2"
              />

              {/* lower petals */}
              <path
                d="
                  M35 49
                  C24 50 21 60 27 66
                  C34 70 36 59 35 49Z
                "
                fill="#d894a1"
                fillOpacity="0.82"
                stroke="#913c52"
                strokeWidth="1"
              />

              <path
                d="
                  M36 49
                  C47 49 50 60 44 66
                  C37 70 35 59 36 49Z
                "
                fill="#c97889"
                fillOpacity="0.82"
                stroke="#913c52"
                strokeWidth="1"
              />

              {/* center */}
              <circle
                cx="35.5"
                cy="49"
                r="4"
                fill="#c29a59"
                stroke="#8f6d37"
                strokeWidth="0.8"
              />
            </svg>
          </motion.div>

          {/* little note */}
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: [0, 0, 1, 1, 0],
              y: [12, 12, 0, 0, -6],
            }}
            transition={{
              duration: 3.8,
              times: [
                0,
                0.58,
                0.72,
                0.9,
                1,
              ],
            }}
            className="
              absolute
              bottom-[9%]
              left-1/2
              -translate-x-1/2
              text-center
            "
          >
            <p
              className="
                font-handwriting
                text-3xl
                text-black/55
                md:text-4xl
              "
            >
              for you.
            </p>

            <motion.svg
              viewBox="0 0 180 30"
              fill="none"
              className="
                mx-auto
                mt-1
                w-32
              "
            >
              <motion.path
                d="
                  M5 18
                  C54 11 110 23 175 12
                "
                stroke="#7a263a"
                strokeWidth="0.8"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: [0, 1, 1],
                }}
                transition={{
                  duration: 1,
                  delay: 2.55,
                }}
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}