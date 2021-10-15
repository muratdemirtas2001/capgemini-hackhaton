import "./Button.css";

const Button = ({ label, mode, size, onClick }) => {
	return (
		<button
			className={[`button--${mode}`, `button--${size}`].join(" ")}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default Button;
