"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pause, Play, RotateCcw } from "lucide-react";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "00:00";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

const waveformPath = `
  M0 70

  C18 70 28 68 40 58
  C52 48 58 38 71 40
  C84 42 87 64 100 69

  C114 74 124 75 136 85
  C148 95 152 108 166 106
  C181 104 180 79 194 72

  C208 65 218 66 229 55
  C240 44 244 30 258 32
  C273 34 272 61 287 68

  C302 75 312 76 324 89
  C336 102 340 116 355 113
  C370 110 369 81 383 72

  C398 63 409 65 421 53
  C433 41 436 26 450 28
  C465 30 464 60 480 68

  C496 76 506 77 517 88
  C528 99 532 107 545 105
  C559 103 561 80 576 72

  C591 64 601 65 613 57
  C625 49 630 42 643 44
  C657 46 660 65 674 70

  C689 75 700 77 712 91
  C724 105 728 119 743 116
  C758 113 758 82 773 72

  C788 62 799 63 811 51
  C823 39 827 25 841 27
  C856 29 856 60 871 68

  C886 76 897 76 908 85
  C920 94 924 104 937 102
  C951 100 954 78 968 72

  C981 67 991 70 1000 70
`;

export default function FinalVoiceNote() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
    const waveformRef = useRef<SVGPathElement | null>(null);

    const [lightPoint, setLightPoint] = useState({
    x: 0,
    y: 70,
    });
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [finished, setFinished] = useState(false);

  const progress =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setFinished(true);
      setCurrentTime(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

    useEffect(() => {
    const path = waveformRef.current;

    if (!path) return;

    const totalLength = path.getTotalLength();

    const point = path.getPointAtLength(
        totalLength * (progress / 100)
    );

    setLightPoint({
        x: point.x,
        y: point.y,
    });
    }, [progress]);

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      if (finished) {
        audio.currentTime = 0;
        setCurrentTime(0);
        setFinished(false);
      }

      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const replay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
    setFinished(false);

    await audio.play();
    setIsPlaying(true);
  };

  const seekAudio = (event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;

    if (!audio || !duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;

    const percentage = Math.max(
      0,
      Math.min(clickX / rect.width, 1),
    );

    audio.currentTime = percentage * duration;
    setCurrentTime(audio.currentTime);

    if (audio.currentTime < duration - 0.5) {
      setFinished(false);
    }
  };

  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12 md:py-48">
      <audio
        ref={audioRef}
        src="/audio/letter.mp3"
        preload="metadata"
      />

      <div className="mx-auto max-w-7xl">
        {/* Chapter line */}
        <div className="mb-28">
          <div className="flex items-center gap-5">
            <span className="chapter-label whitespace-nowrap text-black/40">
              final chapter
            </span>

            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
              }}
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
        </div>

        {/* ================================= */}
        {/* INTRO */}
        {/* ================================= */}

        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="chapter-label mb-8 text-[#7a263a]/55"
          >
            just between us
          </motion.p>

          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              font-display
              text-[clamp(5rem,13vw,11rem)]
              font-light
              leading-[0.75]
              tracking-[-0.05em]
            "
          >
            Listen.
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.35,
              duration: 1,
            }}
            className="
              mx-auto
              mt-12
              max-w-md
              text-sm
              leading-7
              text-black/45
            "
          >
            Some things are better heard than read.
            <br />
            So I wanted you to hear this from me.
          </motion.p>
        </div>

        {/* ================================= */}
        {/* VOICE NOTE */}
        {/* ================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            delay: 0.5,
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative
            mx-auto
            mt-28
            max-w-4xl
            md:mt-36
          "
        >
          {/* Top labels */}
          <div className="mb-7 flex items-center justify-between">
            <p className="chapter-label text-black/25">
              voice note / 01
            </p>

            <p className="chapter-label text-black/25">
              for your ears only
            </p>
          </div>

          {/* Player */}
          <div
            className="
              relative
              border-y
              border-black/15
              px-2
              py-16
              md:px-8
              md:py-20
            "
          >
            {/* Play button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={toggleAudio}
                aria-label={
                  isPlaying
                    ? "Pause voice note"
                    : "Play voice note"
                }
                className="
                  group
                  relative
                  flex
                  h-24
                  w-24
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  md:h-28
                  md:w-28
                "
              >
                {/* Drawn circle */}
                <svg
                  viewBox="0 0 120 120"
                  fill="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <motion.path
                    d="
                      M60 9
                      C91 8 111 28 111 59
                      C112 90 91 111 60 112
                      C29 113 8 91 9 60
                      C10 29 29 10 60 9Z
                    "
                    stroke="#171717"
                    strokeWidth="1"
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    whileInView={{
                      pathLength: 1,
                      opacity: 0.4,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.6,
                    }}
                  />

                  <motion.path
                    d="
                      M60 13
                      C89 12 106 31 107 59
                      C108 87 89 106 60 108
                    "
                    stroke="#7a263a"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    whileInView={{
                      pathLength: 1,
                      opacity: 0.25,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 0.4,
                      duration: 1.5,
                    }}
                  />
                </svg>

                {isPlaying ? (
                  <Pause
                    size={23}
                    strokeWidth={1.2}
                    className="relative z-10 text-black/65"
                  />
                ) : (
                  <Play
                    size={25}
                    strokeWidth={1.2}
                    className="relative z-10 ml-1 text-black/65"
                  />
                )}
              </motion.button>
            </div>

            {/* Status */}
            <AnimatePresence mode="wait">
              <motion.p
                key={
                  finished
                    ? "finished"
                    : isPlaying
                      ? "playing"
                      : "paused"
                }
                initial={{
                  opacity: 0,
                  y: 4,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -4,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  chapter-label
                  mt-7
                  text-center
                  text-black/30
                "
              >
                {finished
                  ? "thank you for listening."
                  : isPlaying
                    ? "playing / something I wanted you to hear"
                    : currentTime > 0
                      ? "paused / whenever you're ready"
                      : "press play when you're ready"}
              </motion.p>

              {/* Status period */}
            </AnimatePresence>

        {/* ================================= */}
        {/* SMOOTH VOICE WAVEFORM */}
        {/* ================================= */}

        <motion.div
        onClick={seekAudio}
        animate={
            isPlaying
            ? {
                scaleY: [1, 1.018, 0.99, 1.012, 1],
                }
            : {
                scaleY: 1,
                }
        }
        transition={{
            duration: 3.2,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
        }}
        className="
            relative
            mx-auto
            mt-14
            h-[110px]
            max-w-3xl
            cursor-pointer
            md:h-[130px]
        "
        >
        <svg
            viewBox="0 0 1000 140"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
        >
            <defs>
            {/* Progress clipping */}
            <clipPath id="voiceProgressClip">
                <rect
                x="0"
                y="0"
                width={progress * 10}
                height="140"
                />
            </clipPath>

            {/* Glow */}
            <filter
                id="voiceGlow"
                x="-500%"
                y="-500%"
                width="1000%"
                height="1000%"
            >
                <feGaussianBlur
                stdDeviation="6"
                result="blur"
                />

                <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            </defs>

            {/* Very faint center line */}
            <path
            d="M0 70C250 69 750 71 1000 70"
            fill="none"
            stroke="#171717"
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0.045"
            />

            {/* Full inactive waveform */}
            <path
            ref={waveformRef}
            d={waveformPath}
            fill="none"
            stroke="#171717"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.15"
            />

            {/* Played portion */}
            <path
            d={waveformPath}
            fill="none"
            stroke="#7a263a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#voiceProgressClip)"
            />

            {/* Glowing point following waveform */}
            {progress > 0 && progress < 100 && (
            <>
                {/* Outer soft glow */}
                <motion.circle
                cx={lightPoint.x}
                cy={lightPoint.y}
                r="18"
                fill="#7a263a"
                opacity="0.08"
                filter="url(#voiceGlow)"
                />

                {/* Inner glow */}
                <motion.circle
                cx={lightPoint.x}
                cy={lightPoint.y}
                r="8"
                fill="#7a263a"
                opacity="0.18"
                filter="url(#voiceGlow)"
                />

                {/* Light point */}
                <motion.circle
                cx={lightPoint.x}
                cy={lightPoint.y}
                fill="#faf8f3"
                stroke="#7a263a"
                strokeWidth="2"
                animate={
                    isPlaying
                    ? {
                        r: [3.2, 4.3, 3.2],
                        opacity: [0.8, 1, 0.8],
                        }
                    : {
                        r: 3.4,
                        opacity: 0.85,
                        }
                }
                transition={{
                    duration: 1.25,
                    repeat: isPlaying ? Infinity : 0,
                    ease: "easeInOut",
                }}
                />
            </>
            )}
        </svg>
        </motion.div>
            {/* Timer */}
            <div
              className="
                mx-auto
                mt-5
                flex
                max-w-3xl
                items-center
                justify-between
              "
            >
              <p className="chapter-label text-black/25">
                {formatTime(currentTime)}
              </p>

              <p className="chapter-label text-black/25">
                {formatTime(duration)}
              </p>
            </div>

            {/* Replay */}
            <AnimatePresence>
              {finished && (
                <motion.button
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  onClick={replay}
                  className="
                    mx-auto
                    mt-10
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-black/35
                    transition
                    hover:text-[#7a263a]
                  "
                >
                  <RotateCcw
                    size={13}
                    strokeWidth={1}
                  />

                  listen again
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <p
            className="
              chapter-label
              mt-5
              text-center
              text-black/20
            "
          >
            recorded only for you
          </p>
        </motion.div>

        {/* ================================= */}
        {/* ENDING */}
        {/* ================================= */}

        <AnimatePresence>
          {finished && (
            <motion.div
              initial={{
                opacity: 0,
                y: 60,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.6,
                duration: 1.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                mx-auto
                mt-56
                max-w-4xl
                text-center
                md:mt-72
              "
            >
              <p className="chapter-label text-black/30">
                chapter 41
              </p>

              <motion.h3
                initial={{
                  opacity: 0,
                  letterSpacing: "0.15em",
                }}
                animate={{
                  opacity: 1,
                  letterSpacing: "-0.04em",
                }}
                transition={{
                  delay: 1,
                  duration: 1.3,
                }}
                className="
                  font-display
                  mt-6
                  text-8xl
                  font-light
                  md:text-[11rem]
                "
              >
                END
              </motion.h3>

              {/* Fake ending */}
              <div className="relative mx-auto mt-20 w-fit">
                <p
                  className="
                    font-display
                    text-3xl
                    italic
                    text-black/40
                    md:text-5xl
                  "
                >
                  our story is over.
                </p>

                <svg
                  viewBox="0 0 500 60"
                  fill="none"
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[108%]
                    -translate-x-1/2
                    -translate-y-1/2
                  "
                >
                  <motion.path
                    d="M7 34C99 20 195 35 292 25C372 17 432 27 493 19"
                    stroke="#7a263a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                    }}
                    transition={{
                      delay: 2,
                      duration: 1.5,
                    }}
                  />
                </svg>
              </div>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 3.2,
                  duration: 1,
                }}
                className="
                  font-display
                  mt-10
                  text-3xl
                  italic
                  text-black/70
                  md:text-5xl
                "
              >
                our story isn&apos;t.
              </motion.p>

              {/* To be continued */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 4.2,
                  duration: 1.2,
                }}
                className="mt-40"
              >
                <p className="chapter-label text-[#7a263a]/55">
                  to be continued...
                </p>

                <svg
                  viewBox="0 0 400 50"
                  fill="none"
                  className="
                    mx-auto
                    mt-6
                    w-52
                  "
                >
                  <motion.path
                    d="M7 26C92 17 181 30 267 21C311 17 348 21 393 16"
                    stroke="#171717"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                    }}
                    animate={{
                      pathLength: 1,
                    }}
                    transition={{
                      delay: 4.5,
                      duration: 1.5,
                    }}
                  />
                </svg>

                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 5,
                    duration: 1,
                  }}
                  className="
                    mt-14
                    text-[9px]
                    uppercase
                    tracking-[0.35em]
                    text-black/20
                  "
                >
                  made only for you
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}