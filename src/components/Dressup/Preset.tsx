import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
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

  if (!presetList) {
    Swal.fire({
      icon: 'error',
      title: '어이쿠!',
      text: '놀랍게도 아무 일도 일어나지 않았답니다.',
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: `Preset${index}에 불러오기`,
      text: `지금 입은 옷을 Preset${index}에 불러오는 게 맞나요?`,
      showCancelButton: true,
      confirmButtonText: '맞아요!',
      confirmButtonColor: '#81c147',
      cancelButtonText: `아니에요;;`,
      cancelButtonColor: '#d33',
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setClothes(presetList[index]);
        Swal.fire({
          icon: 'success',
          title: '불러왔어요!',
          text: `Preset${index}에 지금 입은 옷을 모두 불러왔어요.`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '어이쿠!',
          text: '놀랍게도 아무 일도 일어나지 않았답니다.',
        });
      }
    });
  }
};

const handleSave = (props: PresetCardProps) => {
  const { index, presetList, clothes } = props;

  const { getCookie } = useCookie();
  const cookie = getCookie();
  if (!cookie) return;
  Swal.fire({
    icon: 'warning',
    title: `Preset${index}에 저장`,
    text: `지금 입은 옷을 Preset${index}에 저장하는 게 맞나요?`,
    showCancelButton: true,
    confirmButtonText: '맞아요!',
    confirmButtonColor: '#81c147',
    cancelButtonText: `아니에요;;`,
    cancelButtonColor: '#d33',
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      presetList[index] = clothes;
      console.log(presetList);
      const { data, error } = await putMember({ memberNum: cookie.num, presetList: presetList } as UpdateMember);
      console.log(error);
      if (!error) {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: '저장했습니다!',
          text: `Preset${index}에 지금 입은 옷을 모두 저장했습니다.`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '얼라리요?',
          text: `멤버수정에 오류가 생겼는데요?`,
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: '어이쿠!',
        text: '놀랍게도 아무 일도 일어나지 않았답니다.',
      });
    }
  });
}

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

      if (error) {
        console.log(error);
        return alert(error);
      }

      const presetList = data?.presetList;
      setPresetList(presetList || []);
    })();
  }, []);

  return (
    <div className="btn-group-vertical" role="group">
      <PresetCard index={1} presetList={presetList} clothes={clothes} setClothes={setClothes} />
      <PresetCard index={2} presetList={presetList} clothes={clothes} setClothes={setClothes} />
      <PresetCard index={3} presetList={presetList} clothes={clothes} setClothes={setClothes} />
    </div>
  );
};
