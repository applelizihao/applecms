<template>
  <VueUploadImgs
    v-if="show"
    v-model="files"
    class="VueUploadImgs"
    multiple
    compress
    :before-read="beforeRead"
    :after-read="afterRead"
    :before-remove="beforeRemove"
    :limit="limit"
    :type="type"
    @preview="preview"
    @exceed="exceed"
    @oversize="oversize"
  />
</template>
<script>
export default {
  name: '',
  middleware: 'authenticated',
  components: { },
  data () {
    return {
      show: false,
      files: [
        {
          url: 'https://pic3.zhimg.com/v2-058f646c41b55206f8110489d82fa103_is.jpg',
          name: 'user.jpg'
        }
      ],
      maxSize: 1024 * 2000, // 2000 KB
      previewIMG: null,
      limit: 1,
      isPreview: false,
      type: 0 // 0 预览模式 1 列表模式 2 预览模式 + 上传按钮

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.show = true
  },
  methods: {
    oversize (file) {
      console.log('oversize')
      console.log('filesize:' + file.size / 1024 + 'KB')
    },

    afterRead (file) {
      console.log('after-read')
      console.log(file)
    },

    beforeRemove (index, file) {
      console.log(index, file)
      return true
    },

    preview (index, file) {
      this.previewIMG = file.url
      this.isPreview = true
    },

    exceed () {
      alert(`只能上传${this.limit}张图片`)
    },

    beforeRead (files) {
      console.log('before-read')
      for (let i = 0, len = files.length; i < len; i++) {
        const file = files[i]
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          alert('只能上传jpg和png格式的图片')
          return false
        }
      }

      return true
    },

    closePreview () {
      this.isPreview = false
    }
  }

}
</script>
<style lang='scss'>
  .VueUploadImgs{
     .upload-div-add-img, .upload-div-img{
        width:100% !important;
        height:300px !important;
    }
  }
</style>
