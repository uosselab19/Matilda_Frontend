interface ModalDressupCardProps {
	id: string;
	itemNum: number;
}

export const ModalDressupCard = (props: ModalDressupCardProps) => {
	const { id, itemNum } = props;
	return (
		<div className="modal fade" id={id}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="ModalDressupLabel">Modal title</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						{itemNum}
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-success">입히기</button>
						<button type="button" className="btn btn-primary">구매하기</button>
					</div>
				</div>
			</div>
		</div>
	);
};