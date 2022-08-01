interface NavButtonsProps {
	navItems: any[];
	selectedTap: number;
	setSelectedTap: Function;
	textBold?: boolean;
	textSize?: number;
	textColor?: string;
}

export const NavButtons = (props: NavButtonsProps) => {
	const { navItems, selectedTap, setSelectedTap, textBold, textSize, textColor } = props;
	const NavButton = (index: number, butStr: string) => {
		return (
			<button
				className={
					[
						"btn btn-outline-white text-decoration-none",
						`text-${selectedTap == index ? (textColor ? `${textColor}` : "dark") : 'secondary'}`,
						`${textBold ? "fw-bold" : ""}`,
						`${textSize ? `fs-${textSize}` : ""}`
					].join(" ")
				}
				onClick={() => { setSelectedTap(index); }}
			> {butStr} </button>
		);
	};

	const buttons = navItems.map((e, i) => {
		return NavButton(i, e);
	});
	return (
		<div className="d-flex justify-content-around">
			{buttons}
		</div>
	);
}