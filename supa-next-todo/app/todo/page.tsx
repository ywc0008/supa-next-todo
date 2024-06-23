"use client";

import { getTodoAction } from "@/actions/todo/todo.action";
import { sleep } from "@/lib/utils";
import ClientComponentTest from "./components/ClientComponentTest";

export default async function page() {
  console.log(">> SSR start");

  const result = await getTodoAction();
  await sleep(1500);

  console.log(">> SSR end");

  return (
    <div>
      {/* page {JSON.stringify(result)} */}
      <ClientComponentTest />
    </div>
  );
}
