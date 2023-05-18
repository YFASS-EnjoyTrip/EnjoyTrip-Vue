<template>
  <div>
    <div class="blog-title">블로그리뷰</div>
    <div class="main-container">
      <div
        class="blog-container"
        v-for="(blog, index) in blogListNaver"
        :key="index"
      >
        <div>
          {{ blog.bloggerlink }}
        </div>
        <div>
          {{ blog.bloggername }}
        </div>
        <div v-html="blog.description"></div>
        <div>
          <a :href="blog.link" target="_blank">{{ blog.link }}</a>
        </div>
        <div>
          {{ blog.postdate }}
        </div>
        <div v-html="blog.title"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-title {
  padding-left: 15px;
  margin-top: 15px;
  font-family: "CookieRun-Regular";
  color: #666666;
  font-size: 20px;
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
  border: 2px solid #ffc930;
  border-radius: 11px;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      blogListNaver: [],
      searchQuery: "",
    };
  },
  props: ["contentTitle"],
  created() {
    this.searchQuery = this.contentTitle;
    this.getBlogList();
  },
  watch: {
    contentTitle() {
      this.searchQuery = this.contentTitle;
    },
  },
  methods: {
    getBlogList() {
      const URL = `/v1/search/blog?query=${encodeURIComponent(
        this.contentTitle
      )}`;
      const clientId = "7k0ZARFOeii5DyM_2OK0";
      const clientSecret = "Bm0xQTFmD7";
      axios
        .get(URL, {
          headers: {
            Accept: "application/json",
            "X-Naver-Client-Id": clientId,
            "X-Naver-Client-Secret": clientSecret,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.blogListNaver = response.data.items;
        });
    },
  },
};
</script>
