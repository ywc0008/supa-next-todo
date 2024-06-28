import TodoContainer from "./components/TodoContainer";
import { getUser } from "@/actions/auth/user.action";
import { DotLoader } from "react-spinners";
import { createApi } from "unsplash-js";
import { useEffect, useState } from "react";

export default async function Home() {
  const user = await getUser({ serverComponent: true });

  // const img = await (
  //   await fetch(
  //     "https://api.unsplash.com/photos/random/?client_id=d1hQPJ3dmqHROEEvBmLy6ZdNYKJIqcpyADOakLg41Jw"
  //   )
  // ).json();

  // const unsplash = createApi({
  //   // Don't forget to set your access token here!
  //   // See https://unsplash.com/developers
  //   accessKey: "d1hQPJ3dmqHROEEvBmLy6ZdNYKJIqcpyADOakLg41Jw",
  //   fetch: nodeFetch.default as unknown as typeof fetch,
  // });
  // console.log(unsplash.photos.get({ photoId: "cat" }));

  return (
    <main>
      {user ? (
        <>
          <TodoContainer ownerUserId={user?.id} />
        </>
      ) : (
        <>
          <div className=" flex flex-col items-center mt-12">
            <div>
              <DotLoader />
            </div>
            <div className=" font-bold my-2">로그인 먼저 해주세요</div>
          </div>
        </>
      )}
    </main>
  );
}
