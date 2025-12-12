import ReviewCard from "@/components/review/ReviewCard";

export default function Home() {
  return (
    <>
      // 받은 리뷰 리스트
      <ReviewCard
        mode="received"
        gameName="lol"
        communityName="커뮤니티 닉네임"
        content="리뷰내용"
        emotion="good"
        createdAt="2025-12-12T00:12:00.000Z"
      />
      // 작성한 리뷰 리스트
      <ReviewCard
        mode="written"
        gameName="lol"
        communityName="커뮤니티 닉네임"
        content="리뷰내용"
        emotion="bad"
        createdAt="2025-12-11T00:11:00.000Z"
      />
    </>
  );
}
