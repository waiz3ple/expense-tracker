import { useState } from 'react';
import './App.css';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
    const [expenses, setExpenses] = useState([
        { id: 1, description: 'Rent', amount: 1600, category: 'Housing' },
        { id: 2, description: 'Groceries', amount: 100, category: 'Food' },
        { id: 3, description: 'Gas', amount: 40, category: 'Transportation' },
        { id: 4, description: 'Dinner', amount: 80, category: 'Food' },
        { id: 5, description: 'Phone', amount: 60, category: 'Utilities' },
        { id: 6, description: 'Car insurance', amount: 100, category: 'Insurance' },
        { id: 7, description: 'Internet', amount: 60, category: 'Utilities' },
        { id: 8, description: 'Water', amount: 20, category: 'Utilities' },
        { id: 9, description: 'Electricity', amount: 50, category: 'Utilities' },
        { id: 10, description: 'Health insurance', amount: 200, category: 'Insurance' },
    ]);
 
    function onDelete(arg0: void): void {
        throw new Error('Function not implemented.');
    }

	return (
		<div>
            <div className="mb-5">
                < ExpenseForm onSubmit={ ()=> console.log()}/>
            </div>
            <div className="mb-5">
                <ExpenseFilter onSelectCategory={ () => console.log() }/>
            </div>
            <div className="mb-5">
               <ExpenseList expenses={expenses} onDelete={(id)=> ( setExpenses( expenses.filter((expense) => expense.id !== id) ) )}/>
            </div>
		</div>
	);
}

export default App;
