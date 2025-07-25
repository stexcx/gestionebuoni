
import React from 'react';
import { PriceEntry } from '../types';
import TrashIcon from './icons/TrashIcon';

interface ItemListProps {
  items: PriceEntry[];
  onDeleteItem: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDeleteItem }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400">Nessun prezzo aggiunto.</p>
        <p className="text-slate-500 dark:text-slate-400">Aggiungi i prezzi dei tuoi articoli per calcolare il totale.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={item.id}
          className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm transition-transform hover:scale-[1.02]"
        >
          <span className="text-slate-800 dark:text-slate-200">Articolo #{index + 1}</span>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-900 dark:text-white">
              {item.price.toFixed(2)} €
            </span>
            <button
              onClick={() => onDeleteItem(item.id)}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              aria-label={`Elimina prezzo ${item.price.toFixed(2)}`}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
