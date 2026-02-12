import { useState } from "react";
import { useForm, router } from "@inertiajs/react";

function Welcome({ tasks: initialTasks = [] }) {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingText, setEditingText] = useState("");

    // Formulario para crear tarea
    const { data, setData, post, processing, reset } = useForm({ title: "" });

    // Crear tarea
    const addTask = (e) => {
        e.preventDefault();
        if (!data.title.trim()) return;
        post("/tasks", { onSuccess: () => reset() });
    };

    // Marcar / desmarcar completada
    const toggleCompleted = (task) => {
        router.patch(`/tasks/${task.id}`, { completed: !task.completed });
    };

    // Edición de título
    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setEditingText(task.title);
    };

    const finishEditing = (task) => {
        const trimmed = editingText.trim();
        if (!trimmed || trimmed === task.title) {
            setEditingTaskId(null);
            return;
        }
        router.patch(`/tasks/${task.id}`, { title: trimmed }, {
            onSuccess: () => setEditingTaskId(null),
        });
    };

    // Eliminar tarea
    const deleteTask = (id) => {
        router.delete(`/tasks/${id}`);
    };

    // Limpiar completadas
    const clearCompleted = () => {
        router.delete("/tasks/completed");
    };

    // Contadores
    const total = initialTasks.length;
    const completed = initialTasks.filter((t) => t.completed).length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="p-6 max-w-md mx-auto">
            {/* Título */}
            <h1 className="text-3xl font-bold mb-6">📝 Lista de tareas pendientes</h1>

            {/* Contadores */}
            <div className="flex justify-between mb-4 text-sm text-gray-600">
                <span>Total: {total}</span>
                <span>Completadas: {completed}</span>
                <span>Progreso: {progress}%</span>
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Formulario añadir tarea */}
            <form onSubmit={addTask} className="flex mb-4">
                <input
                    type="text"
                    className="border p-2 flex-1 mr-2 rounded"
                    placeholder="Añadir nueva tarea"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Añadir
                </button>
            </form>

            {/* Lista de tareas */}
            <ul className="mb-4 space-y-2">
                {initialTasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-2">
                        {/* Checkbox completada */}
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleCompleted(task)}
                        />

                        {/* Título (o input de edición) */}
                        {editingTaskId === task.id ? (
                            <input
                                type="text"
                                className="border p-1 flex-1 rounded"
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                onBlur={() => finishEditing(task)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") finishEditing(task);
                                    if (e.key === "Escape") setEditingTaskId(null);
                                }}
                                autoFocus
                            />
                        ) : (
                            <span
                                onClick={() => startEditing(task)}
                                className={`flex-1 cursor-pointer ${
                                    task.completed ? "line-through text-gray-400" : ""
                                }`}
                            >
                                {task.title}
                            </span>
                        )}

                        {/* Botón eliminar */}
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-400 hover:text-red-600 text-sm px-2"
                            title="Eliminar"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>

            {/* Botón limpiar completadas */}
            {completed > 0 && (
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={clearCompleted}
                >
                    Limpiar completadas ({completed})
                </button>
            )}

            {total === 0 && (
                <p className="text-gray-400 text-sm">No hay tareas. ¡Añade una!</p>
            )}
        </div>
    );
}

export default Welcome;


