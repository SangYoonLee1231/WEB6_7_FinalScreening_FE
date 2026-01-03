"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import lolLogo from "@/assets/images/games/lol/lol-logo.png";
import lolBg from "@/assets/images/games/lol/lol-bg.jpg";
import overwatchLogo from "@/assets/images/games/overwatch/overwatch-logo.png";
import overwatchBg from "@/assets/images/games/overwatch/overwatch-bg.jpg";
import valorantLogo from "@/assets/images/games/valorant/valorant-logo.png";
import valorantBg from "@/assets/images/games/valorant/valorant-bg.jpg";
import { BoxButton } from "@/components/common/button/BoxButton";
import { useMenuStore } from "@/stores/menuStore";
import { useRouter } from "next/navigation";

const games = [
  {
    id: "lol",
    name: "리그 오브 레전드",
    icon: lolLogo,
    bg: lolBg,
  },
  {
    id: "valorant",
    name: "발로란트",
    icon: valorantLogo,
    bg: valorantBg,
  },
  {
    id: "overwatch",
    name: "오버워치",
    icon: overwatchLogo,
    bg: overwatchBg,
  },
];

export default function HomePageContent() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const router = useRouter();
  const { setCurrentGame, setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("");
  }, []);

  const current = games[index];

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + games.length) % games.length);
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % games.length);
  };

  const getVisibleGames = () => {
    const prevIndex = (index - 1 + games.length) % games.length;
    const nextIndex = (index + 1) % games.length;

    return [
      { ...games[prevIndex], position: "left" as const },
      { ...games[index], position: "center" as const },
      { ...games[nextIndex], position: "right" as const },
    ];
  };

  return (
    <section className="flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        {/* 콘텐츠 */}

        <div
          className="text-content-primary grid h-[84.2%] w-[75%] grid-cols-1 items-center justify-items-center bg-cover bg-center transition-[background-image]"
          style={{
            background: `linear-gradient(to bottom, rgba(25,41, 61,1) 0%, rgba(0,0,0,0.75) 50%, rgba(25,41, 61,1) 100%) center /cover no-repeat, url(${current.bg.src}) center /cover no-repeat`,
          }}
        >
          <p className="text-center text-5xl leading-[1.4] font-bold">
            플레이 할 게임을 선택하고
            <br />
            내게 딱 맞는 듀오를 찾아보세요
          </p>

          {/* 캐러셀 */}
          <div className="flex w-full flex-row items-center justify-around">
            <div>
              <button onClick={prev}>
                <ChevronLeft strokeWidth={0.5} size={78} />
              </button>
            </div>
            <div className="flex h-50 w-[598px] flex-row items-center justify-center">
              <AnimatePresence mode="popLayout" custom={direction}>
                {getVisibleGames().map((game) => {
                  const isCenter = game.position === "center";

                  return (
                    <motion.div
                      key={game.id}
                      custom={direction}
                      initial={{
                        x:
                          game.position === "left"
                            ? -234
                            : game.position === "right"
                              ? 234
                              : 0,
                      }}
                      animate={{
                        x:
                          game.position === "left"
                            ? -234
                            : game.position === "right"
                              ? 234
                              : 0,
                      }}
                      exit={{
                        x: direction === 1 ? -120 : 120,
                        opacity: 0,
                        scale: 0.6,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className={`absolute flex items-center justify-center rounded-full ${isCenter ? "h-50 w-50 bg-[#101A25]" : "h-32.5 w-32.5 bg-[#101A25]/80"}`}
                    >
                      <Image
                        src={game.icon}
                        alt={game.name}
                        width={60}
                        height={60}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            <div>
              <button onClick={prev}>
                <ChevronRight strokeWidth={0.5} size={78} />
              </button>
            </div>
          </div>
          <div className="flex h-full flex-col items-center gap-10 self-start text-center">
            <p className="text-[44px] font-semibold">{current.name}</p>

            <BoxButton
              size="lg"
              tone="gradient_positive"
              text="이 게임으로 듀오 찾기"
              className="w-auto shrink-0 self-center px-10 py-5 text-xl font-bold"
              onClick={() => {
                setCurrentGame(current.id);
                router.push(current.id);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
