import { Trash2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FriendList = ({ friends, onRemoveFriend }) => {
  return (
    <div className="mt-6">
      <ul className="space-y-2">
        <AnimatePresence>
          {friends.map((friend, index) => (
            <motion.li
              key={friend}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              exit={{ opacity: 0, x: 50 }}
              className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                 <span className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full">
                    <User size={18} className="text-indigo-600 dark:text-indigo-400" />
                 </span>
                <span className="font-medium">{friend}</span>
              </div>
              <button
                onClick={() => onRemoveFriend(friend)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                aria-label={`Remove ${friend}`}
              >
                <Trash2 size={18} />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {friends.length === 0 && (
         <p className="text-center text-sm text-slate-500 mt-4">No friends added yet.</p>
      )}
    </div>
  );
};

export default FriendList;
