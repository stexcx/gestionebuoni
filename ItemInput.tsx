
import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';

interface ItemInputProps {
  onAddPrice: (price: number) => void;
}

const ItemInput: React.FC<ItemInputProps> = ({ onAddPrice }) => {
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceValue = parseFloat(price);
    if (!isNaN(priceValue) && priceValue > 0) {
      onAddPrice(priceValue);
      setPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Prezzo (€)"
        step="0.01"
        min="0.01"
        className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
        required
        autoFocus
      />
      <button
        type="submit"
        className="w-full sm:w-auto flex-grow bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all flex items-center justify-center gap-2"
        aria-label="Aggiungi prezzo"
      >
        <PlusIcon className="w-5 h-5" />
        Aggiungi Prezzo
      </button>
    </form>
  );
};

export default ItemInput;
