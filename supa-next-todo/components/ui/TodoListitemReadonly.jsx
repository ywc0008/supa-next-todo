"use client";
import React from "react";

export default function TodoListitemReadonly({ todo }) {
  return (
    <li className="min-h-[60px]  font-bold group text-white">
      <article className="min-h-[60px] p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 text-[18px] cursor-pointer">{todo?.content}</div>
      </article>
    </li>
  );
}
