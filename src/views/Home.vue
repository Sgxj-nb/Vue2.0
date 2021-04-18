<template>
  <div>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  watch: {},
  methods: {
    add() {
      this.$ajax('api/v1/manage/login', {}, function (res) {
        console.log(res);
      });
    },
  },
};
</script>
