import authInstance from '@apis/authInstance';
import { mutate } from 'swr';

type UploadImageReq = FormData;

const uploadImagesApi = (payload: UploadImageReq) => {
  return authInstance.post(`/api/uploads`, payload).then((res) => res.data);
};

const useUploadImages = () => {
  const uploadImages = (payload: UploadImageReq) =>
    mutate('uploadImages', () => uploadImagesApi(payload));

  return {
    uploadImages,
  };
};

export default useUploadImages;
