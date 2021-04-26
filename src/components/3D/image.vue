<template>
  <div>
    <div>
      <div>基本的</div>
      <div>
        <Carousel3d :width="200" :height="400" :autoplay="true" :autoplay-timeout="2000">
          <Slide v-for="(slide, i) in slides" :index="i" :key="i">
            {{ slide }}
          </Slide>
        </Carousel3d>
      </div>
    </div>

    <!-- 稍微花里胡哨 -->
    <div>
      <div>
        <carousel-3d :autoplay="true" :autoplay-timeout="2000" :inverse-scaling="1500" :space="800">
          <slide v-for="(d, id) in slides2" :index="id" :key="id">
            <span class="title">You know</span>
            <p>You know, being a test pilot isn't always the healthiest business in the world.</p>
          </slide>
        </carousel-3d>
      </div>
    </div>

    <!-- 3D区域 -->
  </div>
</template>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
export default {
  name: 'App',
  components: {
    Carousel3d,
    Slide,
  },
  data() {
    return {
      slides: 7,
      slides2: 7,
    };
  },
  methods: {},
  created() {},
};
</script>
<style scoped>
.info {
  display: flex;
  align-items: center;
  text-align: center;
}
</style>
