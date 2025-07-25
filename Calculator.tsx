import React, { useState, useMemo, useEffect } from 'react';
import { PriceEntry } from '../types';
import VoucherConfig from './VoucherConfig';
import ItemInput from './ItemInput';
import ItemList from './ItemList';
import Summary from './Summary';
import TrashIcon from './icons/TrashIcon';

const Calculator: React.FC = () => {
  const [items, setItems] = useState<PriceEntry[]>([]);
  const [voucherValue, setVoucherValue] = useState<number>(8);
  const [voucherQuantity, setVoucherQuantity] = useState<number>(10);

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('mealVoucherCalcState');
      if (savedState) {
        const { items: savedItems, voucherValue: savedVoucherValue, voucherQuantity: savedVoucherQuantity } = JSON.parse(savedState);
        if (savedItems) setItems(savedItems);
        if (savedVoucherValue) setVoucherValue(savedVoucherValue);
        if (savedVoucherQuantity) setVoucherQuantity(savedVoucherQuantity);
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const stateToSave = JSON.stringify({ items, voucherValue, voucherQuantity });
      localStorage.setItem('mealVoucherCalcState', stateToSave);
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [items, voucherValue, voucherQuantity]);


  const handleAddPrice = (price: number) => {
    const newItem: PriceEntry = {
      id: Date.now(),
      price,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  
  const handleClearAll = () => {
    setItems([]);
  };

  const totalSpending = useMemo(() => {
    return items.reduce((total, item) => total + item.price, 0);
  }, [items]);

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Calcolatrice Spesa</h2>
                {items.length > 0 && (
                    <button
                        onClick={handleClearAll}
                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                        aria-label="Svuota la lista dei prezzi"
                    >
                        <TrashIcon className="w-4 h-4" />
                        Svuota
                    </button>
                )}
           </div>
           <ItemInput onAddPrice={handleAddPrice} />
        </div>
        <ItemList items={items} onDeleteItem={handleDeleteItem} />
      </div>
      <div className="lg:col-span-2 space-y-6">
        <VoucherConfig
          voucherValue={voucherValue}
          setVoucherValue={setVoucherValue}
          voucherQuantity={voucherQuantity}
          setVoucherQuantity={setVoucherQuantity}
        />
        <Summary 
          totalSpending={totalSpending}
          voucherValue={voucherValue}
          voucherQuantity={voucherQuantity}
        />
      </div>
    </div>
  );
};

export default Calculator;