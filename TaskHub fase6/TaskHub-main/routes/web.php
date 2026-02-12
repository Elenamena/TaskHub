<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Página principal → carga Welcome con tareas desde BD
Route::get('/', [TaskController::class, 'index']);

// CRUD de tareas
// IMPORTANTE: la ruta /tasks/completed debe ir ANTES de /tasks/{task}
// para que Laravel no interprete "completed" como un ID
Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
Route::patch('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
Route::delete('/tasks/completed', [TaskController::class, 'clearCompleted'])->name('tasks.clearCompleted');
Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');

// Dashboard
Route::get('/dashboard', function () {
    return \Inertia\Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Perfil
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
