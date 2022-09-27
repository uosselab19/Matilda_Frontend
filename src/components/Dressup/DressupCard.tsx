import { Clothes } from "../../types/Clothes";
import { Item } from "../../types/Item";
import { getS3Url } from "../../utils/S3";

interface DressupCardProps {
	clothes: Clothes;
	setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
	blankMessage:string;
}

export const DressupCard = (props: DressupCardProps) => {
	const { clothes, blankMessage } = props;

	return (Object.entries(clothes).length > 0) ? (
		<div className="row row-cols-1 g-1">
			{Object.entries(clothes).map((elem, index) => {
				const clothesElement = elem[1] as Item;
				return (
					<div className="card px-0" key={index}>
						<div className="row g-0">
							<div className='col-2'>
								<img src={getS3Url(clothesElement.imgUrl)} className="img-fluid rounded-start" alt={clothesElement.catCode} />
							</div>
							<div className='col-6'>
								<div className='card-body'>
									<div className="card-title fs-5 fw-bold">{clothesElement.catCode}</div>
									<div className="fs-4 fw-bold">{clothesElement.title}</div>
								</div>
							</div>
							<div className='col-3'>
								<button
									type="button"
									className="btn btn-primary w-100 h-100"
									onClick={() => { }}>
									Buy
								</button>
							</div>
							<div className='col-1'>
								<button
									type="button"
									className="btn btn-danger w-100 h-100"
									onClick={() => { }}>
									취소
								</button>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	) : (
		<div className='d-flex justify-content-center py-2'>
			{blankMessage}
		</div>
	)
};