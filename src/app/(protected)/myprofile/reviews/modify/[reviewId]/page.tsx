import FindCreateFormContainer from "@/components/find/post/FindCreateFormContainer";

export default async function ModifyPostpage({
  params,
}: {
  params: { reviewId: string };
}) {
  const { reviewId } = await params;
  //   const initialPost = await GetDetailPost(postId);
  return (
    <div className="mx-auto max-w-4xl p-6">
      <FindCreateFormContainer type="modify" />
    </div>
  );
}
