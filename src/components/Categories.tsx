interface Categories {
	options: string[];
	//onSelected: (event: ChangeEvent<HTMLSelectElement>) => void;
	onSelectedCategory: (category: string) => void;
}
function Categories({ options, onSelectedCategory }: Categories) {
	return (
		<form className="mt-3 mb-4">
			<select
				name="select"
				id=""
				className="form-select"
				onChange={(event) => onSelectedCategory(event.target.value)}
			>
				<option value="">All Categories</option>
				{options.map((option) => (
					<option key={option}>{option}</option>
				))}
			</select>
		</form>
	);
}

export default Categories;
