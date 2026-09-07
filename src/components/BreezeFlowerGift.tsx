"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

type LandingRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type BreezeFlowerGiftProps = {
  active: boolean;
  sourcePoint: Point | null;

  getLandingRect?: () => DOMRect | null;

  onEndReveal?: () => void;
  onRequestScroll?: () => void;
  onComplete?: () => void;
};

type Stage =
  | "flying"
  | "resting"
  | "handoff"
  | "landing";

/* ========================================= */
/* PREMIUM FINAL FLOWER                      */
/* ========================================= */

/*
  Exported so FinalVoiceNote can render
  EXACTLY the same flower after it lands.
*/
export function PremiumFinalFlower({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 140 190"
      fill="none"
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      {/* soft halo */}
      <circle
        cx="70"
        cy="60"
        r="42"
        fill="#c8a95e"
        opacity="0.035"
      />

      {/* main stem */}
      <path
        d="
          M70 180
          C67 154 72 130 69 105
          C68 89 70 75 70 64
        "
        stroke="#9a8148"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.76"
      />

      {/* imperfect second stem */}
      <path
        d="
          M72 180
          C69 154 74 130 71 106
          C70 90 72 76 71 65
        "
        stroke="#171717"
        strokeWidth="0.42"
        strokeLinecap="round"
        opacity="0.18"
      />

      {/* left leaf */}
      <path
        d="
          M69 126
          C52 112 34 114 25 125
          C37 141 55 141 69 126Z
        "
        fill="#b6a56e"
        fillOpacity="0.08"
        stroke="#907840"
        strokeWidth="0.9"
        strokeOpacity="0.72"
      />

      {/* left leaf vein */}
      <path
        d="
          M30 126
          C42 126 54 126 67 126
        "
        stroke="#171717"
        strokeWidth="0.4"
        strokeLinecap="round"
        opacity="0.18"
      />

      {/* right leaf */}
      <path
        d="
          M71 150
          C85 138 99 140 107 149
          C97 161 83 162 71 150Z
        "
        fill="#b6a56e"
        fillOpacity="0.065"
        stroke="#907840"
        strokeWidth="0.85"
        strokeOpacity="0.66"
      />

      {/* ================================= */}
      {/* OUTER BLOOM */}
      {/* ================================= */}

      <path
        d="
          M70 69
          C49 75 29 65 26 49
          C24 35 36 26 49 30
          C59 33 65 44 70 55
        "
        fill="#d5bc7b"
        fillOpacity="0.1"
        stroke="#a1874b"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="
          M70 69
          C91 75 111 65 114 49
          C116 35 104 26 91 30
          C81 33 75 44 70 55
        "
        fill="#d5bc7b"
        fillOpacity="0.1"
        stroke="#a1874b"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="
          M70 62
          C57 50 58 29 69 21
          C82 28 82 50 70 62Z
        "
        fill="#dfca91"
        fillOpacity="0.11"
        stroke="#a1874b"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* lower petals */}
      <path
        d="
          M69 66
          C53 60 41 67 43 79
          C47 90 61 87 70 75
        "
        fill="#c9aa65"
        fillOpacity="0.08"
        stroke="#97783d"
        strokeWidth="0.9"
      />

      <path
        d="
          M71 66
          C87 60 99 67 97 79
          C93 90 79 87 70 75
        "
        fill="#c9aa65"
        fillOpacity="0.08"
        stroke="#97783d"
        strokeWidth="0.9"
      />

      {/* inner petals */}
      <path
        d="
          M70 67
          C59 60 60 47 69 42
          C78 47 79 59 70 67Z
        "
        fill="#d1b36e"
        fillOpacity="0.13"
        stroke="#94763d"
        strokeWidth="0.85"
      />

      <path
        d="
          M70 68
          C61 66 56 72 60 79
          C66 83 72 77 70 68Z
        "
        fill="#c3a35b"
        fillOpacity="0.16"
        stroke="#8e7137"
        strokeWidth="0.8"
      />

      <path
        d="
          M70 68
          C78 64 84 69 81 76
          C77 80 72 77 70 68Z
        "
        fill="#ceb06b"
        fillOpacity="0.13"
        stroke="#8e7137"
        strokeWidth="0.75"
      />

      {/* center */}
      <circle
        cx="70"
        cy="68"
        r="4"
        fill="#b58e43"
        fillOpacity="0.8"
        stroke="#80642d"
        strokeWidth="0.7"
      />

      {/* manga / sketch accents */}
      <g opacity="0.18">
        <path
          d="
            M45 43C54 44 61 49 65 56
            M95 43C86 44 79 49 75 56
            M55 72C61 69 65 68 70 67
            M85 72C79 69 75 68 70 67
          "
          stroke="#171717"
          strokeWidth="0.42"
          strokeLinecap="round"
        />

        <path
          d="
            M54 34L59 43
            M86 34L81 43
            M46 59L58 62
            M94 59L82 62
          "
          stroke="#947940"
          strokeWidth="0.38"
          strokeLinecap="round"
        />
      </g>

      {/* tiny shimmer */}
      <path
        d="
          M106 31L109 23
          M110 31L118 28
        "
        stroke="#c5a55a"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/* ========================================= */
/* ORIGINAL FLOWER                           */
/* ========================================= */

function TravellingFlower() {
  return (
    <svg
      viewBox="0 0 94 138"
      fill="none"
      className="
        h-full
        w-full
        overflow-visible
        drop-shadow-[0_8px_18px_rgba(0,0,0,0.055)]
      "
    >
      <path
        d="
          M47 132
          C46 107 48 83 47 62
        "
        stroke="#66745f"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="
          M47 98
          C33 85 20 88 15 96
          C25 109 38 109 47 98Z
        "
        fill="#87977c"
        fillOpacity="0.5"
        stroke="#66745f"
        strokeWidth="1"
      />

      <path
        d="
          M47 62
          C35 48 39 27 48 22
          C59 27 59 50 47 62Z
        "
        fill="#c86f83"
        fillOpacity="0.9"
        stroke="#913c52"
        strokeWidth="1.25"
      />

      <path
        d="
          M48 62
          C63 41 81 45 85 56
          C87 69 68 75 48 62Z
        "
        fill="#d38191"
        fillOpacity="0.86"
        stroke="#913c52"
        strokeWidth="1.25"
      />

      <path
        d="
          M47 62
          C31 43 12 47 11 59
          C11 72 30 74 47 62Z
        "
        fill="#bd6075"
        fillOpacity="0.86"
        stroke="#913c52"
        strokeWidth="1.25"
      />

      <path
        d="
          M47 62
          C33 63 29 77 37 85
          C46 90 49 76 47 62Z
        "
        fill="#d894a1"
        fillOpacity="0.8"
        stroke="#913c52"
        strokeWidth="1"
      />

      <path
        d="
          M48 62
          C62 62 66 77 58 85
          C49 90 46 76 48 62Z
        "
        fill="#c97889"
        fillOpacity="0.8"
        stroke="#913c52"
        strokeWidth="1"
      />

      <circle
        cx="47.5"
        cy="62"
        r="4.8"
        fill="#c29a59"
        stroke="#8f6d37"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/* ========================================= */
/* CLICK PETALS                              */
/* ========================================= */

function PetalBurst({
  show,
}: {
  show: boolean;
}) {
  const petals = [
    [-110, -80, -45, 0],
    [105, -66, 38, 0.05],
    [-86, 78, 52, 0.1],
    [88, 92, -38, 0.16],
    [10, -125, 22, 0.2],
    [-125, 18, 68, 0.26],
    [120, 22, -58, 0.32],
  ];

  return (
    <AnimatePresence>
      {show &&
        petals.map(
          (
            [x, y, rotate, delay],
            index,
          ) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 0.3,
              }}
              animate={{
                opacity: [
                  0,
                  0.72,
                  0.5,
                  0,
                ],
                x: [
                  0,
                  x * 0.5,
                  x,
                ],
                y: [
                  0,
                  y * 0.45,
                  y,
                ],
                rotate: [
                  0,
                  rotate * 0.55,
                  rotate,
                ],
                scale: [
                  0.3,
                  1,
                  0.8,
                ],
              }}
              transition={{
                duration: 1.65,
                delay,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                absolute
                left-1/2
                top-[38%]
                h-3
                w-2
                rounded-[65%_35%_60%_40%]
                border
                border-[#a98c4f]/45
                bg-[#d4be87]/20
              "
            />
          ),
        )}
    </AnimatePresence>
  );
}

/* ========================================= */
/* MAIN                                      */
/* ========================================= */

export default function BreezeFlowerGift({
  active,
  sourcePoint,
  getLandingRect,
  onEndReveal,
  onRequestScroll,
  onComplete,
}: BreezeFlowerGiftProps) {
 const [viewport, setViewport] =
  useState({
    width: 0,
    height: 0,
    offsetTop: 0,
  });

  const [stage, setStage] =
    useState<Stage>("flying");

  const [
    showFinalFlower,
    setShowFinalFlower,
  ] = useState(false);

  const [
    landingRect,
    setLandingRect,
  ] =
    useState<LandingRect | null>(
      null,
    );

  /*
    Callback refs prevent parent re-renders
    from restarting our timers.
  */
  const getLandingRectRef =
    useRef(getLandingRect);

  const onEndRevealRef =
    useRef(onEndReveal);

  const onRequestScrollRef =
    useRef(onRequestScroll);

  const onCompleteRef =
    useRef(onComplete);

  useEffect(() => {
    getLandingRectRef.current =
      getLandingRect;
  }, [getLandingRect]);

  useEffect(() => {
    onEndRevealRef.current =
      onEndReveal;
  }, [onEndReveal]);

  useEffect(() => {
    onRequestScrollRef.current =
      onRequestScroll;
  }, [onRequestScroll]);

  useEffect(() => {
    onCompleteRef.current =
      onComplete;
  }, [onComplete]);

  /* ======================================= */
  /* VIEWPORT                                */
  /* ======================================= */

  useEffect(() => {
  const update = () => {
    const visual =
      window.visualViewport;

    setViewport({
      width:
        visual?.width ??
        window.innerWidth,

      height:
        visual?.height ??
        window.innerHeight,

      offsetTop:
        visual?.offsetTop ?? 0,
    });
  };

  update();

  window.addEventListener(
    "resize",
    update,
  );

  window.visualViewport?.addEventListener(
    "resize",
    update,
  );

  window.visualViewport?.addEventListener(
    "scroll",
    update,
  );

  return () => {
    window.removeEventListener(
      "resize",
      update,
    );

    window.visualViewport?.removeEventListener(
      "resize",
      update,
    );

    window.visualViewport?.removeEventListener(
      "scroll",
      update,
    );
  };
}, []);

  /* ======================================= */
  /* START                                   */
  /* ======================================= */

  useEffect(() => {
    if (
      !active ||
      !sourcePoint
    ) {
      /*
        IMPORTANT:
        Completely prepare the component
        for another run.
      */
      setStage("flying");
      setShowFinalFlower(false);
      setLandingRect(null);

      return;
    }

    setStage("flying");
    setShowFinalFlower(false);
    setLandingRect(null);

    /*
      Premium flower starts appearing
      shortly before the breeze finishes.
    */
    const timer =
      window.setTimeout(() => {
        setShowFinalFlower(true);
      }, 3300);

    return () =>
      window.clearTimeout(timer);
  }, [
    active,
    sourcePoint,
  ]);

  /* ======================================= */
  /* CLICK HANDOFF                           */
  /* ======================================= */

  useEffect(() => {
    if (stage !== "handoff") {
      return;
    }

    /*
      Mount END first.
    */
    onEndRevealRef.current?.();

    /*
      Then scroll to END.
    */
    const scrollTimer =
      window.setTimeout(() => {
        onRequestScrollRef.current?.();
      }, 120);

    /*
      Give smooth scroll time to move.
      Then locate the flower's permanent home.
    */
    let pollInterval = 0;

    const landingTimer =
      window.setTimeout(() => {
        let attempts = 0;

        pollInterval =
          window.setInterval(() => {
            attempts += 1;

            const rect =
              getLandingRectRef.current?.();

            if (rect) {
              setLandingRect({
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
              });

              window.clearInterval(
                pollInterval,
              );

              setStage("landing");
            }

            if (attempts >= 20) {
              window.clearInterval(
                pollInterval,
              );
            }
          }, 80);
      }, 1250);

    return () => {
      window.clearTimeout(
        scrollTimer,
      );

      window.clearTimeout(
        landingTimer,
      );

      if (pollInterval) {
        window.clearInterval(
          pollInterval,
        );
      }
    };
  }, [stage]);

  if (
    !active ||
    !sourcePoint ||
    viewport.width === 0
  ) {
    return null;
  }

  /* ======================================= */
  /* POSITIONS                               */
  /* ======================================= */

  const flowerWidth = 94;
  const flowerHeight = 138;

  const startX =
    sourcePoint.x -
    flowerWidth / 2;

  const startY =
    sourcePoint.y - 62;

 const isMobile =
  viewport.width < 640;

/*
  Mobile:
  - slightly smaller
  - noticeably lower
  - respects browser chrome

  Desktop:
  - remains large/cinematic
*/
const restingScale =
  isMobile ? 2.25 : 2.6;

const restX =
  viewport.width / 2 -
  flowerWidth / 2;

const restY =
  viewport.offsetTop +
  viewport.height *
    (isMobile ? 0.43 : 0.37);

  const landingX =
    landingRect
      ? landingRect.left +
        landingRect.width / 2 -
        flowerWidth / 2
      : restX;

  const landingY =
    landingRect
      ? landingRect.top +
        landingRect.height / 2 -
        flowerHeight / 2
      : restY;

  /*
    Match fixed flower to the
    final target's actual size.
  */
  const landingScale =
    landingRect
      ? Math.max(
          1,
          Math.min(
            3,
            landingRect.width /
              flowerWidth,
          ),
        )
      : 1.7;

  const landingCenterX =
    landingRect
      ? landingRect.left +
        landingRect.width / 2
      : viewport.width / 2;

  const landingCenterY =
    landingRect
      ? landingRect.top +
        landingRect.height / 2
      : viewport.height / 2;

  const restCenterX =
    restX + flowerWidth / 2;

  const restCenterY =
    restY + flowerHeight * 0.78;

  const isFlying =
    stage === "flying";

  const isResting =
    stage === "resting";

  const isHandoff =
    stage === "handoff";

  const isLanding =
    stage === "landing";

  /* ======================================= */
  /* RENDER                                  */
  /* ======================================= */

  return (
    <AnimatePresence>
      {active && (
        <motion.div
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
            pointer-events-none
            fixed
            inset-0
            z-[110]
            overflow-hidden
          "
        >
          {/* ================================= */}
          {/* SUBTLE CAMERA VEIL */}
          {/* ================================= */}

          <motion.div
            className="
              absolute
              inset-0
              bg-[#f3efe7]
            "
            initial={{
              opacity: 0,
            }}
            animate={
              isFlying
                ? {
                    opacity: [
                      0,
                      0.025,
                      0.045,
                    ],
                  }
                : isResting
                  ? {
                      opacity: [
                        0.045,
                        0.065,
                        0.045,
                      ],
                    }
                  : {
                      opacity: [
                        0.05,
                        0.11,
                        0.03,
                      ],
                    }
            }
            transition={{
              duration:
                isFlying
                  ? 4.25
                  : 2,
            }}
          />

          {/* ================================= */}
          {/* GOLD TRAIL TO FINAL PAGE */}
          {/* ================================= */}

          <AnimatePresence>
            {isLanding &&
              landingRect && (
                <svg
                  viewBox={`0 0 ${viewport.width} ${viewport.height}`}
                  preserveAspectRatio="none"
                  className="
                    pointer-events-none
                    fixed
                    inset-0
                    z-[115]
                    h-full
                    w-full
                    overflow-visible
                  "
                >
                  <motion.path
                    d={`
                      M ${restCenterX} ${restCenterY}
                      C ${restCenterX + 90} ${restCenterY + 70},
                        ${landingCenterX - 110} ${landingCenterY - 70},
                        ${landingCenterX} ${landingCenterY}
                    `}
                    fill="none"
                    stroke="#b49550"
                    strokeWidth="1"
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      opacity: [
                        0,
                        0.48,
                        0.18,
                      ],
                    }}
                    transition={{
                      duration: 1.35,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                  />

                  <motion.path
                    d={`
                      M ${restCenterX - 4} ${restCenterY + 3}
                      C ${restCenterX + 80} ${restCenterY + 82},
                        ${landingCenterX - 100} ${landingCenterY - 56},
                        ${landingCenterX - 3} ${landingCenterY + 3}
                    `}
                    fill="none"
                    stroke="#171717"
                    strokeWidth="0.35"
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      opacity: [
                        0,
                        0.16,
                        0.06,
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.08,
                    }}
                  />
                </svg>
              )}
          </AnimatePresence>

          {/* ================================= */}
          {/* FOR YOU */}
          {/* ================================= */}

          <AnimatePresence>
            {isResting && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 8,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="
                  absolute
                  bottom-[8%]
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
                      C54 11
                      110 23
                      175 12
                    "
                    stroke="#a78948"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                    }}
                    transition={{
                      duration: 1,
                    }}
                  />
                </motion.svg>

                <motion.p
                  animate={{
                    opacity: [
                      0.28,
                      0.58,
                      0.28,
                    ],
                  }}
                  transition={{
                    duration: 1.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    chapter-label
                    mt-5
                    text-black/30
                  "
                >
                  tap the flower
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================================= */}
          {/* FLOWER ROOT */}
          {/* ================================= */}

          <motion.div
            onClick={() => {
              if (isResting) {
                setStage("handoff");
              }
            }}
            onAnimationComplete={() => {
              if (
                stage === "flying"
              ) {
                setStage("resting");
              }

              if (
                stage === "landing"
              ) {
                onCompleteRef.current?.();
              }
            }}
            initial={{
              left: startX,
              top: startY,
              scale: 0.82,
              rotate: -11,
              opacity: 0,
            }}
            animate={
              isFlying
                ? {
                    /*
                      pluck
                      ↓
                      drift back
                      ↓
                      catches gust
                      ↓
                      arc
                      ↓
                      comes toward viewer
                    */
                    left: [
                      startX,
                      startX - 18,
                      startX + 28,
                      viewport.width *
                        0.62,
                      restX + 18,
                      restX,
                    ],

                    top: [
                      startY,
                      startY + 10,
                      startY - 30,
                      startY - 145,
                      restY - 15,
                      restY,
                    ],

                    scale: [
                      0.82,
                      0.9,
                      1,
                      1.2,
                      1.75,
                      restingScale,
                    ],

                    rotate: [
                      -11,
                      -18,
                      9,
                      -7,
                      2,
                      0,
                    ],

                    opacity: [
                      0,
                      1,
                      1,
                      1,
                      1,
                      1,
                    ],
                  }
                : isResting
                  ? {
                      left: restX,
                      top: restY,

                      scale: [
                        restingScale,
                        restingScale + 0.055,
                        restingScale,
                        restingScale + 0.035,
                        restingScale,
                      ],

                      rotate: [
                        0,
                        0.55,
                        0,
                        -0.4,
                        0,
                      ],

                      y: [
                        0,
                        -4,
                        0,
                        3,
                        0,
                      ],

                      opacity: 1,
                    }
                  : isHandoff
                    ? {
                        /*
                          Flower remains in front
                          while END is revealed
                          and page scrolls.
                        */
                        left: restX,
                        top: restY,

                        scale: [
                          restingScale,
                          restingScale + 0.16,
                          restingScale + 0.06,
                        ],
                        rotate: [
                          0,
                          -2,
                          1,
                        ],

                        y: [
                          0,
                          -9,
                          -4,
                        ],

                        opacity: 1,
                      }
                    : {
                        /*
                          Actual landing.
                        */
                        left: landingX,
                        top: landingY,
                        scale:
                          landingScale,
                        rotate: 0,
                        y: 0,
                        opacity: 1,
                      }
            }
            transition={
              isFlying
                ? {
                    duration: 4.25,
                    times: [
                      0,
                      0.08,
                      0.2,
                      0.56,
                      0.83,
                      1,
                    ],
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }
                : isResting
                  ? {
                      duration: 5.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : isHandoff
                    ? {
                        duration: 1.5,
                        ease: [
                          0.16,
                          1,
                          0.3,
                          1,
                        ],
                      }
                    : {
                        duration: 1.35,
                        ease: [
                          0.16,
                          1,
                          0.3,
                          1,
                        ],
                      }
            }
            style={{
              transformOrigin:
                "50% 88%",
            }}
            className={`
              absolute
              z-[120]
              h-[138px]
              w-[94px]

              ${
                isResting
                  ? "pointer-events-auto cursor-pointer"
                  : "pointer-events-none"
              }
            `}
          >
            {/* ================================= */}
            {/* BREEZE LINES */}
            {/* ================================= */}

            <motion.svg
              viewBox="0 0 340 170"
              fill="none"
              className="
                absolute
                left-[-220px]
                top-[-12px]
                h-[170px]
                w-[340px]
                overflow-visible
              "
              animate={
                isFlying
                  ? {
                      opacity: [
                        0,
                        0.78,
                        0.62,
                        0.2,
                        0,
                      ],
                      x: [
                        0,
                        -12,
                        -28,
                        -44,
                        -58,
                      ],
                    }
                  : {
                      opacity: 0,
                    }
              }
              transition={{
                duration: 3.65,
                ease: "easeOut",
              }}
            >
              <motion.path
                d="
                  M12 96
                  C62 77 100 84 135 98
                  C170 112 208 110 272 83
                  C294 74 313 72 328 72
                "
                stroke="#171717"
                strokeWidth="0.9"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: [
                    0,
                    0.5,
                    0.12,
                  ],
                }}
                transition={{
                  duration: 1.95,
                  delay: 0.12,
                }}
              />

              <motion.path
                d="
                  M30 118
                  C80 105 122 112 160 126
                  C198 139 238 136 323 108
                "
                stroke="#a78948"
                strokeWidth="0.72"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: [
                    0,
                    0.36,
                    0.08,
                  ],
                }}
                transition={{
                  duration: 2.05,
                  delay: 0.28,
                }}
              />

              <motion.path
                d="
                  M42 70
                  C90 54 130 59 168 75
                  C207 91 247 91 322 67
                "
                stroke="#171717"
                strokeWidth="0.6"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: [
                    0,
                    0.21,
                    0.05,
                  ],
                }}
                transition={{
                  duration: 1.78,
                  delay: 0.42,
                }}
              />
            </motion.svg>

            {/* ================================= */}
            {/* TRANSFORMATION EFFECT */}
            {/* ================================= */}

            <AnimatePresence>
              {showFinalFlower &&
                isFlying && (
                  <>
                    <motion.div
                      initial={{
                        scale: 0.2,
                        opacity: 0,
                        rotate: -10,
                      }}
                      animate={{
                        scale: [
                          0.2,
                          1.15,
                          1.55,
                        ],
                        opacity: [
                          0,
                          0.55,
                          0,
                        ],
                        rotate: [
                          -10,
                          4,
                          9,
                        ],
                      }}
                      transition={{
                        duration: 1.05,
                      }}
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[39%]
                        h-32
                        w-32
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-[48%_52%_46%_54%]
                        border
                        border-[#c0a25a]/45
                      "
                    />

                    <motion.div
                      initial={{
                        scale: 0.4,
                        opacity: 0,
                      }}
                      animate={{
                        scale: [
                          0.4,
                          1.4,
                          1.8,
                        ],
                        opacity: [
                          0,
                          0.2,
                          0,
                        ],
                      }}
                      transition={{
                        duration: 0.95,
                      }}
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[39%]
                        h-32
                        w-32
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[#c6a65c]/20
                        blur-xl
                      "
                    />
                  </>
                )}
            </AnimatePresence>

            {/* petals remain during handoff */}
            <PetalBurst
              show={
                isHandoff ||
                isLanding
              }
            />

            {/* ================================= */}
            {/* TAG */}
            {/* ================================= */}

            <AnimatePresence>
              {isResting && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.38,
                    rotate: 6,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 0.38,
                    rotate: [
                      6,
                      7.5,
                      6,
                      5,
                      6,
                    ],
                    y: [
                      0,
                      1.5,
                      0,
                      -1,
                      0,
                    ],
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.4,
                    },
                    rotate: {
                      duration: 3.8,
                      repeat: Infinity,
                    },
                    y: {
                      duration: 3.4,
                      repeat: Infinity,
                    },
                  }}
                  className="
                    absolute
                    right-[-22px]
                    top-[54px]
                    z-30
                  "
                >
                  <div
                    className="
                      absolute
                      -left-4
                      top-[8px]
                      h-px
                      w-11
                      rotate-[17deg]
                      bg-black/20
                    "
                  />

                  <div
                    className="
                      border
                      border-[#a78948]/20
                      bg-[#f3efe7]/95
                      px-2
                      py-1
                    "
                  >
                    <p
                      className="
                        font-handwriting
                        text-[13px]
                        leading-none
                        text-[#806a3d]/65
                      "
                    >
                      to you
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ================================= */}
            {/* FLOWER SWAP / TRANSFORMATION */}
            {/* ================================= */}

            <div
              className="
                relative
                h-full
                w-full
              "
            >
              {/* original travelling flower */}
              <motion.div
                animate={{
                  opacity:
                    showFinalFlower
                      ? 0
                      : 1,

                  scale:
                    showFinalFlower
                      ? 0.82
                      : 1,

                  rotate:
                    showFinalFlower
                      ? -5
                      : 0,

                  filter:
                    showFinalFlower
                      ? "blur(2px)"
                      : "blur(0px)",
                }}
                transition={{
                  duration: 0.85,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
                className="
                  absolute
                  inset-0
                "
              >
                <TravellingFlower />
              </motion.div>

              {/* premium final flower */}
              <AnimatePresence>
                {showFinalFlower && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.68,
                      rotate: 4,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1.2,
                      rotate: 0,
                    }}
                    transition={{
                      duration: 1.05,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      h-[158%]
                      w-[158%]
                      -translate-x-1/2
                      -translate-y-1/2
                    "
                  >
                    <PremiumFinalFlower
                      className="
                        h-full
                        w-full
                      "
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}