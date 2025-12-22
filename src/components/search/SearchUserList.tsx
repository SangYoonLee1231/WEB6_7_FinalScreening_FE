import { UserList } from "@/types/userList";
import SearchUserCard from "./SearchUserCard";

export default function SearchUserList({
  userListData,
}: {
  userListData: UserList;
}) {
  return (
    <div className="mt-12.5 flex flex-col items-center justify-items-center gap-7.5">
      <div className="text-content-secondary flex text-xl">
        <p className="text-accent">검색어</p>
        <p className="mr-1">에 대한</p>
        <p className="text-accent">{userListData.totalCount}명</p>
        <p>의 유저를 찾았어요</p>
      </div>
      <div className="flex flex-col gap-2">
        {userListData.users.map((user) => (
          <SearchUserCard key={user.userId} userData={user} />
        ))}
      </div>
    </div>
  );
}
