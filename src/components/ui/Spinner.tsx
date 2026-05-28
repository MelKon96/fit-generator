const Spinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Загрузка...</p>
      </div>
    </div>
  );
};

export default Spinner;