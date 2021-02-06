<template>
  <a-form-model ref="ruleForm" :rules="rules" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" class="head-first" :class="{ first: $store.state.collapsed }">
    <a-form-model-item label="标题" prop="title">
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" prop="category">
      <a-select v-model="form.category" placeholder="请选择商品类目" @change="handleChange">
        <a-select-option :value="category.id" v-for="category in categoryList" :key="category.id"> {{ category.name }} </a-select-option>
      </a-select>
      <a-select v-model="form.c_items" placeholder="请选择商品子目录" prop="item">
        <a-select-option :value="item" v-for="item in categoryItems" :key="item"> {{ item }} </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="标签" prop="tags">
      <a-select mode="tags" style="width: 100%" :token-separators="[',']" v-model="form.tags" :default-value="['包邮，最晚次日达']">
        <a-select-option value="包邮最晚次日达">包邮，最晚次日达</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-button type="primary" @click="next"> 下一步 </a-button>
  </a-form-model>
</template>
<script>
import api from '@/api/user'
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      categoryList: [],
      categoryItems: [],
      rules: {
        title: [{ required: true, message: '请输入商品标题' }],
        desc: [{ required: true, message: '请输入商品描述' }],
        category: [{ required: true, message: '请选择商品类目' }],
        item: [{ required: true, message: '请选择商品子类目' }],
        tags: [{ required: true, message: '请选择你的商品标签哦' }],
      },
    }
  },
  props: ['form'],
  created() {
    api.catelist().then((res) => {
      this.categoryList = res.data.data
      console.log(this.categoryList)
    })
  },
  methods: {
    next() {
      console.log(this.form)
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$emit('next', this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleChange() {
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].id === this.form.category) {
          this.categoryItems = this.categoryList[i].c_items
        }
      }
    },
  },
}
</script>

<style scoped>
.head-first {
  margin-top: 80px;
  transition: margin-left 0.3s;
  margin-left: 400px;
}
.first {
  transition: margin-left 0.3s;
  margin-left: 300px;
}
</style>
