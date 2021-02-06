<template>
  <div>
    <a-steps :current="current" class="steps-list" :class="{ steps: $store.state.collapsed }">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <first-content v-if="current === 0" @next="next" :form="form"></first-content>
      <two-content v-if="current === 1" @prev="prev" @submit="submit" :form="form"></two-content>
    </div>
  </div>
</template>
<script>
import firstContent from '@/components/firstContent'
import twoContent from '@/components/twoContent'
import api from '@/api/user.js'
export default {
  created() {
    const { id } = this.$route.params
    console.log(id)
    if (id) {
      // 读取商品详情
      api.detail(id).then((res) => {
        this.form = res.data
      })
    }
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
          content: 'First-content',
        },
        {
          title: '填写商品销售信息',
          content: 'Second-content',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: '',
        images: [],
      },
    }
  },
  components: {
    firstContent,
    twoContent,
  },
  methods: {
    next() {
      this.current++
    },
    prev() {
      this.current--
    },
    submit() {
      if (this.$route.params.id) {
        api.edit(this.form).then(() => {
          this.$message.success('修改成功')
          this.$router.push({
            name: 'ProductList',
          })
        })
      } else {
        api.add(this.form).then(() => {
          this.$message.success('新增成功')
          this.$router.push({
            name: 'ProductList',
          })
        })
      }
    },
  },
}
</script>
<style scoped>
.steps-list {
  width: 1000px;
  margin-top: 20px;
  transition: margin-left 0.3s;
  margin-left: 500px;
}
.steps {
  transition: margin-left 0.2s;
  margin-left: 350px;
}
</style>
