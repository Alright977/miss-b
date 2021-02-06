<template>
  <a-form-model ref="ruleForm" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" class="head-two" :class="{ two: $store.state.collapsed }">
    <a-form-model-item label="商品售价" prpo="price">
      <a-input v-model="form.price" />
    </a-form-model-item>
    <a-form-model-item label="折扣价格">
      <a-input v-model="form.price_off" />
    </a-form-model-item>
    <a-form-model-item label="商品库存" prpo="inventory">
      <a-input v-model="form.inventory" />
    </a-form-model-item>
    <a-form-model-item label="计量单位" prpo="unit">
      <a-input v-model="form.unit" />
    </a-form-model-item>
    <a-form-model-item label="商品图片">
      <div class="clearfix">
        <a-upload action="http://mallapi.duyiedu.com/upload/images?appkey=onepig_1610436669146" list-type="picture-card" :file-list="fileList" @preview="handlePreview" @change="handleChange" name="avatar">
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text"> Upload </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" @click="prev" class="btn"> 上一步 </a-button>
      <a-button type="primary" @click="submit" class="btn"> 完成 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        peice: [{ required: true, message: '请输入售价' }],
        inventory: [{ required: true, message: '请输入库存' }],
        unit: [{ required: true, message: '请输入单位' }],
      },
    }
  },
  props: ['form'],
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }))
    }
  },
  methods: {
    prev() {
      this.$emit('prev', this.form)
    },
    submit() {
      this.$emit('submit', this.form)
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url)
      } else if (file.status === 'removed') {
        const { url } = file.response.data
        this.form.images = this.form.images.filter((item) => item !== url)
      }
      this.fileList = fileList
    },
  },
  components: {},
}
</script>
<style scoped>
.head-two {
  margin-top: 80px;
  transition: margin-left 0.3s;
  margin-left: 400px;
}
.two {
  transition: margin-left 0.3s;
  margin-left: 300px;
}
.btn {
  margin-right: 20px;
}
</style>
