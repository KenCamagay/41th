"use client";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type Point = {
  x: number;
  y: number;
};

type Props = {
  active: boolean;
  flowerPoint?: Point | null;
  onGrab?: () => void;
  onComplete?: () => void;
};

type Phase =
  | "idle"
  | "walk"
  | "crouch"
  | "reach"
  | "grab"
  | "stand"
  | "approach"
  | "give"
  | "exit";

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    Math.max(value, min),
    max,
  );
}

/* ========================================= */
/* FLOWER HELD BY THE CHARACTER              */
/* ========================================= */

function HeldFlower() {
  return (
    <svg
      viewBox="0 0 70 105"
      fill="none"
      className="h-full w-full overflow-visible"
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
  );
}

/* ========================================= */
/* CHARACTER                                 */
/* ========================================= */

export default function StickManGift({
  active,
  flowerPoint,
  onGrab,
  onComplete,
}: Props) {
  const [phase, setPhase] =
    useState<Phase>("idle");

  const [holdingFlower, setHoldingFlower] =
    useState(false);

  const [viewport, setViewport] =
    useState({
      width: 0,
      height: 0,
    });

  /*
    Keep callback functions in refs.

    This prevents the animation sequence from
    restarting when FinalVoiceNote rerenders.
  */
  const onGrabRef = useRef(onGrab);
  const onCompleteRef =
    useRef(onComplete);

  useEffect(() => {
    onGrabRef.current = onGrab;
  }, [onGrab]);

  useEffect(() => {
    onCompleteRef.current =
      onComplete;
  }, [onComplete]);

  /* --------------------------------------- */
  /* VIEWPORT                                */
  /* --------------------------------------- */

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

  /* --------------------------------------- */
  /* CHOREOGRAPHY                            */
  /* --------------------------------------- */

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      setHoldingFlower(false);
      return;
    }

    const timers: number[] = [];

    const at = (
      time: number,
      action: () => void,
    ) => {
      timers.push(
        window.setTimeout(
          action,
          time,
        ),
      );
    };

    /*
      0.0
      walk toward flower
    */
    setPhase("walk");

    /*
      2.5
      lower body
    */
    at(2500, () => {
      setPhase("crouch");
    });

    /*
      3.15
      reach
    */
    at(3150, () => {
      setPhase("reach");
    });

    /*
      4.0
      grab
    */
    at(4000, () => {
      setPhase("grab");

      setHoldingFlower(true);

      onGrabRef.current?.();
    });

    /*
      4.55
      stand
    */
    at(4550, () => {
      setPhase("stand");
    });

    /*
      5.5
      walk toward viewer
    */
    at(5500, () => {
      setPhase("approach");
    });

    /*
      7.5
      present flower
    */
    at(7500, () => {
      setPhase("give");
    });

    /*
      10.2
      fade
    */
    at(10200, () => {
      setPhase("exit");
    });

    /*
      10.9
      trigger END
    */
    at(10900, () => {
      onCompleteRef.current?.();
    });

    return () => {
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, [active]);

  if (
    !active ||
    viewport.width === 0 ||
    phase === "idle"
  ) {
    return null;
  }

  /* ========================================= */
  /* POSITION CHARACTER NEXT TO REAL FLOWER    */
  /* ========================================= */

  const pickupPoint = flowerPoint ?? {
    x: viewport.width * 0.24,
    y: viewport.height * 0.74,
  };

  /*
    In the reach pose, the hand lands at:

      x = 42
      y = 246

    So we position the entire rig so that
    this hand coordinate lines up with the
    actual plant.
  */

  const pickupX = clamp(
    pickupPoint.x - 42,
    10,
    viewport.width - 245,
  );

  const pickupY = clamp(
    pickupPoint.y - 246,
    5,
    viewport.height - 315,
  );

  /*
    Position when walking toward viewer.
  */

  const centerX =
    viewport.width / 2 - 120;

  const centerY =
    viewport.height - 325;

  const approaching =
    phase === "approach";

  const walking =
    phase === "walk";

  const crouching =
    phase === "crouch";

  const reaching =
    phase === "reach" ||
    phase === "grab";

  const giving =
    phase === "give";

  /* ========================================= */
  /* POSES                                     */
  /* ========================================= */

  const torsoPath = reaching
    ? `
      M108 80
      C108 112 114 151 124 191
    `
    : crouching
      ? `
        M116 78
        C116 116 119 151 122 190
      `
      : `
        M120 78
        C120 114 120 150 120 186
      `;

  /*
    LEFT ARM
  */

  const leftArmRest = `
    M102 101
    L88 139
    L83 175
  `;

  const leftArmCrouch = `
    M99 105
    L82 150
    L88 189
  `;

  const leftArmWalk = [
    `
      M102 101
      L83 137
      L69 169
    `,
    `
      M102 101
      L107 135
      L119 163
    `,
    `
      M102 101
      L83 137
      L69 169
    `,
  ];

  /*
    RIGHT ARM

    reach hand ends at 42,246
  */

  const rightArmRest = `
    M138 101
    L153 138
    L160 174
  `;

  const rightArmWalk = [
    `
      M138 101
      L155 135
      L169 165
    `,
    `
      M138 101
      L132 136
      L121 166
    `,
    `
      M138 101
      L155 135
      L169 165
    `,
  ];

  const rightArmCrouch = `
    M135 107
    L105 163
    L72 210
  `;

  const rightArmReach = `
    M134 111
    L91 174
    L42 246
  `;

  const rightArmHolding = `
    M138 101
    L157 133
    L158 166
  `;

  const rightArmApproach = `
    M138 101
    L155 124
    L151 151
  `;

  const rightArmGive = `
    M138 101
    L158 115
    L175 127
  `;

  /*
    LEGS
  */

  const leftLegRest = `
    M109 186
    L101 239
    L91 298
  `;

  const rightLegRest = `
    M131 186
    L140 239
    L150 298
  `;

  const leftLegWalk = [
    `
      M109 186
      L91 237
      L72 298
    `,
    `
      M109 186
      L125 236
      L144 297
    `,
    `
      M109 186
      L91 237
      L72 298
    `,
  ];

  const rightLegWalk = [
    `
      M131 186
      L147 236
      L166 297
    `,
    `
      M131 186
      L114 238
      L95 298
    `,
    `
      M131 186
      L147 236
      L166 297
    `,
  ];

  const leftLegCrouch = `
    M110 191
    L88 239
    L70 297
  `;

  const rightLegCrouch = `
    M130 191
    L151 239
    L169 297
  `;

  /* ========================================= */
  /* ROOT MOTION                               */
  /* ========================================= */

  const rootPosition = (() => {
    if (
      phase === "approach" ||
      phase === "give" ||
      phase === "exit"
    ) {
      return {
        x: centerX,
        y: centerY,
        scale:
          phase === "give"
            ? 1.08
            : 1,
      };
    }

    return {
      x: pickupX,
      y: pickupY,
      scale: 1,
    };
  })();

  /* ========================================= */
  /* FLOWER HAND POSITION                      */
  /* ========================================= */

  let flowerHand = {
    x: 158,
    y: 166,
  };

  if (phase === "grab") {
    flowerHand = {
      x: 42,
      y: 246,
    };
  }

  if (phase === "stand") {
    flowerHand = {
      x: 158,
      y: 166,
    };
  }

  if (phase === "approach") {
    flowerHand = {
      x: 151,
      y: 151,
    };
  }

  if (phase === "give") {
    flowerHand = {
      x: 175,
      y: 127,
    };
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity:
            phase === "exit"
              ? 0
              : 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          pointer-events-none
          fixed
          inset-0
          z-[100]
          overflow-hidden
        "
      >
        {/* ================================= */}
        {/* CHARACTER ROOT */}
        {/* ================================= */}

        <motion.div
          initial={{
            x: -270,
            y: pickupY,
            scale: 1,
          }}
          animate={{
            x: rootPosition.x,
            y: rootPosition.y,
            scale: rootPosition.scale,
          }}
          transition={{
            x: {
              duration:
                walking
                  ? 2.45
                  : approaching
                    ? 1.9
                    : 0.65,

              ease:
                walking ||
                approaching
                  ? "linear"
                  : "easeInOut",
            },

            y: {
              duration:
                approaching
                  ? 1.9
                  : 0.65,
              ease: "easeInOut",
            },

            scale: {
              duration: 1,
              ease: "easeInOut",
            },
          }}
          className="
            absolute
            left-0
            top-0
            h-[320px]
            w-[240px]
            origin-bottom
          "
        >
          {/* subtle walk bounce */}

          <motion.div
            animate={
              walking ||
              approaching
                ? {
                    y: [
                      0,
                      -4,
                      0,
                      -3,
                      0,
                    ],
                  }
                : {
                    y: 0,
                  }
            }
            transition={
              walking ||
              approaching
                ? {
                    duration: 0.62,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {
                    duration: 0.3,
                  }
            }
            className="
              relative
              h-full
              w-full
            "
          >
            <svg
              viewBox="0 0 240 320"
              fill="none"
              className="
                h-full
                w-full
                overflow-visible
              "
            >
              {/* ============================= */}
              {/* HEAD                          */}
              {/* ============================= */}

              <motion.circle
                stroke="#171717"
                strokeWidth="2"
                fill="#f3efe7"
                initial={false}
                animate={{
                  cx:
                    reaching
                      ? 102
                      : crouching
                        ? 112
                        : 120,

                  cy:
                    reaching
                      ? 63
                      : crouching
                        ? 59
                        : 54,
                }}
                transition={{
                  duration: 0.55,
                  ease: "easeInOut",
                }}
                r="23"
                opacity="0.78"
              />

              {/* hair */}

              <motion.path
                stroke="#171717"
                strokeWidth="1.3"
                strokeLinecap="round"
                fill="none"
                opacity="0.42"
                animate={{
                  d: reaching
                    ? `
                      M85 50
                      C94 39 105 38 114 44
                    `
                    : `
                      M103 39
                      C113 29 126 29 136 37
                    `,
                }}
                transition={{
                  duration: 0.5,
                }}
              />

              {/* eye */}

              <motion.path
                stroke="#171717"
                strokeWidth="1.4"
                strokeLinecap="round"
                animate={{
                  d: reaching
                    ? "M87 64L91 65"
                    : "M131 54L135 54",
                }}
                opacity="0.6"
              />

              {/* blush */}

              <motion.path
                d="
                  M96 61L104 60
                  M137 61L145 60
                "
                stroke="#7a263a"
                strokeWidth="0.9"
                strokeLinecap="round"
                animate={{
                  opacity:
                    giving
                      ? 0.5
                      : 0.15,
                }}
              />

              {/* ============================= */}
              {/* TORSO                         */}
              {/* ============================= */}

              <motion.path
                stroke="#171717"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: torsoPath,
                }}
                transition={{
                  duration: 0.55,
                  ease: "easeInOut",
                }}
                opacity="0.78"
              />

              {/* shoulders */}

              <motion.path
                stroke="#171717"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: reaching
                    ? `
                      M89 105
                      C106 107 119 109 134 111
                    `
                    : crouching
                      ? `
                        M96 103
                        C112 101 124 102 136 105
                      `
                      : `
                        M101 101
                        C113 98 127 98 139 101
                      `,
                }}
                transition={{
                  duration: 0.5,
                }}
                opacity="0.58"
              />

              {/* ============================= */}
              {/* LEFT ARM                      */}
              {/* ============================= */}

              <motion.path
                stroke="#171717"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                  d: walking
                    ? leftArmWalk
                    : reaching
                      ? leftArmCrouch
                      : crouching
                        ? leftArmCrouch
                        : approaching
                          ? leftArmWalk
                          : leftArmRest,
                }}
                transition={
                  walking ||
                  approaching
                    ? {
                        duration: 0.62,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : {
                        duration: 0.5,
                        ease: "easeInOut",
                      }
                }
                opacity="0.72"
              />

              {/* ============================= */}
              {/* RIGHT ARM                     */}
              {/* ============================= */}

              <motion.path
                stroke="#171717"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                  d: walking
                    ? rightArmWalk
                    : phase ===
                        "crouch"
                      ? rightArmCrouch
                      : reaching
                        ? rightArmReach
                        : phase ===
                            "stand"
                          ? rightArmHolding
                          : approaching
                            ? rightArmApproach
                            : giving
                              ? rightArmGive
                              : rightArmRest,
                }}
                transition={
                  walking
                    ? {
                        duration: 0.62,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : {
                        duration: 0.55,
                        ease: "easeInOut",
                      }
                }
                opacity="0.78"
              />

              {/* ============================= */}
              {/* HIPS                          */}
              {/* ============================= */}

              <motion.path
                stroke="#171717"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  d:
                    crouching ||
                    reaching
                      ? `
                        M109 191
                        L131 191
                      `
                      : `
                        M109 186
                        L131 186
                      `,
                }}
                transition={{
                  duration: 0.45,
                }}
                opacity="0.55"
              />

              {/* ============================= */}
              {/* LEFT LEG                      */}
              {/* ============================= */}

              <motion.path
                stroke="#171717"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                  d:
                    walking ||
                    approaching
                      ? leftLegWalk
                      : crouching ||
                          reaching
                        ? leftLegCrouch
                        : leftLegRest,
                }}
                transition={
                  walking ||
                  approaching
                    ? {
                        duration: 0.62,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : {
                        duration: 0.5,
                        ease: "easeInOut",
                      }
                }
                opacity="0.76"
              />

              {/* ============================= */}
              {/* RIGHT LEG                     */}
              {/* ============================= */}

              <motion.path
                stroke="#171717"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                animate={{
                  d:
                    walking ||
                    approaching
                      ? rightLegWalk
                      : crouching ||
                          reaching
                        ? rightLegCrouch
                        : rightLegRest,
                }}
                transition={
                  walking ||
                  approaching
                    ? {
                        duration: 0.62,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : {
                        duration: 0.5,
                        ease: "easeInOut",
                      }
                }
                opacity="0.76"
              />

              {/* feet */}

              <path
                d="
                  M80 298L94 298
                  M148 298L161 298
                "
                stroke="#171717"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.55"
              />
            </svg>

            {/* ================================= */}
            {/* HELD FLOWER                       */}
            {/* ================================= */}

            <AnimatePresence>
              {holdingFlower && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.65,
                  }}
                  animate={{
                    left:
                      flowerHand.x -
                      35,

                    top:
                      flowerHand.y -
                      100,

                    opacity: 1,

                    scale:
                      giving
                        ? [
                            0.9,
                            1.15,
                            1.8,
                            3.2,
                            4.3,
                          ]
                        : phase ===
                            "approach"
                          ? 0.9
                          : 0.78,

                    rotate:
                      giving
                        ? [
                            -4,
                            -2,
                            0,
                            1,
                            0,
                          ]
                        : -5,
                  }}
                  transition={{
                    left: {
                      duration: 0.55,
                      ease: "easeInOut",
                    },

                    top: {
                      duration: 0.55,
                      ease: "easeInOut",
                    },

                    scale: giving
                      ? {
                          duration: 2.3,
                          times: [
                            0,
                            0.2,
                            0.45,
                            0.72,
                            1,
                          ],
                          ease: [
                            0.16,
                            1,
                            0.3,
                            1,
                          ],
                        }
                      : {
                          duration: 0.55,
                        },
                  }}
                  style={{
                    transformOrigin:
                      "50% 100%",
                  }}
                  className="
                    absolute
                    h-[100px]
                    w-[70px]
                    z-20
                  "
                >
                  <HeldFlower />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ================================= */}
        {/* WALKING MOTION MARKS              */}
        {/* ================================= */}

        <AnimatePresence>
          {(walking ||
            approaching) && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [
                  0,
                  0.2,
                  0,
                ],
                x: [
                  0,
                  -18,
                ],
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
              }}
              style={{
                left:
                  rootPosition.x -
                  15,
                top:
                  rootPosition.y +
                  230,
              }}
              className="
                absolute
                h-px
                w-12
                bg-black/25
              "
            />
          )}
        </AnimatePresence>

        {/* ================================= */}
        {/* GRAB INDICATOR                    */}
        {/* ================================= */}

        <AnimatePresence>
          {phase === "grab" && (
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [
                  0,
                  1,
                  1.7,
                ],
                opacity: [
                  0,
                  0.6,
                  0,
                ],
              }}
              transition={{
                duration: 0.6,
              }}
              style={{
                left:
                  pickupPoint.x -
                  6,
                top:
                  pickupPoint.y -
                  6,
              }}
              className="
                absolute
                h-3
                w-3
                rounded-full
                border
                border-[#7a263a]/50
              "
            />
          )}
        </AnimatePresence>

        {/* ================================= */}
        {/* GIVING TEXT                       */}
        {/* ================================= */}

        <AnimatePresence>
          {giving && (
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
              }}
              transition={{
                delay: 0.7,
                duration: 0.8,
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
                  stroke="#7a263a"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                  }}
                  animate={{
                    pathLength: 1,
                  }}
                  transition={{
                    delay: 0.8,
                    duration: 1,
                  }}
                />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}