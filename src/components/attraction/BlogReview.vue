<template>
  <div>
    <div class="blog-title">블로그리뷰</div>
    <div class="container">
      <div class="main-container">
        <div class="blog-container" v-for="(blog, index) in blogListNaver" :key="index">
          <a :href="blog.link" target="_blank">
            <span class="bloggername">{{ blog.bloggername }}</span>
            <span class="bloggername">{{ formatDate(blog.postdate) }}</span>
            <div class="content-title" v-html="blog.title"></div>
            <div class="content-text" v-html="blog.description"></div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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

::-webkit-scrollbar-track {
  background-color: transparent;
  /* 트랙 배경색 */
}
.container {
  height: 950px;
  overflow-y: scroll;
}
a {
  text-decoration: none;
}
.content-text {
  font-family: 'CookieRun-Regular';
  color: #808080;
  font-size: 13px;
  margin-top: 5px;
  line-height: 20px;
}
.content-title {
  font-family: 'CookieRun-Regular';
  color: #515151;
  font-size: 20px;
  margin-top: 5px;
}
.bloggername {
  font-family: 'CookieRun-Regular';
  color: #929292;
  font-size: 15px;
  margin-right: 10px;
}
.blog-title {
  text-align: center;
  margin-top: 15px;
  font-family: 'CookieRun-Bold';
  color: #666666;
  font-size: 20px;
  caret-color: transparent;
  user-select: none;
}
.main-container {
  margin-top: 5px;
}
.blog-container {
  margin: 0 auto;
  width: 520px;
  background-color: rgb(255, 255, 255);
  margin-top: 20px;
  margin-bottom: 20px;
  padding-right: 30px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 2px solid #ffc930;
  border-radius: 11px;
  box-shadow: 0px 2px 3px 2px rgba(103, 103, 103, 0.315);
}
.blog-container:hover {
  background-color: #fff1c9;
  transition: 0.2s;
  cursor: pointer;
}
.blog-container:active {
  transform: scale(0.9);
  transition: 0.2s;
}
</style>

<style scoped>
.main-container {
  margin-top: 5px;
}
</style>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  data() {
    return {
      blogListNaver: [],
    };
  },
  created() {
    this.getBlogList();
  },
  methods: {
    getBlogList() {
      const URL = `/v1/search/blog?query=${encodeURIComponent(sessionStorage.getItem('contentTitle'))}`;
      const clientId = '7k0ZARFOeii5DyM_2OK0';
      const clientSecret = 'Bm0xQTFmD7';
      axios
        .get(URL, {
          headers: {
            Accept: 'application/json',
            'X-Naver-Client-Id': clientId,
            'X-Naver-Client-Secret': clientSecret,
          },
        })
        .then((response) => {
          this.blogListNaver = response.data.items;
        });
    },
    formatDate(date) {
      return moment(date).format('YY-MM-DD');
    },
  },
};
</script>
