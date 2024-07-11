"use client";

import { createSupabaseBrowserClient } from "@/lib/client/supabase";

// todoList 가져오기
// export async function getTodos() {
//   const supabase = createSupabaseBrowserClient();
//   const result = await supabase
//     .from("todos_no_rls")
//     .select("*")
//     .is("deleted_at", null)
//     .order("id", { ascending: false });

//   return result.data;
// }

// // todoList 가져오기 + by Id
// export async function getTodosById(id: number) {
//   const supabase = createSupabaseBrowserClient();
//   const result = await supabase
//     .from("todos_no_rls")
//     .select("*")
//     .is("deleted_at", null)
//     .eq("id", id);
//   return result.data;
// }

// // todoList 가져오기 + search
// export async function getTodosBySearch(terms: string) {
//   const supabase = createSupabaseBrowserClient();
//   const result = await supabase
//     .from("todos_no_rls")
//     .select("*")
//     .is("deleted_at", null)
//     .ilike("content", `%${terms}%`)
//     .order("id", { ascending: false })
//     .limit(500);
//   return result.data;
// }

// // todoList 생성하기
// export async function createTodos(content: string) {
//   const supabase = createSupabaseBrowserClient();
//   const result = await supabase
//     .from("todos_no_rls")
//     .insert({ content })
//     .select();
//   return result.data;
// }

// // todoList 업데이트 하기
// export async function updateTodos(id: number, content: string) {
//   const supabase = createSupabaseBrowserClient();
//   const result = await supabase
//     .from("todos_no_rls")
//     .update({ content, updated_at: new Date().toISOString() })
//     .eq("id", id)
//     .select();
//   return result.data;
// }

// // todoList softDelete
// export async function deleteTodosSoft(id: number) {
//   const supabase = createSupabaseBrowserClient();
//   const result = await supabase
//     .from("todos_no_rls")
//     .update({
//       deleted_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     })
//     .eq("id", id)
//     .select();
//   return result.data;
// }

// todoList hardDelete
// export async function deleteTodosHard(id:number){
//     const supabase=createSupabaseBrowserClient();
//     const result = await supabase.from("todos_no_rls").delete().eq("id",id)
//     return result.data;

// }
