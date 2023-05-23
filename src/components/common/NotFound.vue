<template>
  <div class="not-found"></div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found {
  /* 이 URL은 실제 이미지 URL로 대체해야 합니다 */
  background-image: url('https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/IMG_0325.PNG');
  background-size: cover; /* 이 속성이 이미지가 컨테이너를 항상 채우도록 합니다 */
  background-position: center; /* 이 속성이 이미지가 항상 중앙에 위치하도록 합니다 */
  width: 100vw; /* viewport 너비의 100% */
  height: 100vh; /* viewport 높이의 100% */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
