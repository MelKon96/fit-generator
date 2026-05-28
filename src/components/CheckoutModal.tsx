import React, { useState } from "react";
import { CreditCard, MapPin, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, total }) => {
  const [step, setStep] = useState<"info" | "processing" | "success">("info");
  const [address, setAddress] = useState("");

  const handleGetLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await res.json();
      setAddress(data.display_name);
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("info");
      setAddress("");
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => setStep("success"), 3500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleClose} />

          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              {step === "info" && (
                <motion.form key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Оформление</h2>
                    <button type="button" onClick={handleClose} className="p-2 hover:bg-slate-100 cursor-pointer rounded-full transition-colors text-slate-400">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Доставка</label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <motion.button
                          type="button"
                          onClick={handleGetLocation}
                          animate={{
                            y: [-1.5, 1.5, -1.5],
                            color: ["#94a3b8", "#f97316", "#94a3b8"],
                            borderColor: ["#e2e8f0", "#fdba74", "#e2e8f0"],
                          }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative p-2 rounded-xl transition-all hover:cursor-pointer shadow-sm border-2 bg-white"
                        >
                          <MapPin size={18} fill="none" />
                        </motion.button>
                      </div>
                      <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Улица, дом, квартира" className="w-full pl-14 pr-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/10 font-bold transition-all border border-transparent focus:border-orange-200 text-slate-700" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Оплата</label>
                    <div className="bg-slate-900 rounded-[2rem] p-6 text-white space-y-4 shadow-xl">
                      <div className="relative">
                        <input
                          required
                          maxLength={19}
                          placeholder="0000 0000 0000 0000"
                          onChange={(e) => {
                            const val = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
                            e.target.value = val.match(/.{1,4}/g)?.join(" ") || val;
                          }}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-white/50 font-mono tracking-widest pr-12 text-sm"
                        />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 text-white" size={20} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input required placeholder="ММ/ГГ" maxLength={5} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-center font-bold text-sm" />
                        <input required placeholder="CVC" maxLength={3} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-center font-bold text-sm" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-orange-500 cursor-pointer  text-white py-5 rounded-3xl font-black uppercase tracking-widest hover:bg-orange-600 shadow-lg active:scale-95 transition-all text-sm">
                    Заплатить {total.toFixed(0)} ₽
                  </button>
                </motion.form>
              )}

              {step === "processing" && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center space-y-6">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full mx-auto" />
                  <h2 className="text-xl font-black text-slate-900">Связь с банком...</h2>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-12 text-center space-y-6">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl ring-8 ring-green-50">
                    <CheckCircle size={48} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Успешно!</h2>
                  <button onClick={handleClose} className="w-full py-4 bg-slate-900  cursor-pointer text-white rounded-2xl font-black uppercase text-xs tracking-widest">
                    Вернуться
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
