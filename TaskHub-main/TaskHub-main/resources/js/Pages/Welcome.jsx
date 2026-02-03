
import { useState } from "react";

function Welcome() {
  // Estado de tareas y del input
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Añadir tarea
  const addTask = () => {
    const title = newTask.trim();
    if (title === "") return;
    const newTaskObj = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  // Marcar y desmarcar completada
  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Borrar tareas completadas
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // Editar título de una tarea
  const startEditing = (id, currentTitle) => {
    setEditingTaskId(id);
    setEditingText(currentTitle);
  };

  const finishEditing = (id) => {
    const trimmedText = editingText.trim();
    if (trimmedText === "") {
      setEditingTaskId(null); // vacio: cancela edición
      setEditingText("");
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: trimmedText } : task
      )
    );

    setEditingTaskId(null);
    setEditingText("");
  };

  // Contadores
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Título */}
      <h1 className="text-3xl font-bold mb-6">📝 Lista de tareas pendientes</h1>

      {/* Contadores */}
      <div className="flex justify-between mb-4">
        <div>Total: {totalTasks}</div>
        <div>Completadas: {completedTasks}</div>
        <div>Progreso: {progress}%</div>
      </div>

      {/* Input y botón añadir */}
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 flex-1 mr-2"
          placeholder="Añadir nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addTask}
        >
          Añadir
        </button>
      </div>

      {/* Lista de tareas */}
      <ul className="mb-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={task.completed}
              onChange={() => toggleCompleted(task.id)}
            />

            {editingTaskId === task.id ? (
              <input
                type="text"
                className="border p-1 flex-1"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => finishEditing(task.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") finishEditing(task.id);
                }}
                autoFocus
              />

            ) : (
              <span
                onClick={() => startEditing(task.id, task.title)}
                className={`flex-1 ${
                  task.completed ? "line-through text-gray-400" : ""
                } cursor-pointer`}
              >
                {task.title}
              </span>
            )}

          </li>
        ))}
      </ul>

      {/* Botón limpiar completadas */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={clearCompleted}
      >
        Limpiar lista
      </button>
    </div>
  );
}

export default Welcome;


