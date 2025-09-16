import { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateBalances } from './utils/calculateBalances';

import Header from './components/Header';
import AddFriendForm from './components/AddFriendForm';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import BalanceSummary from './components/BalanceSummary';
import Dashboard from './components/Dashboard';

function App() {
  // Change #2: Removed pre-defined names. Starts with an empty array.
  const [friends, setFriends] = useLocalStorage('friends', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  const handleAddFriend = (name) => {
    if (!friends.includes(name)) {
      setFriends(prev => [...prev, name]);
    } else {
      alert("This friend already exists!");
    }
  };

  const handleAddExpense = (expense) => {
    setExpenses(prev => [expense, ...prev]);
  };
  
  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const { balances, transactions } = useMemo(() => calculateBalances(expenses, friends), [expenses, friends]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Friends</h2>
              <AddFriendForm onAddFriend={handleAddFriend} />
            </div>
            <AddExpenseForm friends={friends} onAddExpense={handleAddExpense} />
            <BalanceSummary transactions={transactions} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <Dashboard expenses={expenses} friends={friends} balances={balances} />
            <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
