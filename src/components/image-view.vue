<template>
  <div class="image-preview">
    <div class="preview" v-for="(url,index) in imgs" :key="url+index">
      <template v-if="url">
        <img :src="url" class="image" v-viewer="options" />
        <div class="mask">
          <img src="/gaoxinxiyuan/images/icon/search-plus-circle.svg" @click="preview" />
          <img src="/gaoxinxiyuan/images/icon/download-circle.svg" @click="downloadImg(url)" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageView",
  props: {
    imgs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: {
        movable: false,
        fullscreen: false,
        navbar: false,
        title: false,
        scalable: false,
        transition: false,
      },
    };
  },
  methods: {
    preview() {
      const viewer = this.$el.querySelector(".image").$viewer;
      viewer.show();
    },
    downloadImg(url) {
      const a = document.createElement("a");
      a.download = "image";
      a.href = url;
      a.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.image-preview {
  width: 100%;
  .preview {
    position: relative;
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 32px;
    }
    img {
      width: 100%;
      height: auto;
      vertical-align: bottom;
    }
    .mask {
      display: none;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        &:first-child {
          margin-right: 32px;
        }
      }
    }
    &:hover .mask {
      display: flex;
    }
  }
}
</style>

<style>
.viewer-one-to-one,
.viewer-reset,
.viewer-prev,
.viewer-play,
.viewer-next {
  display: none;
}

.viewer-footer {
  bottom: 60px !important;
}

.viewer-canvas {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
