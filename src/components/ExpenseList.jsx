import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return <p className="text-center mt-4 text-slate-500">No expenses added yet.</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Expense History</h3>
      <ul className="space-y-3">
        <AnimatePresence>
          {expenses.map((expense) => (
            <motion.li
              key={expense.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
            >
              <div>
                <p className="font-medium">{expense.description}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {/* Change #1: Updated currency symbol */}
                  {expense.payer} paid ₹{expense.amount.toFixed(2)}
                </p>
              </div>
              <button onClick={() => onDeleteExpense(expense.id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 size={18} />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default ExpenseList;
