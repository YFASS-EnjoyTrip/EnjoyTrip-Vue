<template>
  <div class="container">
    <div class="inner-container">
      <div id="map" class="map"></div>
      <div class="map-button" @click="updateBounds">이 지역 재검색</div>
      <div class="right-container">
        <AttractionSearch :bounds="bounds" @attractions-updated="updateAttractions"></AttractionSearch>
      </div>
    </div>
  </div>
</template>

<script>
import AttractionSearch from '../attraction/AttractionSearch.vue';
export default {
  name: 'PlannerView',
  components: { AttractionSearch },
  data() {
    return {
      map: null,
      attractions: [],
      markers: [],
      bounds: null,
      imageFood: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/IMG_0333.PNG',
      imageAcom: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/IMG_0334.PNG',
      imageLoca: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/IMG_0335.PNG',
    };
  },

  created() {},

  mounted() {},

  methods: {
    loadKakaoMap() {
      if (window.kakao && window.kakao.maps) {
        this.initKakaoMap();
      } else {
        const script = document.createElement('script');
        /* global kakao */
        script.onload = () =>
          kakao.maps.load(() => {
            this.initKakaoMap();
          });
        script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6611e5bdfed1654bf775e5e7c8e0625f';
        console.log('OK');
        document.head.appendChild(script);
      }
    },

    initKakaoMap() {
      const container = document.getElementById('map');
      const options = {
        center:
          this.attractions.length > 0
            ? new kakao.maps.LatLng(this.attractions[0].lat, this.attractions[0].lng)
            : new kakao.maps.LatLng(37.5665, 126.978), // Default location
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);

      // kakao.maps.event.addListener(this.map, 'bounds_changed', () => {
      //   this.updateBounds();
      // });

      let imageSrc = '';

      for (let i = 0; i < this.attractions.length; i++) {
        const attraction = this.attractions[i];
        const planType = attraction.contentType;

        if (planType == 39) imageSrc = this.imageFood;
        else if (planType == 32) imageSrc = this.imageAcom;
        else imageSrc = this.imageLoca;

        const imageSize = new kakao.maps.Size(50, 50);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const latlng = new kakao.maps.LatLng(attraction.lat, attraction.lng);
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: latlng,
          title: attraction.title,
          image: markerImage,
        });

        var overlayContent = `
        <div class="wrap" style="z-index: 1; position: absolute; left: 0px; bottom: 40px; height: 132px; margin-left: -144px; text-align: left; overflow: hidden; line-height: 1.5;">
         <div class="info" style="width: 286px; height: 120px; border-radius: 5px; border-bottom: 2px solid #ccc; border-right: 1px solid #ccc; overflow: hidden; background: #fff; border-radius: 10px;">
          <div class="title" style="padding: 5px 0 0 10px; padding-bottom: 8px; height: 30px; background: #f24849; border-bottom: 1px solid #f24849; font-family: 'CookieRun-Regular'; color: #ffffff; font-size: 20px; box-shadow: 4px 0px 8px rgba(63, 63, 63, 0.5);">
            <span style="display: block; width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${attraction.title}</span>
            <img class="close" @click="closeOverlay" src="https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/close+(1).png" alt="" style="position: absolute; top: 13px; right: 15px; color: #ffffff; width: 17px; height: 17px;" />
          </div>
        <div class="body" style="position: relative; overflow: hidden;">
          <div class="img" style="position: absolute; top: 6px; left: 5px; width: 100px; height: 63px; border: 1px solid #ddd; color: #888; overflow: hidden; border-radius: 5px; border: 2px solid #f24849;">
            <img src="${attraction.image}" style="width: 100px; height: 63px;" />
          </div>
        <div class="desc" style="position: relative; margin: 13px 0 0 90px; height: 75px;">
          <div class="ellipsis" style="width: 85%; margin-left: 22px; padding-top: 6px; font-family: 'CookieRun-Regular'; color: #5a5a5a; font-size: 13px; white-space: normal;">
            <span>${attraction.addr1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
          `;

        const overlay = new kakao.maps.CustomOverlay({
          content: overlayContent,
          position: latlng,
        });

        // 마커 클릭 이벤트 리스너를 추가합니다.
        kakao.maps.event.addListener(marker, 'click', () => {
          overlay.setMap(this.map);

          setTimeout(() => {
            const closeBtn = document.querySelector('.close');
            if (closeBtn) {
              closeBtn.addEventListener('click', () => {
                overlay.setMap(null);
              });
            }
          }, 0);
        });

        marker.overlay = overlay;
        this.markers.push(marker);
      }
    },

    closeOverlay() {
      this.markers.forEach((marker) => {
        marker.infowindow.close();
      });
    },
    async updateAttractions(attractions) {
      this.attractions = attractions;
      this.loadKakaoMap();
      this.addNewMarkers();
    },

    addNewMarkers() {
      const imageSrc = 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png';

      for (let i = this.markers.length; i < this.attractions.length; i++) {
        const attraction = this.attractions[i];
        const latlng = new kakao.maps.LatLng(attraction.lat, attraction.lng);
        const imageSize = new kakao.maps.Size(50, 50);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        const marker = new kakao.maps.Marker({
          map: this.map,
          position: latlng,
          title: attraction.title,
          image: markerImage,
        });

        this.markers.push(marker);
      }
    },

    updateBounds() {
      const bounds = this.map.getBounds();
      this.bounds = {
        northEast: {
          lat: bounds.getNorthEast().getLat(),
          lng: bounds.getNorthEast().getLng(),
        },
        southWest: {
          lat: bounds.getSouthWest().getLat(),
          lng: bounds.getSouthWest().getLng(),
        },
      };
    },
  },
};
</script>

<style scoped>
.container {
  width: 1200px;
  height: 800px;
  background-color: rgb(255, 255, 255);
  border-radius: 90px;
  box-shadow: 5px 5px 10px 2px rgba(102, 128, 150, 0.5);
}
.inner-container {
  display: flex;
}

.map {
  width: 600px;
  height: 800px;
  border-radius: 90px 0px 0px 90px;
  box-shadow: 4px 0px 8px rgba(63, 63, 63, 0.5);
}

.right-container {
  width: 600px;
  height: 800px;
  border-radius: 0px 90px 90px 0px;
  background-color: #fffffffd;
  /* border: 2px solid #69beee; */
}
.map-button {
  position: absolute;
  margin-left: 14%;
  margin-top: 2%;

  width: 120px;

  font-family: 'CookieRun-Regular';
  text-align: center;
  line-height: 30px;
  z-index: 10;
  background-color: white;
  border-radius: 10px;

  box-shadow: 0 2px 4px rgba(68, 68, 68, 0.5);
  cursor: pointer;
}
</style>
