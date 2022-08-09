interface NavButtonsProps {
	navItems: any[];
	selectedNavButton: string;
	onClick: Function;
	textBold?: boolean;
	textSize?: number;
	textColor?: string;
}

interface NavButton {
	key: string;
	title: string;
	onClick: Function;
}

export const NavButtons = (props: NavButtonsProps) => {
	const { navItems, selectedNavButton, onClick, textBold, textSize, textColor } = props;
	const NavButton = (data: NavButton) => {
		const { key, title } = data;
		return (
			<button
				type="button"
				key={key}
				className={[
					"btn btn-outline-white text-decoration-none",
					`text-${selectedNavButton == key ? (textColor ? `${textColor}` : "dark") : 'secondary'}`,
					`${textBold ? "fw-bold" : ""}`,
					`${textSize ? `fs-${textSize}` : ""}`
				].join(" ")}
				onClick={() => { onClick(key) }}>
				{title}
			</button>
		);
	};

	return (
		<div className="d-flex justify-content-around">
			{navItems.map((e) => { return NavButton(e); })}
		</div>
	);
}