import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = ({ expenses, friends, balances }) => {
    
  const totalPaidData = {
    labels: friends,
    datasets: [{
      // Change #1: Updated currency symbol in chart label
      label: 'Total Paid (₹)',
      data: friends.map(friend => {
        return expenses
          .filter(e => e.payer === friend)
          .reduce((acc, curr) => acc + curr.amount, 0);
      }),
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }],
  };
  
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Summary Table */}
      <div className="p-4 border rounded-lg bg-white dark:bg-slate-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Summary per Friend</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b dark:border-slate-700">
              <th className="py-2">Name</th>
              <th className="py-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {friends.map(friend => (
              <tr key={friend} className="border-b dark:border-slate-700 last:border-b-0">
                <td className="py-2">{friend}</td>
                <td className={`py-2 font-semibold ${balances[friend] >= 0 ? 'text-green-500' : 'text-orange-500'}`}>
                  {/* Change #1: Updated currency symbol in balance summary */}
                  {balances[friend] > 0 ? `Is owed ₹${balances[friend].toFixed(2)}` : (balances[friend] < 0 ? `Owes ₹${Math.abs(balances[friend]).toFixed(2)}` : '₹0.00')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pie Chart */}
      <div className="p-4 border rounded-lg bg-white dark:bg-slate-800 shadow-sm flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Who Paid for What</h3>
        {totalSpent > 0 ? (
          <Pie data={totalPaidData} />
        ) : (
          <p className="text-slate-500 mt-10">No data to display chart.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
