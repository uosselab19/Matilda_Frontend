import { Clothes } from '../../types/Clothes';
import { Item } from '../../types/Item';
import { getS3Url } from '../../utils/S3';
import { removeModel } from '../../utils/threejs/threeModelUtil';

interface DressupCardProps {
  clothes: Clothes;
  setClothes: React.Dispatch<React.SetStateAction<Clothes>>;
  scene: THREE.Scene;
}

export const DressupCard = (props: DressupCardProps) => {
  const { clothes, setClothes, scene } = props;

  const handleCancel = (e: any) => {
    const newClothes = Object.fromEntries(Object.entries(clothes)
      .filter((elem) => {
        const selectedCondition = elem[1].catCode == e.catCode;
        if (selectedCondition)
          removeModel(elem[1], scene);
        return !selectedCondition;
      }));

    setClothes(newClothes);
  };

  return (
    <div className="row row-cols-1 g-1">
      {Object.entries(clothes).map((elem, index) => {
        const clothesElement = elem[1] as Item;
        return (
          <div className="card px-0" key={index}>
            <div className="row g-0">
              <div className="col-2">
                <img src={getS3Url(clothesElement.imgUrl)} className="img-fluid rounded-start" alt={clothesElement.catCode} />
              </div>
              <div className="col-8">
                <div className="card-body">
                  <div className="card-title fs-5 fw-bold">{clothesElement.catCode}</div>
                  <div className="fs-4 fw-bold">{clothesElement.title}</div>
                </div>
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-dark w-100 h-100"
                  onClick={() => { handleCancel(elem[1]); }} >
                  벗기
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
