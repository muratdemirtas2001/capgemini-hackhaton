const generateOptions = (options) => {
	return options.map((possibility, index) => {
		return (
			<option value={possibility} key={`${index}--${possibility}`}>
				{possibility}
			</option>
		);
	});
};

export default generateOptions;
