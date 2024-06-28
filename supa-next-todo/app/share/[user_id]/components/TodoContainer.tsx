"use client";

import TodoList from "@/components/ui/TodoList";
import useTodosController from "../hooks/useTodosController";
import { useEffect, useState } from "react";

interface TodoContainerProps {
  sharedUserFullName?: string;
  ownerUserId?: string;
}

export default function TodoContainer({
  sharedUserFullName,
  ownerUserId,
}: TodoContainerProps) {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onDeleteTodos,
    onSearchTodos,
    onUpdateTodos,
  } = useTodosController(ownerUserId);

  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchRandomImage = async () => {
      const response = await fetch(
        "https://api.unsplash.com/photos/random/?client_id=d1hQPJ3dmqHROEEvBmLy6ZdNYKJIqcpyADOakLg41Jw&query=landscape"
      );
      const data = await response.json();
      setBackgroundImage(data.urls.full);
    };

    fetchRandomImage();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TodoList
        sharedUserFullName={sharedUserFullName}
        ownerUserId={ownerUserId}
        loading={loading}
        todoListData={todos}
        isReadOnly
        onUpdate={onUpdateTodos}
        onCreate={onCreateEmptyTodos}
        onDelete={onDeleteTodos}
        onSearch={onSearchTodos}
      />
    </div>
  );
}
