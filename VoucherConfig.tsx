
import React from 'react';

interface VoucherConfigProps {
  voucherValue: number;
  setVoucherValue: (value: number) => void;
  voucherQuantity: number;
  setVoucherQuantity: (value: number) => void;
}

const VoucherConfig: React.FC<VoucherConfigProps> = ({
  voucherValue,
  setVoucherValue,
  voucherQuantity,
  setVoucherQuantity,
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Configura Buoni Pasto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="voucherValue" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Valore Buono (€)
          </label>
          <input
            id="voucherValue"
            type="number"
            value={voucherValue > 0 ? voucherValue : ''}
            onChange={(e) => setVoucherValue(parseFloat(e.target.value) || 0)}
            placeholder="Es. 8.00"
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="voucherQuantity" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Quantità Buoni
          </label>
          <input
            id="voucherQuantity"
            type="number"
            value={voucherQuantity > 0 ? voucherQuantity : ''}
            onChange={(e) => setVoucherQuantity(parseInt(e.target.value, 10) || 0)}
            placeholder="Es. 10"
            className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default VoucherConfig;
