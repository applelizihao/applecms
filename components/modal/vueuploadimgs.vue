<template>
  <VueUploadImgs
    v-if="show"
    ref="images"
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
  components: { },
  data () {
    return {
      show: false,
      files: [
        // {
        //   url: '',
        //   name: 'user.jpg'
        // }
      ],
      maxSize: 1024 * 5000, // 5000 KB
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
      const formdata = new FormData()
      formdata.append('name', file[0].name)
      formdata.append('file', this.dataURItoBlob(file[0].url))
      this.postUpoload(formdata)
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
    },

    postUpoload (formData) {
      const url = '/api/v1/photo/upload'
      this.$axios
        .post(url, formData)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          this.$toasted.error(error.response.data.detail)
        })
    },
    dataURItoBlob (base64Data) {
      let byteString
      if (base64Data.split(',')[0].includes('base64')) { byteString = atob(base64Data.split(',')[1]) } else { byteString = unescape(base64Data.split(',')[1]) }
      const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ia], { type: mimeString })
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
