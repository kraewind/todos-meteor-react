import React, { useState } from 'react';
 
export const TaskForm = () => {
  const [text, setText] = useState("");



  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date()
    });

    setText("");
  };
 
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
 
      <button type="submit">Add Task</button>
    </form>
  );
};