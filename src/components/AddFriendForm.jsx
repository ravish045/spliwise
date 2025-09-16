import { useState } from 'react';
import { UserPlus } from 'lucide-react';

const AddFriendForm = ({ onAddFriend }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAddFriend(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter friend's name"
        className="flex-grow p-2 border rounded-md bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button type="submit" className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 flex items-center gap-2">
        <UserPlus size={18} /> Add
      </button>
    </form>
  );
};

export default AddFriendForm;