"use client";

import TodoList from "@/components/ui/TodoList";
import useTodosController from "../hooks/useTodosController";
import { useEffect, useState } from "react";

interface TodoContainerProps {
  ownerUserId?: string;
}

export default function TodoContainer({ ownerUserId }: TodoContainerProps) {
  const {
    loading,
    todos,
    onCreateTodos,
    onDeleteTodos,
    onSearchTodos,
    onUpdateTodos,
  } = useTodosController(ownerUserId);

  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchRandomImage = async () => {
      const response = await fetch(
        "https://api.unsplash.com/photos/random/?client_id=d1hQPJ3dmqHROEEvBmLy6ZdNYKJIqcpyADOakLg41Jw&query=nightsky"
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
        ownerUserId={ownerUserId}
        loading={loading}
        todoListData={todos}
        isReadOnly={false}
        onUpdate={onUpdateTodos}
        onCreate={onCreateTodos}
        onDelete={onDeleteTodos}
        onSearch={onSearchTodos}
      />
    </div>
  );
}
