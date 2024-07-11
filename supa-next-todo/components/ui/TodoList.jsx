"use client";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { useCopyToClipboard } from "usehooks-ts";
import TodoListitem from "./TodoListitem";
import { useState } from "react";
import TodoListitemReadonly from "./TodoListitemReadonly";

export default function TodoList({
  sharedUserFullName = "",
  ownerUserId = "",
  loading = false,
  todoListData = [],
  isReadOnly = false,
  onUpdate = (id, updatedContent) => {},
  onCreate = (content) => {},
  onDelete = (id) => {},
  onSearch = (terms) => {},
}) {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [copiedText, copy] = useCopyToClipboard();
  const [todoInput, setTodoInput] = useState("");

  const handleCopy = () => {
    const shareLink = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}/share/${ownerUserId}`;
    copy(shareLink)
      .then(() => {
        window.alert(`공유링크 복사완료! \n ${shareLink}`);
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };
  const handleSearchEnd = () => {
    onSearch(userSearchInput);
    setUserSearchInput("");
  };

  // 엔터버튼으로 투두리스트 생성하기
  const handleCreate = (event) => {
    if (event.key === "Enter") {
      onCreate(todoInput ?? "");
      setTodoInput("");
    }
  };

  return (
    <section className=" h-screen">
      <div className=" w-full max-w-[800px] mx-auto  h-full">
        <article className=" flex justify-between items-center">
          <div className="flex w-full justify-center items-center text-center font-bold text-[32px]">
            {sharedUserFullName && `${sharedUserFullName}님의 투두리스트`}
          </div>
        </article>
        {ownerUserId && (
          <div
            onClick={handleCopy}
            className="fixed bottom-0 right-0 m-4 font-bold text-[20px] flex items-center cursor-pointer"
          >
            <IoShareSocialOutline size={30} />
          </div>
        )}
        {!isReadOnly && (
          <article className="flex flex-col gap-4 my-8 h-1/5">
            <div className=" flex flex-col h-[60px] w-full gap-4">
              <div className=" w-full">
                <input
                  type="text"
                  value={todoInput}
                  onChange={(e) => {
                    setTodoInput(e.target.value);
                  }}
                  placeholder="오늘 할 일은 무엇인가요?"
                  onKeyDown={handleCreate}
                  className="w-full p-4 flex-1 bg-transparent border-b-2 border-b-gray-200 focus:border-b-white focus:outline-none font-bold placeholder:text-white placeholder:opacity-80 placeholder:text-center text-white"
                />
              </div>
              <div className="flex flex-1">
                <input
                  value={userSearchInput}
                  placeholder="검색할 투두리스트를 입력하세요"
                  onChange={(e) => setUserSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchEnd();
                  }}
                  className="p-4 flex-1 bg-transparent border-b-2 border-b-gray-200 focus:border-b-white focus:outline-none font-bold placeholder:text-white placeholder:opacity-80 placeholder:text-center text-white"
                  type="text"
                />

                <div className=" w-[60px] flex border-b-2 border-b-gray-200 focus:border-b-white justify-center items-center  cursor-pointer">
                  <IoSearch onClick={handleSearchEnd} size={30} color="#fff" />
                </div>
              </div>
            </div>
          </article>
        )}

        {todoListData?.length >= 1 ? (
          <ul className="flex flex-col gap-6">
            {(todoListData ?? []).map((todo) => {
              if (isReadOnly) {
                return <TodoListitemReadonly key={todo?.id} todo={todo} />;
              }
              return (
                <TodoListitem
                  key={todo?.id}
                  todo={todo}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              );
            })}
          </ul>
        ) : (
          <div>{loading ? "로딩중..." : "할일 끝!"}</div>
        )}
      </div>
    </section>
  );
}
