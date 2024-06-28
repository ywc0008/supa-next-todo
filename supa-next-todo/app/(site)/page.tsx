import TodoContainer from "./components/TodoContainer";
import { getUser } from "@/actions/auth/user.action";
import AuthUI from "@/components/AuthUI";
import { DotLoader } from "react-spinners";

export default async function Home() {
  const user = await getUser({ serverComponent: true });

  return (
    <main>
      {user ? (
        <>
          <TodoContainer ownerUserId={user?.id} />
        </>
      ) : (
        <>
          <div className=" flex flex-col items-center mt-12">
            <div className=" font-bold my-2">로그인 먼저 해주세요</div>
            <AuthUI />
          </div>
        </>
      )}
    </main>
  );
}
