import { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateBalances } from './utils/calculateBalances';

import Header from './components/Header';
import AddFriendForm from './components/AddFriendForm';
import FriendList from './components/FriendList';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import BalanceSummary from './components/BalanceSummary';
import Dashboard from './components/Dashboard';

function App() {
  const [friends, setFriends] = useLocalStorage('friends', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  const handleAddFriend = (name) => {
    if (!friends.includes(name)) {
      setFriends(prev => [...prev, name]);
    } else {
      alert("This friend already exists!");
    }
  };

  const handleRemoveFriend = (nameToRemove) => {
    const isFriendInvolved = expenses.some(
      expense => expense.payer === nameToRemove || expense.participants.includes(nameToRemove)
    );

    if (isFriendInvolved) {
      alert(`${nameToRemove} cannot be removed because they are part of an existing expense. Please remove the relevant expenses first.`);
      return;
    }
    
    setFriends(prev => prev.filter(friend => friend !== nameToRemove));
  };

  const handleAddExpense = (expense) => {
    setExpenses(prev => [expense, ...prev]);
  };
  
  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const { balances, transactions } = useMemo(() => calculateBalances(expenses, friends), [expenses, friends]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto p-4 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Friends</h2>
              <AddFriendForm onAddFriend={handleAddFriend} />
              <FriendList friends={friends} onRemoveFriend={handleRemoveFriend} />
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

      {/* Footer Section */}
      <footer className="py-6 text-center text-sm text-slate-500 dark:text-slate-400 border-t dark:border-slate-800 mt-8 bg-white dark:bg-slate-900">
        <p>&copy; {new Date().getFullYear()} Ravish. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;