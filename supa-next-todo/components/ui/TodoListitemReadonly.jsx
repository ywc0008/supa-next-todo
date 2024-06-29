"use client";
import React from "react";
import { GoDotFill } from "react-icons/go";

export default function TodoListitemReadonly({ todo }) {
  return (
    <li className="min-h-[60px]  font-bold group text-white">
      <article className="min-h-[60px] p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex text-center items-center text-[18px] cursor-pointer">
          <GoDotFill />
          {todo?.content}
        </div>
      </article>
    </li>
  );
}
