import FindPageContent from "@/components/find/FindPageContent";
import { GetPosts } from "@/services/posts";

export default async function page() {
  const { posts: postData } = await GetPosts();
  return <FindPageContent postData={postData} />;
}
