import { useState } from 'react';
import './App.css';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
    const [selectCategory, setSelectedCategory] = useState(''); // This is the initial state of the select element
    const [expenses, setExpenses] = useState([   // This is the initial state of the expenses array similating a database
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
    
    const visibleExpenses = selectCategory ? expenses.filter((expense) => expense.category === selectCategory) : expenses;
    
	return (
		<div>
            <div className="mb-5">
                < ExpenseForm onSubmit={ ()=> console.log()}/>
            </div>
            <div className="mb-5">
                <ExpenseFilter onSelectCategory={ (category) => setSelectedCategory(category)}/>
            </div>
            <div className="mb-5">
               <ExpenseList expenses={visibleExpenses} onDelete={(id) => ( setExpenses( expenses.filter((expense) => expense.id !== id) ) )}/>
            </div>
		</div>
	);
}

export default App;
