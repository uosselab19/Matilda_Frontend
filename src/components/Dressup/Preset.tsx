import React, { useEffect } from 'react';
import useCookie from '../../hooks/useCookie';
import { putMember, selectMember } from '../../services/memberService';
import { Clothes } from '../../types/Clothes';
import { UpdateMember } from '../../types/Member';

interface PresetProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  presetList: Clothes[];
  setPresetList: React.Dispatch<React.SetStateAction<Clothes[]>>
}

interface PresetCardProps {
  index: number;
  presetList: Clothes[];
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

const handleLoad = (props: PresetCardProps) => {
  const { index, presetList, setClothes } = props;

  if (!presetList) alert('놀랍게도 아무 옷도 남아있지 않았답니다.');
  else {
    if (!confirm(`Preset${index}에 저장된 옷을 불러오는 게 맞나요?`)) alert('놀랍게도 아무 일도 일어나지 않았답니다.');
    else {
      setClothes(presetList[index]);
    }
  }
};

const handleSave = (props: PresetCardProps) => {
  const { index, presetList, clothes } = props;

  const cookie = useCookie().getCookie();
  if (!cookie) return;
  if (!confirm(`지금 입은 옷을 Preset${index}에 저장하는 게 맞나요?`)) alert('놀랍게도 아무 일도 일어나지 않았답니다.');
  else {
    presetList[index] = clothes;
    putMember({ memberNum: cookie.num, presetList: presetList } as UpdateMember);
    alert('저장했습니다~');
  }
};

const handleReset = (props: PresetProps) => {
  const { setClothes } = props;

  if (!confirm(`지금 입은 옷을 리셋하는 게 맞나요?`)) alert('놀랍게도 아무 일도 일어나지 않았답니다.');
  else {
    setClothes({});
    alert('리셋되었습니다~');
  }
};

const handleBuy = (props: PresetProps) => {
  if (!confirm(`지금 입은 옷을 모두 구매하는 게 맞나요?`)) alert('놀랍게도 아무 일도 일어나지 않았답니다.');
  else {
    alert('아이템 구매하는 버튼~');
  }
};

const PresetCard = (props: PresetCardProps) => {
  const { index } = props;

  return (
    <div className="card">
      <div
        className="card-header"
        data-bs-toggle="collapse"
        data-bs-target={`#collapsePreset${index}`}
        aria-expanded="false"
        aria-controls={`collapsePreset${index}`}>
        Preset {index}
      </div>
      <div className="collapse" id={`collapsePreset${index}`}>
        <div className="btn-group-vertical text-white w-100" role="group">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              handleLoad(props);
            }}>
            Load
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              handleSave(props);
            }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export const Preset = (props: PresetProps) => {
  const { clothes, setClothes, presetList, setPresetList } = props;

  useEffect(() => {
    (async () => {
      const cookie = useCookie().getCookie();
      if (!cookie) return;

      const { data, error } = await selectMember(cookie.num);

      if (error) { console.log(error); return alert(error); }

      const presetList = data?.presetList;
      setPresetList(presetList || []);
    })();
  }, []);

  return (
    <div className="h-100 d-flex flex-column justify-content-between">

      {/* Preset 아코디언 */}
      <div className="btn-group-vertical" role="group">
        <PresetCard index={1} presetList={presetList} clothes={clothes} setClothes={setClothes} />
        <PresetCard index={2} presetList={presetList} clothes={clothes} setClothes={setClothes} />
        <PresetCard index={3} presetList={presetList} clothes={clothes} setClothes={setClothes} />
      </div>

      {/* Reset/Buy 버튼 */}
      <div className="btn-group-vertical" role="group">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => { handleReset(props); }}>
          Reset
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => { handleBuy(props); }}>
          Buy All
        </button>
      </div>
    </div>
  );
};
