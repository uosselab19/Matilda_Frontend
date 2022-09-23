import React, { useEffect } from 'react';
import { getUserInfo } from '../../utils/cookieUtil';
import { selectMember } from '../../services/memberService';
import { Clothes } from '../../types/Clothes';
import { alertError } from '../../utils/alertUtil';
import { Item } from '../../types/Item';
import { getS3Url } from '../../utils/S3';

interface DressupInfoProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  presetList: Clothes[];
  setPresetList: React.Dispatch<React.SetStateAction<Clothes[]>>
}

export const DressupInfo = (props: DressupInfoProps) => {
  const { clothes, setPresetList } = props;

  useEffect(() => {
    (async () => {
      const cookie = getUserInfo();
      if (!cookie) return;
      const { data, error } = await selectMember(cookie.num);

      if (error) {
        console.log(error);
        alertError('멤버정보 오류', "멤버정보를 불러오는데 오류가 일어났어요.");
        return;
      }

      const presetList = data?.preset;
      setPresetList(presetList || []);
    })();
  }, []);

  const clothesList = (clothes: Clothes) => {
    console.log(Object.entries(clothes));
    return Object.entries(clothes).map((elem, index) => {
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
    });
  };

  return (
    <div className='container'>
      <div className='row row-cols-1'>
        {(Object.entries(clothes).length>0)?clothesList(clothes):"입고 있는 옷이 없습니다."}
      </div>
    </div>
  );
};
