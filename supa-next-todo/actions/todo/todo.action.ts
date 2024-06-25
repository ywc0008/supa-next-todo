"use server";

import { createServerSideClient } from "@/lib/supabase";

// todoList 가져오기
export async function getTodos() {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .order("id", { ascending: false });

  return result.data;
}

// todoList 가져오기 + by Id
export async function getTodosById(id: number) {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id);
  return result.data;
}

// todoList 가져오기 + search
export async function getTodosBySearch(terms: string) {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null)
    .ilike("content", `%${terms}%`)
    .order("id", { ascending: false })
    .limit(500);
  return result.data;
}

// todoList 생성하기
export async function createTodos(content: string) {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .insert({ content })
    .select();
  console.log("result", result);

  return result.data;
}

// todoList 업데이트 하기
export async function updateTodos(id: number, content: string) {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();
  console.log("result", result);

  return result.data;
}

// todoList softDelete
export async function deleteTodosSoft(id: number) {
  const supabase = await createServerSideClient();
  const result = await supabase
    .from("todos_with_rls")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();
  return result.data;
}

// todoList hardDelete
// export async function deleteTodosHard(id:number){
//     const supabase=createServerSideClient();
//     const result = await supabase.from("todos_with_rls").delete().eq("id",id)
//     return result.data;

// }
