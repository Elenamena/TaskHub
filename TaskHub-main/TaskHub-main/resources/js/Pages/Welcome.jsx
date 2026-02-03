export default function Welcome() {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-black text-indigo-600 uppercase tracking-widest">
                TaskHub Practice
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
                Aprendiendo Laravel + React para DAW
            </p>
            <div className="mt-6 flex gap-4">
                <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition">
                    Crear Tarea
                </button>
                <button className="bg-white text-indigo-500 border border-indigo-500 px-6 py-2 rounded-lg hover:bg-indigo-50 transition">
                    Ver Listado
                </button>
            </div>
        </div>
    );
}