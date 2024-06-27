"use client";
import { Input } from "postcss";
import React, { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

export default function TodoListitem({
  todo,
  onDelete = () => {},
  onUpdate = () => {},
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [userInput, setUserInput] = useState(todo?.content ?? "");

  const onStartEdit = () => {
    setIsEdit(true);
  };
  //수정이 끝낫을때
  const onFinishEdit = () => {
    onUpdate(todo.id, userInput);
    setIsEdit(false);
  };
  //삭제버튼 클릭했을때
  const onClickDelete = () => {
    onDelete(todo.id);
  };
  return (
    <li className="min-h-[60px] bg-orange-100 border-black rounded-2xl font-bold group">
      <article className="min-h-[60px] p-4 flex flex-col sm:flex-row gap-4">
        {isEdit ? (
          <input
            className="flex-1 text-[18px]"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            type="text"
          />
        ) : (
          <div
            onClick={onFinishEdit}
            className="flex flex-1 text-[18px] cursor-pointer gap-2"
          >
            <div
              className="flex justify-center items-center  cursor-pointer "
              onClick={onClickDelete}
            >
              <BsCheckLg size={25} />
            </div>{" "}
            {todo?.content}
          </div>
        )}

        <div className=" w-fit hidden group-hover:flex self-end gap-2">
          {isEdit ? (
            <div
              className="flex justify-center items-center   cursor-pointer "
              onClick={onFinishEdit}
            >
              <CiCircleCheck size={25} />
            </div>
          ) : (
            <div
              className="flex justify-center items-center   cursor-pointer "
              onClick={onStartEdit}
            >
              <CiEdit size={25} />
            </div>
          )}
        </div>
      </article>
    </li>
  );
}
