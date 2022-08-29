import React, { useEffect } from 'react';
import { getUserInfo } from '../../configs/Cookie';
import { selectMember } from '../../services/memberService';
import { Clothes } from '../../types/Clothes';
import { alertError } from '../../utils/alertUtil';
import { PresetCard } from './PresetCard';

interface PresetProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  presetList: Clothes[];
  setPresetList: React.Dispatch<React.SetStateAction<Clothes[]>>
}

export const Preset = (props: PresetProps) => {
  const { clothes, setClothes, presetList, setPresetList } = props;

  useEffect(() => {
    (async () => {
      const cookie = getUserInfo();
      const { data, error } = await selectMember(cookie.num);

      if (error) {
        console.log(error);
        alertError('멤버정보 오류',"멤버정보를 불러오는데 오류가 일어났어요.");
        return;
      }

      const presetList = data?.preset;
      setPresetList(presetList || []);
    })();
  }, []);

  return (
    <div className="btn-group-vertical" role="group">
      <PresetCard index={0} presetList={presetList} clothes={clothes} setClothes={setClothes} />
      <PresetCard index={1} presetList={presetList} clothes={clothes} setClothes={setClothes} />
      <PresetCard index={2} presetList={presetList} clothes={clothes} setClothes={setClothes} />
    </div>
  );
};
