import ClientApi from "@/lib/clientApi";
import { Review, ReviewDistribution } from "@/types/review";

export async function getUserReviewList(userId: number) {
  const res = await ClientApi(`/api/v1/reviews/users/${userId}`, {
    method: "GET",
  });

  if (!res.ok) {
    alert("리뷰 목록을 불러올 수 없습니다.");
    return null;
  }

  return (await res.json()) as Review[];
}

export async function getMyWrittenReviews() {
  const res = await ClientApi(`/api/v1/reviews/me`, {
    method: "GET",
  });

  if (!res.ok) {
    alert("작성한 리뷰 목록을 불러올 수 없습니다.");
    return null;
  }

  return (await res.json()) as Review[];
}

export async function getRequestReviews() {
  const res = await ClientApi(`/api/v1/reviews/requests`, {
    method: "GET",
  });

  if (!res.ok) {
    alert("작성 가능한 리뷰 목록을 불러올 수 없습니다.");
    return null;
  }

  return (await res.json()) as Review[];
}

export async function getReviewDistribution(userId: number) {
  const res = await ClientApi(`/api/v1/reviews/users/${userId}/distribution`, {
    method: "GET",
  });

  if (!res.ok) {
    alert("리뷰 분포 데이터를 불러올 수 없습니다.");
    return null;
  }

  return (await res.json()) as ReviewDistribution;
}
