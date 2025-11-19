SplitWise - React Budget Splitter App 💸
A responsive web application built with React and Tailwind CSS that allows a group of friends to track shared expenses, split bills fairly, and visualize their balances. The app features a clean, modern UI with a dark mode toggle, and all data is persisted in the browser's localStorage.

🚀 Live Demo Link
(https://splitwiseappp.netlify.app/)

✨ Features
🧑‍🤝‍🧑 Friend Management: Easily add and remove friends from your group.

🧾 Expense Tracking: Add expenses with a description, amount, payer, and select which friends participated in the split.

🤖 Automatic Debt Simplification: The core logic calculates not just who owes money, but simplifies it to the minimum number of transactions. (e.g., If A owes B ₹10 and B owes A ₹5, the app simply shows A owes B ₹5).

📊 Interactive Dashboard:

A Pie Chart visualizes the total amount paid by each person.

A Summary Table shows the final balance for each friend (who owes and who is owed).

💾 Persistent Data: All friends and expenses are saved to the browser's localStorage, so your data is available across sessions.

🎨 Dark/Light Mode: A sleek theme toggle for user comfort.

📱 Fully Responsive: A mobile-first design that works beautifully on all screen sizes.

🎬 Smooth Animations: Subtle animations using Framer Motion provide a fluid user experience when adding or removing items.

🗑️ Safe Deletion: Friends involved in existing expenses cannot be removed, preventing data corruption.

🛠️ Technology Stack
Framework: React (bootstrapped with Vite)

Styling: Tailwind CSS

Data Visualization: Chart.js with react-chartjs-2

Animation: Framer Motion

Icons: Lucide React

Data Persistence: Browser localStorage API

⚙️ Getting Started
To run this project locally on your machine, follow these steps:

Prerequisites
Node.js (v18.x or later recommended)

npm (usually comes with Node.js)

Installation & Setup
Clone the repository:

git clone(https://github.com/ravish045/spliwise)

Navigate to the project directory:

cd your-repo-name

Install the dependencies:

npm install

Run the development server:

npm run dev

Open your browser and visit http://localhost:5173 to see the application running.

🚀 Deployment
This project is configured for easy deployment on static hosting platforms like Netlify or Vercel.

Build Command: npm run build

Publish Directory: dist

Simply link your GitHub repository to one of these services, and it will handle the build and deployment process automatically.
