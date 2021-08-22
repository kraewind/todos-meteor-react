import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';

 
export const App = () => {
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const [hideCompleted, setHideCompleted] = useState(false);

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  );

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;

  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );
 
  const onCheckboxClick = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  };

  const onDeleteClick = ({ _id }) => TasksCollection.remove(_id);

  

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
          <h1>
            📝️ To Do List
            {pendingTasksTitle}
          </h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />

        <div className="filter">
         <button onClick={() => setHideCompleted(!hideCompleted)}>
           {hideCompleted ? 'Show All' : 'Hide Completed'}
         </button>
       </div>

        <ul className="tasks">
          {tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={onCheckboxClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};