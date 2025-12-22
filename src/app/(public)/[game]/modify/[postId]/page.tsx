import FindCreateFormContainer from "@/components/find/post/FindCreateFormContainer";
import { GetDetailPost } from "@/services/posts";

export default async function ModifyPostpage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = await params;
  const initialPost = await GetDetailPost(postId);
  return (
    <div className="mx-auto max-w-4xl p-6">
      <FindCreateFormContainer type="modify" initialPost={initialPost} />
    </div>
  );
}
