import { motion, AnimatePresence } from 'framer-motion';

const BalanceSummary = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center p-4 border-2 border-dashed rounded-lg border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20">
        <p className="font-semibold text-green-700 dark:text-green-300">🎉 Everyone is settled up!</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-slate-800 shadow-sm space-y-3">
      <h3 className="text-lg font-semibold border-b pb-2 dark:border-slate-700">Who Owes Whom</h3>
      <ul>
        <AnimatePresence>
          {transactions.map((t, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-between items-center py-2"
            >
              <span>
                <span className="font-bold text-orange-500">{t.from}</span> owes <span className="font-bold text-green-500">{t.to}</span>
              </span>
              <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">
                {/* Change #1: Updated currency symbol */}
                ₹{t.amount.toFixed(2)}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default BalanceSummary;
