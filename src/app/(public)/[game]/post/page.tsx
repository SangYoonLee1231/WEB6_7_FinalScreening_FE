import FindCreateFormContainer from "@/components/find/post/FindCreateFormContainer";
import { getMyProfile } from "@/services/users";

export default async function PostCreatePage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <FindCreateFormContainer type="create" />
    </div>
  );
}
