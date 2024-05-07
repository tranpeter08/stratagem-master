import Image from 'next/image';

export type StratagemImgData = {
  img: string;
  name: string;
};

export default function StratagemImg({imgData}: {imgData: StratagemImgData}) {
  return (
    <Image
      src={imgData.img}
      width={67}
      height={67}
      alt={imgData.name}
      title={imgData.name}
      priority={true}
    />
  );
}
