<template>
  <div>
    <div class="title-container">
      <span class="attraction-title">{{ attractionInfo.title }}</span>
      <span class="attraction-addr">{{ attractionInfo.addr1 }}</span>
    </div>
    <div class="map-container">
      <div id="map" class="map"></div>
    </div>
    <div class="img-overview-container">
      <img
        class="attractionImg"
        :src="attractionInfo.image || defaultImage"
        :alt="attractionInfo.title"
      />
      <div class="overview">{{ attractionInfo.overView }}</div>
    </div>
    <div class="review-container">
      <div class="comment-container">
        <AttractionReview
          :contentId="this.attractionInfo.contentId"
        ></AttractionReview>
      </div>
      <div class="blog-container">
        <BlogReview :contentTitle="this.attractionInfo.title"></BlogReview>
      </div>
    </div>
    <div class="margin-bottom"></div>
  </div>
</template>

<script>
import axios from "axios";
import AttractionReview from "./AttractionReview.vue";
import BlogReview from "./BlogReview.vue";
export default {
  name: "AttractionDetail",
  components: { AttractionReview, BlogReview },
  data() {
    return {
      map: null,
      contentId: "",
      attractionInfo: "",
      defaultImage:
        "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/Attraction_default.png",
    };
  },

  created() {
    this.contentId = sessionStorage.getItem("contentId");
    console.log(this.contentId);
    axios
      .get(`http://localhost:8080/locations/detail?contentId=${this.contentId}`)
      .then((response) => {
        this.attractionInfo = response.data.result;
        this.loadKakaoMap();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },

  methods: {
    loadKakaoMap() {
      if (window.kakao && window.kakao.maps) {
        this.initKakaoMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () =>
          kakao.maps.load(() => {
            this.initKakaoMap();
          });
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6611e5bdfed1654bf775e5e7c8e0625f";
        document.head.appendChild(script);
      }
    },

    initKakaoMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(
          this.attractionInfo.lat,
          this.attractionInfo.lng
        ), // Default location
        level: 7,
      };

      this.map = new kakao.maps.Map(container, options);
      const imageSrc =
        "https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png";

      const imageSize = new kakao.maps.Size(50, 50);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const latlng = new kakao.maps.LatLng(
        this.attractionInfo.lat,
        this.attractionInfo.lng
      );
      new kakao.maps.Marker({
        map: this.map,
        position: latlng,
        title: this.attractionInfo.title,
        image: markerImage,
      });
    },
  },
};
</script>

<style scoped>
.margin-bottom {
  margin-top: 50px;
}
.blog-container {
  width: 630px;
  max-height: 1000px;
  background-color: #fff8e5;
  border-radius: 18px;
  box-shadow: 0px 0px 5px 2px rgba(107, 107, 107, 0.315);
}

.comment-container {
  width: 450px;
  margin-right: 20px;
  border-radius: 18px;
  background-color: #fff8e5;
  box-shadow: 0px 0px 5px 2px rgba(107, 107, 107, 0.315);
}
.review-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.overview {
  width: 540px;
  height: 300px;
  overflow: scroll;
  font-size: 16px;
  font-family: "CookieRun-Regular";
  color: #383838;
  word-break: keep-all;
  line-height: 35px;
}

::-webkit-scrollbar {
  width: 10px;
  height: 0;
}

::-webkit-scrollbar-thumb {
  background-color: #ffe6a1;
  /* 스크롤바 색상 */
  border-radius: 5px;
  /* 스크롤바 모서리의 곡률 */
}

::-webkit-scrollbar-thumb:active {
  background-color: #ffc930;
  /* 스크롤바 색상 */
}

.attractionImg {
  width: 540px;
  height: 300px;
  margin-right: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 2px rgba(14, 14, 14, 0.315);
}
.img-overview-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.attraction-addr {
  font-size: 15px;
  font-family: "CookieRun-Regular";
  color: #555555;
}
.title-container {
  width: 1000px;
  height: 100px;
  padding-left: 60px;
  padding-top: 40px;
}
.attraction-title {
  font-size: 48px;
  font-family: "CookieRun-Black";
  color: #69beee;
  margin-right: 10px;
  caret-color: transparent;
}
.map-container {
  display: flex;
  justify-content: center;
}
.map {
  width: 1100px;
  height: 250px;
  border-radius: 18px;
  box-shadow: 0px 0px 5px 2px rgba(14, 14, 14, 0.315);
}
</style>