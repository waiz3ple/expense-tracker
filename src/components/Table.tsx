import { MdDelete } from 'react-icons/md';
import { Expense } from './Form';

interface TableProps {
	expenses: Expense[];
	onDelete: (id: string) => void;
}

function Table({ expenses, onDelete }: TableProps) {
	return (
		<table className="table table-bordered">
			<thead>
				<tr>
					<th>Description</th>
					<th>Amount</th>
					<th>Category</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{expenses?.map(({ id, description, amount, category }) => (
					<tr key={id}>
						<td>{description}</td>
						<td>${parseFloat(String(amount)).toFixed(2)}</td>
						<td>{category}</td>
						<td>
							<button
								className="btn btn-warning"
								id={id}
								onClick={() => onDelete(id)}
							>
								Delete <MdDelete />
							</button>
						</td>
					</tr>
				))}
			</tbody>
			{expenses.length > 0 && (
				<tfoot>
					<tr>
						<td>Total</td>
						<td>
							$
							{expenses
								.reduce((accu, curr) => accu + +curr.amount, 0)
								.toFixed(2)}
						</td>
						<td></td>
					</tr>
				</tfoot>
			)}
		</table>
	);
}

export default Table;
