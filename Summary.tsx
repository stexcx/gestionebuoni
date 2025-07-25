
import React from 'react';
import InfoIcon from './icons/InfoIcon';

interface SummaryProps {
  totalSpending: number;
  voucherValue: number;
  voucherQuantity: number;
}

const Summary: React.FC<SummaryProps> = ({ totalSpending, voucherValue, voucherQuantity }) => {
  if (totalSpending === 0 && voucherQuantity === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">Riepilogo</h3>
        <p className="text-slate-500 dark:text-slate-400">Aggiungi articoli e configura i buoni per vedere il riepilogo.</p>
      </div>
    );
  }
  
  const vouchersUsedTheoretical = voucherValue > 0 ? Math.floor(totalSpending / voucherValue) : 0;
  const vouchersUsed = Math.min(vouchersUsedTheoretical, voucherQuantity);
  
  const remainingSpending = voucherValue > 0 ? totalSpending % voucherValue : totalSpending;
  const amountNeeded = voucherValue > 0 ? voucherValue - remainingSpending : 0;
  
  const canUseMoreVouchers = vouchersUsed < voucherQuantity;

  const totalVoucherValue = voucherValue * voucherQuantity;
  const usedVoucherValue = vouchersUsed * voucherValue;
  const remainingVoucherValue = totalVoucherValue - usedVoucherValue;
  const usedVoucherPercentage = voucherQuantity > 0 ? (vouchersUsed / voucherQuantity) * 100 : 0;
  
  const getAlertMessage = () => {
    if (voucherValue <= 0) {
      return "Imposta un valore per i buoni pasto per iniziare il calcolo.";
    }
    if (!canUseMoreVouchers && voucherQuantity > 0) {
      return "Hai utilizzato il numero massimo di buoni pasto disponibili.";
    }
    if (remainingSpending === 0 && totalSpending > 0) {
      return "Importo perfetto! Hai utilizzato un buono pasto completo senza resto.";
    }
    if (canUseMoreVouchers) {
       return <>Aggiungi <strong className="font-bold">{amountNeeded.toFixed(2)} €</strong> alla spesa per utilizzare un altro buono.</>;
    }
    return "Controlla i valori inseriti.";
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Riepilogo</h3>
      
      <div className="space-y-2 text-lg">
        <div className="flex justify-between items-baseline">
          <span className="text-slate-600 dark:text-slate-400">Spesa Totale:</span>
          <span className="font-bold text-2xl text-slate-900 dark:text-white">{totalSpending.toFixed(2)} €</span>
        </div>
      </div>
      
      <div className="!mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
        <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Statistiche Utilizzo</h4>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Buoni Utilizzati</span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{vouchersUsed} / {voucherQuantity}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${usedVoucherPercentage}%` }}
              role="progressbar"
              aria-valuenow={usedVoucherPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>

        <div className="space-y-2 text-base">
          <div className="flex justify-between items-baseline">
            <span className="text-slate-600 dark:text-slate-400">Valore Utilizzato:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{usedVoucherValue.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-slate-600 dark:text-slate-400">Valore Residuo:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{remainingVoucherValue.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      {totalSpending > 0 && (
        <div className="!mt-6 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/50 border-l-4 border-blue-500 flex items-center space-x-3">
          <InfoIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            {getAlertMessage()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Summary;
