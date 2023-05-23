<template>
  <div class="container">
    <div class="inner-container">
      <div id="map" class="map"></div>
      <div class="right-container">
        <AttractionSearch @attractions-updated="updateAttractions"></AttractionSearch>
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
      imageFood: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_Y.png',
      imageAcom: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_B.png',
      imageLoca: 'https://enjoytrip-file-storage.s3.ap-northeast-2.amazonaws.com/pin_G.png',
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

      kakao.maps.event.addListener(this.map, 'zoom_changed', () => {
        this.handleZoomChange();
      });

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

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${attraction.title}</div>`,
        });

        marker.infowindow = infowindow;
        this.markers.push(marker);
      }
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
    handleZoomChange() {
      const level = this.map.getLevel();
      const bounds = this.map.getBounds();

      if (level <= 4) {
        this.markers.forEach((marker) => {
          if (bounds.contain(marker.getPosition())) {
            marker.infowindow.open(this.map, marker);
          }
        });
      } else {
        this.markers.forEach((marker) => {
          marker.infowindow.close();
        });
      }
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
</style>
