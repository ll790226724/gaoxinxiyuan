<template>
  <div class="image-preview">
    <div class="preview" v-for="(url,index) in imgs" :key="url+index">
      <template v-if="url">
        <img :src="url" class="image" v-viewer="options" />
        <div class="mask">
          <img src="/zhyq/icon/search-plus-circle.svg" @click="preview" />
          <img src="/zhyq/icon/download-circle.svg" @click="downloadImg(url)" />
        </div>
      </template>
      <template v-else>
        <div class="no-picture">
          <div>
            <img src="/zhyq/icon/img-o.svg" alt="">
            <p>占无图片</p>
          </div>
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
    .no-picture {
      display: flex;
      height: 596px;
      background-image: url('/zhyq/images/img-none.png');
      background-size: 100%;
      justify-content: center;
      align-items: center;
      & > div {
        text-align: center;
      }
      img {
        width: 40px;
        height: 40px;
      }
      p {
        margin-top: 10px;
        color: rgba(#fff, .8);
        font-size: 16px;
        line-height: 24px;
      }
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
  bottom: 20px !important;
}

.viewer-container {
  width: 1200px;
  height: 800px;
  margin: auto;
}

.viewer-canvas {
  display: flex;
  align-items: center;
  justify-content: center;
}

.viewer-toolbar > ul > li {
  width: 30px !important;
  height: 30px !important;
}

.viewer-toolbar > ul > li::before {
  margin: 5px !important;
}
</style>
