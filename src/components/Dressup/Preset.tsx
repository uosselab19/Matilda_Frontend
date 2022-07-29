import React, { useEffect, useState } from 'react';
import { selectMember } from '../../services/memberService';
import { Clothes } from '../../types/Clothes';

interface PresetProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

interface PresetCardProps {
  index: number;
  entity: Clothes;
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
}

const handleLoad = (props: PresetCardProps) => {
  const { index, entity, clothes, setClothes } = props;
  if (!entity) alert("놀랍게도 아무 옷도 남아있지 않았답니다.");
  else {
    if (!confirm(`Preset${index}에 저장된 옷을 불러오는 게 맞나요?`))
      alert("놀랍게도 아무 일도 일어나지 않았답니다.");
    else {
      console.log(clothes);
      setClothes(entity);
    }
  }
}
const handleSave = (props: PresetCardProps) => {
  const { index, entity } = props;
  if (!confirm(`지금 입은 옷을 Preset${index}에 저장하는 게 맞나요?`))
    alert("놀랍게도 아무 일도 일어나지 않았답니다.");
  else {
    console.log(entity);
    alert("저장했습니다~");
  }
}

const handleReset = (props: PresetProps) => {
  const { setClothes } = props;
  if (!confirm(`지금 입은 옷을 리셋하는 게 맞나요?`))
    alert("놀랍게도 아무 일도 일어나지 않았답니다.");
  else {
    setClothes({});
    alert("리셋되었습니다~");
  }
}

const handleBuy = (props: PresetProps) => {
  const { clothes } = props;
  if (!confirm(`지금 입은 옷을 모두 구매하는 게 맞나요?`))
    alert("놀랍게도 아무 일도 일어나지 않았답니다.");
  else {
    console.log(clothes);
    alert("뭔가 일어나긴 할 텐데;;");
  }
}

const PresetCard = (props: PresetCardProps) => {
  const { index } = props;

  return (
    <div className="card">
      <div className="card-header"
        data-bs-toggle="collapse"
        data-bs-target={`#collapsePreset${index}`}
        aria-expanded="false"
        aria-controls={`collapsePreset${index}`}>
        Preset {index}
      </div>
      <div className="collapse" id={`collapsePreset${index}`} role="group">
        <div className="btn-group-vertical text-white w-100">
          <button className="btn btn-dark"
            onClick={() => { handleLoad(props); }}
          > Load </button>
          <button className="btn btn-dark"
            onClick={() => { handleSave(props); }}
          > Save </button>
        </div>
      </div>
    </div>
  );
};

export const Preset = (props: PresetProps) => {
  const { clothes, setClothes } = props;
  const [presetItemList, setPresetItemList] = useState([] as Clothes[]);

  useEffect(() => {
    (async () => {
      const { data, error } = await selectMember(2);

      if (error) console.log(error);
      
      const presetList = data?.presetList as Clothes[];
      setPresetItemList(presetList || []);
    })();
  }, []);

  return (
    <div className='h-100 d-flex flex-column justify-content-between'>
      <div className='btn-group-vertical'>
        <PresetCard index={1} entity={presetItemList[0]} clothes={clothes} setClothes={setClothes} />
        <PresetCard index={2} entity={presetItemList[1]} clothes={clothes} setClothes={setClothes} />
        <PresetCard index={3} entity={presetItemList[2]} clothes={clothes} setClothes={setClothes} />
      </div>
      <div className='btn-group-vertical'>
        <div className="card w-100"><div className="btn btn-danger" onClick={() => { handleReset(props); }}>Reset</div></div>
        <div className="card w-100"><div className="btn btn-primary" onClick={() => { handleBuy(props); }}>Buy All</div></div>
      </div>
    </div>
  );
}