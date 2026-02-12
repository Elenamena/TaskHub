<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    // GET / → devuelve la página Welcome con todas las tareas
    public function index()
    {
        return Inertia::render('Welcome', [
            'tasks' => Task::orderBy('created_at', 'asc')->get(),
        ]);
    }

    // POST /tasks → crear nueva tarea
    public function store(Request $request)
    {
        $request->validate(['title' => 'required|string|max:255']);

        Task::create([
            'title'     => $request->title,
            'completed' => false,
        ]);

        return redirect()->back();
    }

    // PATCH /tasks/{task} → editar título o marcar completada
    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title'     => 'sometimes|required|string|max:255',
            'completed' => 'sometimes|boolean',
        ]);

        $task->update($request->only(['title', 'completed']));

        return redirect()->back();
    }

    // DELETE /tasks/{task} → eliminar tarea
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->back();
    }

    // DELETE /tasks/completed → borrar todas las completadas
    public function clearCompleted()
    {
        Task::where('completed', true)->delete();

        return redirect()->back();
    }
}
