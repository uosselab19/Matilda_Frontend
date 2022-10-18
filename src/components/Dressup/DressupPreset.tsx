import React, { useEffect } from 'react';
import { getUserInfo } from '../../utils/cookieUtil';
import { selectMember } from '../../services/memberService';
import { Clothes } from '../../types/Clothes';
import { alertError, alertSuccess, alertWarning, confirmQuestion } from '../../utils/alertUtil';
import { DressupCard } from './DressupCard';
import { getItem } from '../../services/itemService';

interface PresetCard {
  index: number;
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  presetList: Clothes[];
  setPresetList: React.Dispatch<React.SetStateAction<Clothes[]>>;
}
interface DressupPresetProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  presetList: Clothes[];
  setPresetList: React.Dispatch<React.SetStateAction<Clothes[]>>;
}

const PresetCard = (props: PresetCard) => {
  const { index, clothes, setClothes } = props;

  const handleLoad = async (props: PresetCard) => {
    const { index, presetList, setClothes } = props;
    if (!presetList[index]) {
      alertWarning("데이터 <span style='color:red'>미</span>포함", '불러올 옷이 없습니다.');
    } else {
      const result = await confirmQuestion(
        `Preset${index + 1}에 불러오기`,
        `Preset${index + 1}에 저장된 옷을 불러오는 게 맞나요?`,
        '맞아요!',
        `아니에요;;`
      );
      if (result.isConfirmed) {
        const getClothes = Object.entries(presetList[index]);
        let result = {};

        for (const [catCode, item] of getClothes) {
          const { data, error } = await getItem(item.itemNum);
          if (error) console.log(error);
          result[catCode] = data;
        }
        setClothes(result);

        alertSuccess('불러왔어요!', `Preset${index + 1}에 지금 입은 옷을 모두 불러왔어요.`);
      } else {
        alertError('취소했어요!', '아무 일도 일어나지 않았답니다.');
      }
    }
  };

  // const handleSave = async (props: PresetCard) => {
  //   const { index, presetList, setPresetList, clothes } = props;
  //   if (!Object.getOwnPropertyNames(clothes).length) {
  //     alertWarning("데이터 <span style='color:red'>미</span>포함", '저장할 옷이 없습니다!');
  //     return;
  //   }

  //   const result = await confirmQuestion(`Preset${index + 1}에 저장`, `지금 입은 옷을 Preset${index + 1}에 저장하는 게 맞나요?`, '맞아요!', `아니에요;;`);
  //   if (result.isConfirmed) {
  //     presetList[index] = clothes;

  //     const cookie = getUserInfo();

  //     const putpresetList = presetList.map((e) => {
  //       if (e) return Object.fromEntries(Object.entries(e).map((elem) => { return [elem[0], elem[1].itemNum] }));
  //       else return null;
  //     });

  //     const { data, error } = await putMember({ memberNum: cookie.num, presetList: putpresetList } as UpdateMember);

  //     if (!error) {
  //       console.log(data);
  //       await setPresetList(putpresetList as Clothes[]);
  //       alertSuccess('저장했습니다!', `Preset${index + 1}에 지금 입은 옷을 모두 저장했습니다.`);
  //     } else {
  //       console.log(error);
  //       alertError('멤버수정 오류', error);
  //     }
  //   } else {
  //     alertError('취소했어요!', '아무 일도 일어나지 않았답니다.');
  //   }
  // }

  return (
    <div className="card col-12 row p-0 w-100 ms-0">
      <div
        className="card-header w-100 p-0"
        data-bs-toggle="collapse"
        data-bs-target={`#collapsePreset${index + 1}`}
        aria-expanded="true"
        aria-controls={`collapsePreset${index + 1}`}
      >
        <div className="row w-100 ms-0">
          <span className="fs-4 fw-bold ps-3 py-2 col-6">Preset {index + 1}</span>
          <button
            type="button"
            className="btn btn-light col-3"
            onClick={() => {
              handleLoad;
            }}
          >
            저장하기
          </button>
          <button
            type="button"
            className="btn btn-light col-3"
            onClick={() => {
              handleLoad;
            }}
          >
            불러오기
          </button>
        </div>
      </div>
      <div className="card-bodycollapse show p-0" id={`collapsePreset${index + 1}`}>
        <DressupCard clothes={clothes} setClothes={setClothes} blankMessage={`Preset ${index + 1}에 저장된 옷이 없습니다.`} />
      </div>
    </div>
  );
};

export const DressupPreset = (props: DressupPresetProps) => {
  const { clothes, setClothes, presetList, setPresetList } = props;

  useEffect(() => {
    (async () => {
      const cookie = getUserInfo();
      if (!cookie) return;
      const { data, error } = await selectMember(cookie.num);

      if (error) {
        console.log(error);
        alertError('멤버정보 오류', '멤버정보를 불러오는데 오류가 일어났어요.');
        return;
      }

      const presetList = data?.preset;
      setPresetList(presetList || []);
    })();
  }, []);

  return (
    <div className="row row-cols-1 g-1">
      <PresetCard index={0} clothes={clothes} setClothes={setClothes} presetList={presetList} setPresetList={setPresetList} />
      <PresetCard index={1} clothes={clothes} setClothes={setClothes} presetList={presetList} setPresetList={setPresetList} />
      <PresetCard index={2} clothes={clothes} setClothes={setClothes} presetList={presetList} setPresetList={setPresetList} />
    </div>
  );
};
