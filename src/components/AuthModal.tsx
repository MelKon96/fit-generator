import { useState } from "react";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ email: false, password: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: !email, password: !password });
    if (email && password) {
      onLogin(email);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black uppercase tracking-widest">Войти</h2>
          <button className="cursor-pointer" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-3 rounded-2xl outline-none transition-all ${errors.email ? "bg-red-50 border-1 border-red-400" : "bg-slate-100"}`} />
          <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-4 py-3 rounded-2xl outline-none transition-all ${errors.password ? "bg-red-50 border-1 border-red-400" : "bg-slate-100"}`} />
          <button type="submit" className="w-full cursor-pointer py-4 bg-slate-900 text-white rounded-2xl hover:cursor:pointer font-black uppercase tracking-widest hover:bg-orange-500 transition-all">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
