import Swal from "sweetalert2";
import { getUserInfo } from "../../configs/Cookie";
import { getItem } from "../../services/itemService";
import { putMember } from "../../services/memberService";
import { Clothes } from "../../types/Clothes";
import { UpdateMember } from "../../types/Member";


interface PresetCardProps {
	index: number;
	presetList: Clothes[];
	clothes: Clothes;
	setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

const handleLoad = (props: PresetCardProps) => {
	const { index, presetList, setClothes } = props;
	if (!presetList[index]) {
		Swal.fire({
			icon: 'warning',
			title: "데이터 <span style='color:red'>미</span>포함",
			text: '불러올 옷이 없습니다.',
		});
	} else {
		Swal.fire({
			icon: 'question',
			title: `Preset${index + 1}에 불러오기`,
			text: `Preset${index + 1}에 저장된 옷을 불러오는 게 맞나요?`,
			showCancelButton: true,
			confirmButtonText: '맞아요!',
			confirmButtonColor: '#81c147',
			cancelButtonText: `아니에요;;`,
			cancelButtonColor: '#d33',
		}).then( async (result) => {
			if (result.isConfirmed) {
				const getClothes = Object.entries(presetList[index]);
				let result={};
				
				for(const [catCode, item] of getClothes){
					let { data, error } = await getItem(item.itemNum);
					if (error) {
						Swal.fire({
							icon: 'error',
							title: '아이템 불러오기 에러',
							text: `옷 데이터를 가져오는 데 실패했어요.`,
						});
					} else result[catCode]=data;
				}
				setClothes(result);

				Swal.fire({
					icon: 'success',
					title: '불러왔어요!',
					text: `Preset${index + 1}에 지금 입은 옷을 모두 불러왔어요.`,
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: '취소했어요!',
					text: '아무 일도 일어나지 않았답니다.',
				});
			}
		});
	}
};

const handleSave = (props: PresetCardProps) => {
	const { index, presetList, clothes } = props;
	if (!Object.getOwnPropertyNames(clothes).length) {
		Swal.fire({
			icon: 'warning',
			title: "데이터 <span style='color:red'>미</span>포함",
			text: '저장할 옷이 없습니다!',
		});
		return;
	}

	Swal.fire({
		icon: 'question',
		title: `Preset${index + 1}에 저장`,
		text: `지금 입은 옷을 Preset${index + 1}에 저장하는 게 맞나요?`,
		showCancelButton: true,
		confirmButtonText: '맞아요!',
		confirmButtonColor: '#81c147',
		cancelButtonText: `아니에요;;`,
		cancelButtonColor: '#d33',
	}).then(async (result) => {
		if (result.isConfirmed) {
			presetList[index] = clothes;

			const cookie = getUserInfo();

			const putpresetList = presetList.map((e) => {
				if (e) return Object.fromEntries(Object.entries(e).map((elem) => { return [elem[0], elem[1].itemNum] }));
				else return null;
			});

			const { data, error } = await putMember({ memberNum: cookie.num, presetList: putpresetList } as UpdateMember);

			if (!error) {
				console.log(data);
				Swal.fire({
					icon: 'success',
					title: '저장했습니다!',
					text: `Preset${index + 1}에 지금 입은 옷을 모두 저장했습니다.`,
				});
			} else {
				console.log(error);
				Swal.fire({
					icon: 'error',
					title: '멤버수정 오류',
					text: error,
				});
			}
		} else {
			Swal.fire({
				icon: 'error',
				title: '취소했어요!',
				text: '아무 일도 일어나지 않았습니다.',
			});
		}
	});
}

export const PresetCard = (props: PresetCardProps) => {
	const { index } = props;

	return (
		<div className="card">
			<div
				className="card-header text-center"
				data-bs-toggle="collapse"
				data-bs-target={`#collapsePreset${index + 1}`}
				aria-expanded="false"
				aria-controls={`collapsePreset${index + 1}`}>
				Preset {index + 1}
			</div>
			<div className="collapse" id={`collapsePreset${index + 1}`}>
				<div className="btn-group-vertical text-white w-100" role="group">
					<button
						type="button"
						className="btn btn-dark"
						onClick={() => { handleLoad(props); }}>
						Load
					</button>
					<button
						type="button"
						className="btn btn-dark"
						onClick={() => { handleSave(props); }}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};