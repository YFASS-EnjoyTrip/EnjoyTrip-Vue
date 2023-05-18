<template>
  <div>
    <span>
      <div v-for="(blog, index) in blogListNaver" :key="index">
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
    </span>
  </div>
</template>

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
  watch: {
    contentTitle() {
      this.searchQuery = this.contentTitle;
      this.getBlogList();
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
