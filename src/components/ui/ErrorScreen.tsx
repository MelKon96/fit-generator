import { AlertCircle } from "lucide-react";

const ErrorScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <AlertCircle size={48} className="text-red-400" />
        <p className="text-xl font-black uppercase tracking-widest text-slate-800">Ошибка загрузки</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Попробуйте обновить страницу</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-slate-900 cursor-pointer text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all">
          Обновить
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;
