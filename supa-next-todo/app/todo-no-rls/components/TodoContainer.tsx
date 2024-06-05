"use client";

import useTodosController from "../hooks/useTodosController";

export default function TodoContainer() {
  const { loading, todos } = useTodosController();

  console.log("loading", loading);
  console.log("todos", todos);

  return <div>h1</div>;
}
