import React from 'react';

const PriceBadge: React.FC<{ price: number }> = ({ price }) => (
  <div>
    <span className="text-2xl font-black text-slate-900">{price} ₽</span>
    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-tighter">за 100г</span>
  </div>
);

export default PriceBadge;