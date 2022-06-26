<template>
  <div id="sign_wrap">
    <h1>Backstage management</h1>
    <el-input v-model="name" placeholder="enter user name"></el-input>
    <el-input v-model="password" placeholder="enter password" type="password"></el-input>
    <el-button @click="signup">register</el-button>
    <el-button type="primary" @click="signin">log in</el-button>
  </div>
</template>

<script>
  export default {
    name: 'signin',
    data() {
      return {
        name: '',
        password: '',
        hasName: false, // 用户名被占
      }
    },
    mounted: function () {

    },
    methods: {
      signup: function () {
        let _this = this;
        if (this.name.length < 6) {
          this.$message.error('Username cannot be empty or less than six characters')
          return
        }

        if (this.password.length < 6) {
          this.$message.error('Password cannot be empty or less than six characters')
          return
        }

        this.$http.get('/api/admin/getUser/' + this.name).then(
          response => {
            if (response.body.name === _this.name) {
              _this.$message.error('The user already exists')
              _this.name = '';
              // 由于异步，name的改变比正常流执行得慢，所以不能通过判断name去执行是否post
              // 所以我把post移入else中，而不是在外面通过判断name执行
            } else {
              let obj = {
                name: _this.name,
                password: _this.password
              }

              _this.$http.post('/api/admin/signup', {
                userInfo: obj
              }).then(
                response => {
                  _this.$message({
                    message: 'registration success',
                    type: 'success'
                  })
                },
                response => console.log('registration failed' + response)
              )
            }
          },
          response => console.log(response)
        )
      },
      signin: function () {
        let _this = this;
        if (this.name.length < 6) {
          this.$message.error('Username cannot be empty or less than six characters')
          return
        }

        if (this.password.length < 6) {
          this.$message.error('Password cannot be empty or less than six characters')
          return
        }

        this.$http.get('/api/admin/getUser/' + this.name).then(
          response => {
            if (_this.password !== response.body.password) {
              _this.$message.error('Incorrect username or password')
            } else {
              let obj = {
                name: _this.name,
                password: _this.password
              }
              _this.$http.post('/api/admin/signin', {
                userInfo: obj
              }).then(
                response => {
                  _this.$message({
                    message: 'login successful',
                    type: 'success'
                  })
                  delete _this.password;
                  _this.$router.go(-1)
                },
                response => console.log('Login failed'+response)
              )
            }
          },
          response => {
            _this.$message.error('this user does not exist')
            return
          }
        )
      }
    }
  }
</script>

<style>
  #sign_wrap {
    width: 300px;
    margin: 200px auto;
  }

  #sign_wrap h1 {
    color: #383a42;
    padding: 10px;
  }

  #sign_wrap div {
    padding-bottom: 20px;
  }
</style>