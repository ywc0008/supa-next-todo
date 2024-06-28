"use client";
import React, { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { BsCheckLg } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";

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
  // 엔터버튼으로 수정 끝내기
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onUpdate(todo.id, userInput);
      setIsEdit(false);
    }
  };
  return (
    <li className="min-h-[60px]  font-bold group text-white transition">
      <article className="min-h-[60px] p-4 flex flex-col sm:flex-row gap-4">
        {isEdit ? (
          <input
            className="flex-1 text-[18px] bg-transparent focus:bg-transparent focus:outline-none"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            onKeyDown={handleKeyPress}
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
            <div className="flex gap-3">
              <div
                className="flex justify-center items-center   cursor-pointer "
                onClick={onStartEdit}
              >
                <MdOutlineEdit size={25} />
              </div>
              <div
                className="flex justify-center items-center  cursor-pointer "
                onClick={onClickDelete}
              >
                <HiOutlineTrash color="red" size={25} />
              </div>
            </div>
          )}
        </div>
      </article>
    </li>
  );
}
