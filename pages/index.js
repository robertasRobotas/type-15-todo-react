import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const createTask = () => {
    //TODO: add real id
    const newTask = {
      title: task,
      isDone: false,
      creationDate: new Date(),
    };

    setTasks([...tasks, newTask]);

    console.log([...tasks, newTask]);
  };

  const removeCard = (title) => {
    const filteredTasks = tasks.filter((t) => {
      return t.title !== title;
    });

    setTasks(filteredTasks);
  };

  return (
    <div className={styles.main}>
      <h1>todo app</h1>

      <input
        placeholder="task"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
      />

      <button onClick={() => createTask()}>Add task</button>

      {tasks.length ? (
        <div className={styles.cardsWrapper}>
          {tasks.map((t) => (
            <div
              className={styles.card}
              key={t.title}
              onClick={() => {
                removeCard(t.title);
              }}
            >
              {t.title}
            </div>
          ))}
        </div>
      ) : (
        <h4>No tasks yet</h4>
      )}
    </div>
  );
}
