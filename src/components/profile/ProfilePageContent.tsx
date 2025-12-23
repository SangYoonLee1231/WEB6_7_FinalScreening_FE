"use client";

import Avatar from "@/components/common/Avatar";
import { BoxButton } from "@/components/common/button/BoxButton";
import HorizontalCardContainer from "@/components/common/container/HorizontalCardContainer";
import IntroduceBubble from "@/components/profile/IntroduceBubble";
import TierSet from "@/components/profile/TierSet";
import WinRate from "@/components/profile/WinRate";
import ReviewCard from "@/components/review/ReviewCard";
import ReviewPercent from "@/components/review/ReviewPercent";
import Image from "next/image";
import LolLogo from "@/assets/images/games/lol/lol-logo.png";
import { UserProfile } from "@/types/profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GameAccount } from "@/types/game-account";
import { Unlink } from "lucide-react";
import { useGetFavoriteChampions } from "@/hooks/useGetFavoriteChampions";
import { twMerge } from "tailwind-merge";
import { useGetRanks } from "@/hooks/useGetRanks";
import { useGetRecentMatch } from "@/hooks/useGetRecentMatch";
import { QUEUE_NAME, queueId } from "@/types/party";

type Ban = {
  userId: number;
  nickname: string;
  profileImage: string;
  blockedAt: string;
};

export default function ProfilePageContent({
  profileData,
  gameAccountData,
}: {
  profileData: UserProfile | null;
  gameAccountData: GameAccount | null;
}) {
  const router = useRouter();
  const rations = { GOOD: 3, NORMAL: 6, BAD: 1 };
  const [isUserBlocked, setIsUserBlocked] = useState<boolean>(false);
  const [isBlockedMsg, setIsBlockedMsg] = useState<string>("");

  useEffect(() => {
    if (!profileData) {
      alert("유저 프로필을 불러올 수 없습니다.");
      router.back();
      return;
    }
  }, []);

  if (!profileData) return null;

  const { nickname, profile_image, comment } = profileData;

  const lolData =
    gameAccountData?.gameType === "LEAGUE_OF_LEGEND" ||
    gameAccountData?.gameType === "리그 오브 레전드"
      ? gameAccountData
      : null;

  const { data: ChampionData, isLoading: ChampionDataIsLoading } =
    useGetFavoriteChampions(gameAccountData?.gameAccountId ?? 0);

  const { data: RankData, isLoading: RankDataIsLoading } = useGetRanks(
    gameAccountData?.gameAccountId ?? 0,
  );

  const { data: MatchData, isLoading: MatchDataIsLoading } = useGetRecentMatch({
    gameAccountId: gameAccountData?.gameAccountId ?? 0,
  });

  const SoloQueue =
    RankData?.filter((r) => r.queueType === "RANKED_SOLO_5x5")[0] ?? null;
  const FlexQueue =
    RankData?.filter((r) => r.queueType === "RANKED_FLEX_SR")[0] ?? null;

  const userBanHandler = async () => {
    const getBanRes = await fetch(
      "http://localhost:8080/api/v1/users/me/blocks",
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      },
    );
    const banListData: Ban[] = await getBanRes.json();

    const tempIsUserBlocked = banListData.some(
      (ban) => ban.userId === profileData.id,
    );

    if (tempIsUserBlocked) {
      setIsBlockedMsg("이미 차단된 사용자입니다");
      return;
    }
    setIsBlockedMsg("");
    const res = await fetch(
      `http://localhost:8080/api/v1/users/${profileData.id}/blocks`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    if (res.ok) {
      setIsBlockedMsg("차단되었습니다");
      setIsUserBlocked(tempIsUserBlocked);
    }
  };

  return (
    <section className="flex h-full w-full">
      <div className="flex h-full w-full flex-col gap-9">
        {/* 프로필 정보 */}
        <div className="mt-20 flex flex-col gap-5">
          <div className="flex flex-row gap-1 text-4xl font-bold">
            <p className="text-content-main">
              <span className="text-accent">{nickname}</span>
              님의 프로필
            </p>
          </div>
          <div className="flex flex-row items-center gap-8">
            <Avatar size="xl" src={profile_image ?? ""} type="profile" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                <span className="text-content-primary text-2xl font-semibold">
                  {nickname}
                </span>
                <span className="text-negative">{isBlockedMsg}</span>
                <BoxButton
                  size="sm"
                  tone="negative"
                  className="w-12 py-3"
                  text="차단"
                  onClick={userBanHandler}
                  disabled={isUserBlocked}
                />
              </div>
              <IntroduceBubble size="lg" content={comment} />
            </div>
          </div>
        </div>
        {/* 연동된 게임 정보 */}
        <div className="flex flex-col gap-4">
          <p className="text-content-main text-3xl font-bold">
            연동된 게임 정보
          </p>
          {/* 게임 탭*/}
          <div className="border-accent w-fit border-b-2">
            <div className="text-accent m-2 flex items-center gap-1 font-semibold">
              <Image src={LolLogo} alt="LoL logo" width={24} />
              <span>리그 오브 레전드</span>
            </div>
          </div>
          {lolData ? (
            <div className="flex flex-col justify-center gap-8">
              {/* 게임 프로필 정보 및 전적 갱신 버튼 */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <Avatar type="profile" src={lolData.profileIconUrl} />
                  <div className="flex items-center gap-2">
                    <span className="text-content-primary text-xl font-semibold">
                      {lolData.gameNickname}
                    </span>
                    <span className="text-content-secondary text-sm">
                      #{lolData.gameTag}
                    </span>
                  </div>
                </div>
                <BoxButton
                  tone="color"
                  size="sm"
                  className="w-20 py-3"
                  text="전적 갱신"
                />
              </div>
              {/* 랭크 및 승률 정보 */}
              <div className="m-auto grid w-[90%] grid-cols-[1fr_1fr_1fr] gap-5">
                <HorizontalCardContainer className="flex flex-col items-center justify-center gap-2 border-none px-12 py-6">
                  <p className="text-semibold text-xl">개인/2인 랭크 게임</p>
                  <div className="flex flex-col">
                    {SoloQueue ? (
                      <TierSet tier={SoloQueue.tier} rank="I" />
                    ) : (
                      <TierSet tier="UNRANKED" rank="I" />
                    )}
                  </div>
                </HorizontalCardContainer>
                <HorizontalCardContainer className="flex flex-col items-center justify-center gap-2 border-none px-12 py-6">
                  <p className="text-semibold text-xl">자유 랭크 게임</p>
                  <div className="flex flex-col">
                    {FlexQueue ? (
                      <TierSet tier={FlexQueue.tier} rank="I" />
                    ) : (
                      <TierSet tier="UNRANKED" rank="I" />
                    )}
                  </div>
                </HorizontalCardContainer>
                <HorizontalCardContainer className="flex flex-col items-center justify-center gap-5.5 border-none px-12 py-6">
                  <p className="text-semibold text-xl">승률</p>
                  <WinRate type="donut" className="w-25" />
                </HorizontalCardContainer>
              </div>
              {/* 최근선호 챔피언 */}
              <div className="space-y-4">
                <p className="text-xl font-semibold">
                  최근 선호 챔피언{" "}
                  <span className="text-content-primary text-lg font-medium">
                    (최근 20게임)
                  </span>
                </p>
                {ChampionData ? (
                  <div className="flex gap-2">
                    {ChampionData.map((c) => (
                      <div
                        key={c.championId}
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={c.championImageUrl}
                          alt={c.championName}
                          className="rounded-full"
                          width={50}
                          height={50}
                        />
                        <p className="text-content-secondary text-sm">
                          <span
                            className={twMerge(
                              "text-accent",
                              c.winRate < 50 && "text-content-primary",
                            )}
                          >
                            {Math.round(c.winRate)}%
                          </span>{" "}
                          ({c.wins}승 / {c.losses}패)
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-content-secondary">
                    최근 선호 챔피언 내역이 없습니다.
                  </p>
                )}
              </div>
              {/* 최근 게임 내역 */}
              <div className="space-y-4">
                <p className="text-xl font-semibold">최근 게임 내역</p>
                {MatchData ? (
                  <div className="text-content-primary flex flex-col justify-center gap-2 text-base">
                    {MatchData.map((c) => (
                      <div
                        key={c.matchId}
                        className={twMerge(
                          "bg-negative/10 border-negative flex w-full justify-between rounded-xl border px-6 py-3",
                          c.win && "bg-positive/10 border-positive",
                        )}
                      >
                        <div className="flex w-120 justify-between gap-10.5">
                          {/* 게임 모드, 시간 */}
                          <div className="flex flex-col items-center justify-center gap-1">
                            <span
                              className={twMerge(
                                "text-negative text-base",
                                c.win && "text-positive",
                              )}
                            >
                              {QUEUE_NAME[c.queueId as queueId] ?? "알수없음"}
                            </span>
                            <span className="text-content-secondary text-sm font-medium">
                              {c.gameDurationFormatted}
                            </span>
                          </div>

                          {/* 챔피언, 룬, 스펠 */}
                          <div className="flex items-center justify-center gap-1">
                            <div className="relative inline-flex">
                              <Avatar
                                src={c.championImageUrl}
                                type="champion"
                                size="lg"
                              />
                              <div className="absolute right-0 bottom-0 rounded-full bg-slate-800 p-1">
                                {c.level}
                              </div>
                            </div>

                            <div className="flex gap-1">
                              <div className="flex flex-col gap-1">
                                {c.perkImageUrls.map((p, index) => (
                                  <Image
                                    key={`perkImage ${index}`}
                                    src={p}
                                    alt="perk Image"
                                    width={30}
                                    height={30}
                                  />
                                ))}
                              </div>

                              <div className="flex flex-col items-center justify-center gap-1">
                                {c.spell1ImageUrl ? (
                                  <Image
                                    src={c.spell1ImageUrl}
                                    alt="spell image"
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                  />
                                ) : (
                                  <div className="bg-bg-secondary h-7.5 w-7.5 rounded-full" />
                                )}
                                {c.spell2ImageUrl ? (
                                  <Image
                                    src={c.spell2ImageUrl}
                                    alt="spell image"
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                  />
                                ) : (
                                  <div className="bg-bg-secondary w-7.5 rounded-full" />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* KDA */}
                          <div className="flex flex-col items-center justify-center">
                            <p>
                              {c.kills} /{" "}
                              <span className="text-negative">{c.deaths}</span>{" "}
                              / {c.assists}
                            </p>
                            <p className="text-content-secondary text-sm font-medium">
                              {c.kda.toFixed(2)}
                            </p>
                          </div>
                          <span className="text-content-secondary flex items-center justify-center text-sm font-medium">
                            CS {c.cs}
                          </span>
                        </div>

                        {/* 빌드 */}
                        <div className="flex items-center gap-1">
                          {c.itemImageUrls &&
                            c.itemImageUrls.map((item, index) =>
                              item ? (
                                <Image
                                  key={`item${index}`}
                                  src={item}
                                  alt="item image"
                                  width={40}
                                  height={40}
                                />
                              ) : (
                                <div key={`item${index}`} />
                              ),
                            )}
                        </div>
                        <div className="flex items-center justify-center gap-10.5">
                          {" "}
                          {/* 시작 시간 */}
                          <span className="text-content-secondary text-sm">
                            {c.gameStartTimeFormatted}
                          </span>
                          {/* 승리/패배 뱃지 */}
                          <div
                            className={twMerge(
                              "text-negative bg-negative/10 border-negative inline-flex h-8 items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium",
                              c.win &&
                                "text-positive border-positive bg-positive/10",
                            )}
                          >
                            <span>{c.win ? "승리" : "패배"}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-content-secondary">
                    최근 게임 내역이 없습니다.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="m-auto flex w-full flex-col items-center justify-center gap-6">
              <Unlink size={80} className="text-bg-tertiary" />
              <p className="text-content-secondary text-xl font-bold">
                연동된 계정이 없습니다
              </p>
            </div>
          )}
        </div>

        {/* 리뷰 내역 */}
        <div className="flex flex-col gap-4">
          <p className="text-content-main text-3xl font-bold">리뷰 내역</p>
          <div className="m-auto flex w-[90%] flex-col gap-12.5">
            {/* 리뷰 분포 */}
            <ReviewPercent type="default" ratios={rations} />
            {/* 리뷰 상세 내역 */}
            <div className="flex flex-col gap-7.5">
              <p className="text-content-secondary text-center text-base">
                총 12개의 리뷰
              </p>
              <div className="flex flex-col gap-2">
                <ReviewCard
                  mode="received"
                  gameName="lol"
                  communityName="커뮤니티 닉네임"
                  content="리뷰내용"
                  emotion="good"
                  createdAt="2025-12-12T00:12:00.000Z"
                  profileImageURL=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
