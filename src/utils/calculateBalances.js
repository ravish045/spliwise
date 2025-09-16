export const calculateBalances = (expenses, friends) => {
    const balances = friends.reduce((acc, friend) => {
        acc[friend] = 0;
        return acc;
    }, {});

    expenses.forEach(expense => {
        const { amount, payer, participants } = expense;
        const share = amount / participants.length;

        // Payer's balance increases
        balances[payer] += amount;

        // Participants' balances decrease
        participants.forEach(participant => {
            balances[participant] -= share;
        });
    });

    const owers = [];
    const owed = [];

    Object.entries(balances).forEach(([person, balance]) => {
        if (balance < 0) {
            owers.push({ person, amount: -balance });
        } else if (balance > 0) {
            owed.push({ person, amount: balance });
        }
    });
    
    const transactions = [];

    let i = 0;
    let j = 0;

    while (i < owers.length && j < owed.length) {
        const ower = owers[i];
        const owedPerson = owed[j];
        const amount = Math.min(ower.amount, owedPerson.amount);
        
        // Use a small epsilon for floating point comparisons
        const epsilon = 0.01; 

        if (amount > epsilon) {
          transactions.push({
              from: ower.person,
              to: owedPerson.person,
              amount: amount,
          });

          owers[i].amount -= amount;
          owed[j].amount -= amount;
        }

        if (owers[i].amount <= epsilon) {
            i++;
        }
        if (owed[j].amount <= epsilon) {
            j++;
        }
    }

    return { balances, transactions };
};