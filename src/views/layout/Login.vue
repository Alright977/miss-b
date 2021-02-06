<template>
  <div class="login-From">
    <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
            'Email',
            {
              rules: [
                { required: true, message: '请输入邮箱!' },
                { pattern: /^[\w-]+@[\w.-]+.com$/, message: '请输入正确的格式!' },
              ],
            },
          ]"
          placeholder="Email"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="['password', { rules: [{ required: true, message: '请输入密码!' }] }]" type="password" placeholder="Password">
          <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a class="login-form-forgot" href=""> 重置 </a>
        <a-button type="primary" html-type="submit" class="login-form-button"> 登入 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import api from '@/api/user.js'
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          api
            .login({
              email: values.Email,
              password: values.password,
            })
            .then((src) => {
              this.$store.dispatch('userToken', src.data.role)
              this.$router
                .push({
                  name: 'Home',
                })
                .catch(() => {})
            })
            .catch((error) => {
              this.$message.error(error)
            })
        }
      })
    },
  },
}
</script>
<style lang="less">
.login-From {
  padding: 50px 50px;
  padding-bottom: 10px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 100px;
  width: 400px;
  border: 1px solid gray;
  border-radius: 10px;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
