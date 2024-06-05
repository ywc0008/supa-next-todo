import React from "react";
import { sleep } from "@/lib/utils";
import TodoContainer from "./components/TodoContainer";

export default async function page() {
  return (
    <div>
      page
      <TodoContainer />
    </div>
  );
}
