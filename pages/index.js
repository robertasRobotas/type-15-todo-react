import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const createTask = () => {
    //TODO: add real id
    const newTask = {
      id: uuidv4(),
      title: task,
      isDone: false,
      creationDate: new Date(),
    };

    setTasks([...tasks, newTask]);

    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const switchTaskStatus = (id) => {
    const index = tasks.findIndex((t) => t.id === id);

    tasks[index].isDone = !tasks[index].isDone;

    localStorage.setItem("tasks", JSON.stringify([...tasks]));
    setTasks([...tasks]);
  };

  useEffect(() => {
    const localTasks = localStorage.getItem("tasks");

    if (localTasks) {
      setTasks(JSON.parse(localTasks));
    }
  }, []);

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

      <button
        onClick={() => {
          createTask();
          setTask("");
        }}
      >
        Add task
      </button>

      {tasks.length ? (
        <div className={styles.cardsWrapper}>
          {tasks.map((t) => (
            <div
              className={`${styles.card} ${
                t.isDone ? styles.completedTask : styles.incompletedTask
              }`}
              key={t.id}
              onClick={() => {
                switchTaskStatus(t.id);
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
