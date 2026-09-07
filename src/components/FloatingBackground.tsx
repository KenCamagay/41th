"use client";

import {
  motion,
  useAnimationFrame,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

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

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

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
        strokeWidth="1.1"
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

function WindLine({
  delay = 0,
  opacity = 0.22,
  variant = 0,
  seed = 0,
}: {
  delay?: number;
  opacity?: number;
  variant?: number;
  seed?: number;
}) {
  const mainRef = useRef<SVGPathElement | null>(null);
  const upperRef = useRef<SVGPathElement | null>(null);
  const lowerRef = useRef<SVGPathElement | null>(null);

 
  const seeded = (n: number) => {
    const x = Math.sin(n * 999 + seed * 77.77) * 43758.5453;
    return x - Math.floor(x);
  };
  
  const duration =
  5600 +
  variant * 850 +
  seeded(1) * 1600;


  function makeGust(
    time: number,
    offsetY: number,
    lengthMultiplier: number,
    strengthMultiplier: number,
  ) {
    const delayedTime = Math.max(
      0,
      time - delay * 1000,
    );

    const progress =
      (delayedTime % duration) / duration;

    /*
      Gust travels RIGHT -> LEFT
      inside the local SVG.
    */
    const centerX =
      350 - progress * 400;

    /*
      Gust is not a full-width line.
      It has a head + trailing tail.
    */
    const gustLength =
    (105 + variant * 16 + seeded(2) * 42) *
    lengthMultiplier;

    const startX =
      centerX - gustLength;

    const endX =
      centerX + 20;

    const pointCount = 55;

    const points: string[] = [];

    /*
      Slowly changing gust intensity.
    */
    const breathing =
    0.78 +
    Math.sin(
      delayedTime * (0.00055 + seeded(3) * 0.00025) +
        variant * 1.3
    ) *
      (0.08 + seeded(4) * 0.1);

    /*
      Tiny turbulence.
    */
    const turbulence =
      Math.sin(
        delayedTime * (0.0009 + seeded(5) * 0.0005) +
          variant +
          seed * 0.3
      ) *
      (0.35 + seeded(6) * 0.9);

    for (
      let i = 0;
      i <= pointCount;
      i++
    ) {
      const t = i / pointCount;

      const x =
        startX +
        (endX - startX) * t;

      /*
        Smooth fade of deformation
        at both ends.

        strongest near middle/front
      */
      const envelope =
        Math.sin(Math.PI * t);

      /*
        More movement toward the front
        of the gust.
      */
      const frontStrength =
        0.35 + t * 0.65;

      /*
        Large lazy bend
      */
      const bigCurve =
        Math.sin(
          t * Math.PI * 1.55 +
            delayedTime * 0.0014,
        );

      /*
        Small secondary turbulence
      */
      const detail =
        Math.sin(
          t * Math.PI * 3.7 -
            delayedTime * 0.0008,
        ) * 0.24;

     const amplitude =
      (6.5 + seeded(7) * 4.5) *
      strengthMultiplier *
      breathing;

      const y =
        40 +
        offsetY +
        envelope *
          frontStrength *
          amplitude *
          (bigCurve + detail) +
        turbulence *
          envelope *
          0.35;

      points.push(
        `${x.toFixed(2)} ${y.toFixed(2)}`,
      );
    }

    return `M ${points.join(" L ")}`;
  }

  useAnimationFrame((time) => {
    if (mainRef.current) {
      mainRef.current.setAttribute(
        "d",
        makeGust(
          time,
          0,
          1,
          1,
        ),
      );
    }

    if (upperRef.current) {
      upperRef.current.setAttribute(
        "d",
        makeGust(
          time + 180,
          -10,
          0.72,
          0.65,
        ),
      );
    }

    if (lowerRef.current) {
      lowerRef.current.setAttribute(
        "d",
        makeGust(
          time + 380,
          11,
          0.58,
          0.52,
        ),
      );
    }
  });

  return (
    <motion.svg
      viewBox="0 0 300 80"
      fill="none"
      className="
        h-full
        w-full
        overflow-visible
      "
      animate={{
        opacity: [
          0,
          opacity * 0.7,
          opacity,
          opacity,
          opacity * 0.65,
          0,
        ],
      }}
      transition={{
        duration:
          duration / 1000,

        delay,

        repeat: Infinity,

        times: [
          0,
          0.12,
          0.28,
          0.65,
          0.85,
          1,
        ],

        ease: "easeInOut",
      }}
    >
      {/* MAIN GUST */}
      <path
        ref={mainRef}
        stroke="#171717"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />

      {/* SMALL UPPER STREAK */}
      <path
        ref={upperRef}
        stroke="#171717"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* SMALL LOWER WINE STREAK */}
     <path
      ref={lowerRef}
      stroke="#7a263a"
      strokeWidth="0.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.72"
    />
    </motion.svg>
  );
}

export default function FloatingBackground() {
  const [windGroups, setWindGroups] =
  useState<
    {
      id: number;
      top: number;
      leftStart: number;
      width: number;
      scale: number;
      opacity: number;
      delay: number;
      duration: number;
      repeatDelay: number;
      yDrift: number;
      rotate: number;
      variant: number;
    }[]
  >([]);

useEffect(() => {
  const groups = Array.from(
    { length: 7 },
    (_, index) => ({
      id: index,

      top: randomBetween(8, 82),

      leftStart: randomBetween(
        -50,
        -20,
      ),

      width: randomBetween(
        150,
        270,
      ),

      scale: randomBetween(
        0.75,
        1.15,
      ),

      /*
        IMPORTANT:
        much more subtle than before
      */
      opacity: randomBetween(
        0.08,
        0.055,
      ),

      delay: randomBetween(
        0,
        7,
      ),

      duration: randomBetween(
        13,
        20,
      ),

      repeatDelay: randomBetween(
        2,
        6,
      ),

      yDrift: randomBetween(
        -10,
        10,
      ),

      rotate: randomBetween(
        -4,
        4,
      ),

      variant:
        Math.floor(
          randomBetween(0, 3),
        ),
    }),
  );

  setWindGroups(groups);
}, []);
  
  return (
    
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      
      {/* ================================= */}
      {/* WIND STREAMS */}
      {/* ================================= */}

      {windGroups.map((group) => (
        <motion.div
          key={group.id}
          className="
            pointer-events-none
            absolute
          "
          style={{
            top: `${group.top}%`,
            left: `${group.leftStart}%`,
            width: `${group.width}px`,
            rotate: `${group.rotate}deg`,
            scale: group.scale,
          }}
          animate={{
            x: [
              "0vw",
              "12vw",
              "42vw",
              "82vw",
              "135vw",
            ],

            y: [
              0,
              group.yDrift * 0.25,
              group.yDrift,
              group.yDrift * 0.35,
              0,
            ],

            opacity: [
              0,
              group.opacity * 0.85,
              group.opacity,
              group.opacity * 0.8,
              0,
            ],
          }}
          transition={{
            duration: group.duration,
            delay: group.delay,
            repeat: Infinity,
            repeatDelay:
              group.repeatDelay,

            times: [
              0,
              0.14,
              0.4,
              0.78,
              1,
            ],

            ease: [
              0.37,
              0,
              0.63,
              1,
            ],
          }}
        >
          <WindLine
            delay={0}
            opacity={1}
            variant={group.variant}
            seed={group.id}
          />
        </motion.div>
      ))}
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