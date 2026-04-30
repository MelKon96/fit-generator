import React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, ...props }) => {
  return (
    <div className="space-y-2 text-center">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{label}</label>
      <input {...props} className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-bold text-center placeholder:text-slate-300" />
    </div>
  );
};

export default FormField;
