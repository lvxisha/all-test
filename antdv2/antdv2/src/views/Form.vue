<template>
  <div class="form-list">
    

  </div>

</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form:{
        names:'',
        desc:""
      },
      
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
    handleSubmit(e) {
      // e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleProvinceChange(value) {
      this.cities = cityData[value];
      this.secondCity = cityData[value][0];
    },
  },
  mounted(){
    this.onSubmit();
  }
};
</script>
<style  scoped>
  .form-list{
    width: 300px;
    margin-left: 20px;
  }
</style>