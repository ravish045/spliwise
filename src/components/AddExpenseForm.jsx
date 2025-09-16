import { useState } from 'react';

const AddExpenseForm = ({ friends, onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState(friends[0] || '');
  const [participants, setParticipants] = useState(friends);

  // Effect to update payer and participants when friends list changes
  useState(() => {
      setPayer(friends[0] || '');
      setParticipants(friends);
  }, [friends]);

  const handleParticipantChange = (friend) => {
    setParticipants(prev =>
      prev.includes(friend)
        ? prev.filter(p => p !== friend)
        : [...prev, friend]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !payer || participants.length === 0) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      payer,
      participants,
    };
    onAddExpense(newExpense);

    // Reset form
    setDescription('');
    setAmount('');
    setPayer(friends[0] || '');
    setParticipants(friends);
  };

  if (friends.length === 0) {
    return <p className="text-center text-slate-500">Add some friends to start adding expenses!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-white dark:bg-slate-800 shadow-sm space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2 dark:border-slate-700">Add a New Expense</h3>
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
        <input id="description" type="text" value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-2 border rounded-md bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600" />
      </div>
      <div>
        {/* Change #1: Updated currency symbol */}
        <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount (₹)</label>
        <input id="amount" type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required className="w-full p-2 border rounded-md bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600" />
      </div>
      <div>
        <label htmlFor="payer" className="block text-sm font-medium mb-1">Paid By</label>
        <select id="payer" value={payer} onChange={e => setPayer(e.target.value)} required className="w-full p-2 border rounded-md bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
          {friends.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div>
        <p className="block text-sm font-medium mb-2">Split Between</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {friends.map(friend => (
            <label key={friend} className="flex items-center gap-2 p-2 border rounded-md dark:border-slate-700 cursor-pointer">
              <input type="checkbox" checked={participants.includes(friend)} onChange={() => handleParticipantChange(friend)} className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500" />
              {friend}
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
