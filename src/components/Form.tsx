import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Categories from './Categories';
import Table from './Table';

export interface Expense {
	description: string;
	amount: string;
	category: string;
	id: string;
}

function Form() {
	const categories: string[] = [
		'Groceries',
		'Utility',
		'Entertainment',
		'Health',
		'Charity',
	];

	const [allExpenses, setAllExpenses] = useState<Expense[]>([]);

	const [selectedCategory, setSelectedCategory] = useState('');

	const [expense, setExpense] = useState({
		description: '',
		amount: '',
		category: '',
		id: '',
	});

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		Object.values(expense).every((val) => val) &&
			setAllExpenses((allExpenses) => [
				...allExpenses,
				{ ...expense, id: uuid() }, //to avoid duplcate id on dup items
			]);
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		setExpense((prevExpense) => ({
			...prevExpense,
			id: uuid(),
			[name]: value,
		}));
	};

	const handleDelete = (id: string) => {
		setAllExpenses((prevExpenses) => [
			...prevExpenses.filter((expense) => expense.id !== id),
		]);
	};

	// trick on allExpenses ==> expense to show
	const showExpenses = selectedCategory
		? allExpenses.filter((expense) => expense.category === selectedCategory)
		: allExpenses;

	return (
		<>
			<form action="" method="post" onSubmit={handleSubmit}>
				<div className="mb-3 mt-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input
						id="description"
						type="text"
						className="form-control"
						placeholder="Enter an Item e.g 'Rice'"
						name="description"
						onChange={handleChange}
						value={expense?.description}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="amount" className="form-label">
						Amount
					</label>
					<input
						id="amount"
						type="number"
						className="form-control"
						placeholder="Enter Amount"
						name="amount"
						onChange={handleChange}
						value={expense.amount}
					/>
				</div>
				<div className="mb-3">
					<select
						name="category"
						id="category"
						className="form-select"
						onChange={handleChange}
					>
						<option>{expense.category}</option>
						{categories.map((category) => (
							<option key={category}>{category}</option>
						))}
					</select>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
			<Categories
				options={categories}
				onSelectedCategory={(category) => setSelectedCategory(category)}
			/>
			<Table expenses={showExpenses} onDelete={(id) => handleDelete(id)} />
		</>
	);
}
export default Form;
