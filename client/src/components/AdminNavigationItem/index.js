const AdminNavigationItem = ({ page, onClick, active }) => {
	return active ? (
		<div>
			<p className="link bold-text" onClick={onClick}>
				{" "}
				{page}{" "}
			</p>
		</div>
	) : (
		<p className="link" onClick={onClick}>
			{" "}
			{page}{" "}
		</p>
	);
};

export default AdminNavigationItem;
