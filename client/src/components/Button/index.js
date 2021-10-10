import "./Button.css";

const Button = ({ label, mode, size }) => {
	return (
		<button className={[`button--${mode}`, `button--${size}`].join(" ")}>
			{label}
		</button>
	);
};

export default Button;
