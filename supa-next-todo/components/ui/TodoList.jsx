"use client";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { useCopyToClipboard } from 'usehooks-ts'
import TodoListitem from "./TodoListitem";
import { useState } from "react";


export default function TodoList({sharedUserFullName="", ownerUserId="", loading=false, todoListData=[], isReadOnly=false,onUpdate=(id, updatedContent)=>{},
onCreate=()=>{},
onDelete=(id)=>{},
onSearch=(terms)=>{}}) {
    const [userSearchInput,setUserSearchInput]=useState("");
    const [copiedText, copy] = useCopyToClipboard()
    const handleCopy = () => {
        const shareLink=`${"todoList 공유할 링크"}/share/${ownerUserId}`;
        copy(shareLink)
          .then(() => {
            console.log(`공유링크 복사완료! \n ${shareLink}`)
          })
          .catch(error => {
            console.error('Failed to copy!', error)
          })
      }
      const handleSearchEnd=()=>{
        onSearch(userSearchInput);
        setUserSearchInput("");
      }
    return (
        <section className=" min-h-[70vh] bg-orange-400">
            <div className=" w-full max-w-[800px] mx-auto">
               <article className=" flex justify-between items-center">
               <div className=" font-bold text-[32px]">
                    {sharedUserFullName?? <div>{sharedUserFullName}</div>}
                    메할일
                </div>
                {ownerUserId && 
                <div onClick={handleCopy} className=" font-bold text-[20px] flex items-center cursor-pointer">Share<IoShareSocialOutline /></div>}
               </article>

                    {
                        !isReadOnly &&(
                            <article className="flex flex-col sm:flex-row gap-4 mt-8">
                            <div className="flex flex-1 h-[60px] ">
                                <input value={userSearchInput} onChange={(e)=>setUserSearchInput(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter") handleSearchEnd()}} className="p-4 flex-1 bg-orange-300 border-black rounded-l-2xl font-bold" type="text" />
                                <div className="w-[60px] flex justify-center items-center bg-black rounded-r-2xl cursor-pointer">
                                <IoSearch onClick={handleSearchEnd} size={40} color="#fff" />
                                </div>
                                <div onClick={onCreate} className="h-[60px] w-[60px] flex justify-center items-center bg-orange-200 rounded-2xl font-bold cursor-pointer text-[20px]">오늘의 메할일</div>
                            </div>
                           </article>
                        )
                    }

              
               <div className=" h-[2px] my-10 bg-black"></div>
               {todoListData?.length>=1 ?(<ul className="flex flex-col gap-6">
                {(todoListData??[]).map((todo)=>{
                    return <TodoListitem key={todo?.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
                })}
               </ul>):(<div>
                {loading? "로딩중...": "메할일 끝! 재획하쉴?"}
               </div>
               )}
            </div>
        </section>
    );
}

