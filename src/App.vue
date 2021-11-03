<template>
  <h2>{{ today }}</h2>
  <el-row :gutter="20">
    <el-col :span="6" v-for="part in todayNews" :key="part.title">
      <h3>{{ part.title }}</h3>
      <ul>
        <li v-for="item in part.list" :key="item.text">
          <a :href="item.url" target="_blank">{{ item.text }}</a>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, Ref } from "vue";

const getTodayHot = async () => {
  const res = await axios.get("http://localhost:8888/index.json");
  const { data: { data, date } } = res.data;
  return { data, date };
};

interface Item {
  text: string,
  url: string
}

interface Data {
  title: string,
  list: [Item]
}

const todayNews = ref<[] | [Data]>([]);
const today = ref("");

getTodayHot().then(({ data, date }) => {
  console.log({ data, date });
  todayNews.value = data.filter(item => !!item);
  today.value = date;
});
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 0;
}
a {
  color: var(--el-text-color-primary);
}
</style>
