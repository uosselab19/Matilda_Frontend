import React, { useEffect } from 'react';
import { getUserInfo } from '../../utils/cookieUtil';
import { selectMember } from '../../services/memberService';
import { Clothes } from '../../types/Clothes';
import { alertError } from '../../utils/alertUtil';
import { DressupCard } from './DressupCard';

interface DressupInfoProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  setPresetList: React.Dispatch<React.SetStateAction<Clothes[]>>;
}

export const DressupInfo = (props: DressupInfoProps) => {
  const { clothes, setClothes, setPresetList } = props;

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
    <div className="container">
      <DressupCard
        clothes={clothes}
        setClothes={setClothes}
        blankMessage={`입고 있는 옷이 없습니다.`} />
    </div>
  );
};
