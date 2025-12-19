import FindPageContent from "@/components/find/FindPageContent";
import { GetPosts } from "@/services/posts";
import { getMyProfile } from "@/services/users";

export default async function page() {
  const { posts: postData } = await GetPosts();
  const isLogin = await getMyProfile();
  return <FindPageContent postData={postData} isLogin={!!isLogin} />;
}
