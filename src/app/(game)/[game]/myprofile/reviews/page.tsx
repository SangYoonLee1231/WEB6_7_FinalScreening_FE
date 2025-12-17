import MyProfileReviewContainer from "@/components/review/MyProfileReviewContainer";

export default async function ReviewsPage() {
  return (
    <div className="flex flex-col gap-11 [&_h3]:text-xl [&_h3]:font-semibold">
      <h2 className="text-4xl font-bold">리뷰 조회</h2>
      <MyProfileReviewContainer />
    </div>
  );
}
