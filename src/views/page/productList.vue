<template>
  <div>
    <!-- 表单搜索 -->
    <a-form-model layout="inline" :model="searchForm" @submit="handleSubmit" @submit.native.prevent class="head-list" :class="{ list: $store.state.collapsed }">
      <a-form-model-item lable="检索关键字">
        <a-input v-model="searchForm.searchWord" placeholder="请输入关键字"> </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-select show-search placeholder="请选择商品类目" style="width: 150px" @change="handleChange" allowClear>
          <a-select-option :value="list.name" v-for="list in categoryList" :key="list.id"> {{ list.name }} </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-model-item>
      <router-link :to="{ name: 'ProductAdd' }">
        <a-button class="add-btn">添加商品</a-button>
      </router-link>
    </a-form-model>
    <!-- 表格 -->
    <product-table :data="dataTable" @edit="editProduct" @remove="removeProduct"></product-table>
  </div>
</template>
<script>
import api from '@/api/user.js'
import productTable from '@/components/productTable.vue'
export default {
  components: {
    productTable,
  },
  data() {
    return {
      searchForm: {
        // 搜索关键字
        searchWord: '',
        // 查询类目
        category: '',
      },
      // 类目数据
      categoryList: [],
      // 表格数据
      dataTable: [],
    }
  },
  created() {
    // 获取类目
    api.catelist().then((res) => {
      console.log(res)
      this.categoryList = res.data.data
    })
    // 获取商品表格数据
    this.getData()
  },
  methods: {
    getData() {
      api
        .prolist({
          searchWord: this.searchForm.searchWord,
          category: this.searchForm.category,
        })
        .then((res) => {
          this.dataTable = res.data.data.map((c) => {
            if (c.category === 1) {
              c.category = '酒水特调'
            } else if (c.category === 2) {
              c.category = '时令水果'
            } else if (c.category === 3) {
              c.category = '安心乳品'
            } else if (c.category === 4) {
              c.category = '休闲零食'
            } else if (c.category === 5) {
              c.category = '新鲜蔬菜'
            }
            return {
              ...c,
              key: c.id,
            }
          })
        })
    },
    // 提交事件
    handleSubmit() {
      this.getData()
    },
    // input改变change事件
    handleChange(val) {
      if (val === this.categoryList[0].name) {
        this.searchForm.category = this.categoryList[0].id
      } else if (val === this.categoryList[1].name) {
        this.searchForm.category = this.categoryList[1].id
      } else {
        this.dataTable = []
      }
    },

    // 编辑
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      })
    },

    // 删除
    removeProduct(record) {
      // 保存this
      const This = this
      this.$confirm({
        title: ' 确定删除?',
        content: () => <div style="color:red;">{`你要删除${record.title}商品吗?`}</div>,
        onOk() {
          api
            .remove({
              id: record.id,
            })
            .then(() => {
              This.$message.success('删除成功')
              console.log(this)
              api
                .prolist({
                  searchWord: This.searchForm.searchWord,
                  category: This.searchForm.category,
                })
                .then((res) => {
                  This.dataTable = res.data.data.map((c) => {
                    if (c.category === 1) {
                      c.category = '酒水特调'
                    } else if (c.category === 2) {
                      c.category = '时令水果'
                    } else if (c.category === 3) {
                      c.category = '安心乳品'
                    } else if (c.category === 4) {
                      c.category = '休闲零食'
                    } else if (c.category === 5) {
                      c.category = '新鲜蔬菜'
                    }
                    return {
                      ...c,
                      key: c.id,
                    }
                  })
                })
            })
        },
        onCancel() {
          console.log('Cancel')
        },
        class: 'test',
      })
    },
  },
}
</script>
<style scoped>
.head-list {
  margin-top: 20px;
  transition: margin-left 0.3s;
  margin-left: 230px;
}
.list {
  transition: margin-left 0.2s;
  margin-left: 85px;
}
.add-btn {
  position: absolute;
  right: 20px;
}
</style>
