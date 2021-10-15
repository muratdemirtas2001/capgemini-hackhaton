const generateOptions = (options) => {
	return options.map((possibility) => {
		return <option value={possibility}>{possibility}</option>;
	});
};

export default generateOptions;
