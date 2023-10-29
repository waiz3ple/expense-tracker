import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import Categories from './Categories';
import { categories } from './Constants';
import Table from './Table';

const schema = z.object({
	description: z.string().min(3).max(50),
	amount: z.number().min(0.01).max(10000),
	category: z.enum(categories),
	//id: z.string().uuid(), //not notworking since id is not form input type
});

export type ExpenseFormData = z.infer<typeof schema>;

//I just add id to the infered type
export interface Expense extends ExpenseFormData {
	id: string;
}

function Form() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ExpenseFormData>({
		resolver: zodResolver(schema),
	});

	const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>('');

	const handleDelete = (id: string) => {
		setAllExpenses((prevExpenses) =>
			prevExpenses.filter((prevExpense) => prevExpense.id !== id)
		);
	};

	const showExpenses = selectedCategory
		? allExpenses.filter((expense) => expense.category === selectedCategory)
		: allExpenses;

	const onSubmit = (data: ExpenseFormData) => {
		const newExpense: Expense = { ...data, id: uuid() };
		setAllExpenses((prev) => [...prev, newExpense]);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3 mt-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input
						type="text"
						className="form-control"
						placeholder="Enter an Item e.g 'Beans'"
						{...register('description', { required: true })}
					/>
					{errors.description && (
						<p className="text-danger">{errors.description.message}</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="amount" className="form-label">
						Amount
					</label>
					<input
						type="number"
						className="form-control"
						placeholder="Enter Amount"
						step="0.01"
						{...register('amount', { valueAsNumber: true, required: true })}
					/>
					{errors.amount && (
						<p className="text-danger">{errors.amount.message}</p>
					)}
				</div>
				<div className="mb-3">
					<select
						id="category"
						className="form-select"
						{...register('category', { required: true })}
					>
						<option value="">Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					{errors.category && (
						<p className="text-danger">{errors.category.message}</p>
					)}
				</div>
				<button className="btn btn-primary" type="submit">
					Submit
				</button>
			</form>
			<Categories
				options={categories}
				onSelectedCategory={setSelectedCategory}
			/>
			<Table expenses={showExpenses} onDelete={handleDelete} />
		</>
	);
}

export default Form;
