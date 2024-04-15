<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="60px"
    class="demo-ruleForm"
  >
    <el-form-item label="文本" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="链接" prop="url">
      <el-input v-model="ruleForm.url"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        url: ''
      },
      rules: {
        name: [{ required: true, message: '请输入文本', trigger: 'blur' }],
        url: [{ required: true, message: '请输入链接', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$emit('componentConfirm', {
            type: 'hyperlink',
            data: this.ruleForm
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style></style>
