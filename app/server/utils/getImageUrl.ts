export default function getImageUrl(image, size) {
  return `/getimage/${image?.id}/600`;
  // return (
  //   "https://mypopup-bucket.s3.ap-southeast-1.amazonaws.com/" +
  //   size +
  //   "/" +
  //   image?.storeId +
  //   "/" +
  //   image?.path
  // );
}
