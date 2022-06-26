<template>
  <div id="content">
    <div class="article_wrap" v-for="item in articleList">
      <div @click="articleEdit(item._id)" class="article_title">{{ item.title }}</div>
      <div class="article_info">
        <span class="article_info_date">Article publication time：{{ item.date }}</span>
        <span class="article_info_label">Label：
        <span v-if="item.labels.length === 0">uncategorized</span>
        <el-tag v-else class="tag_margin" type="primary" v-for="tag in item.labels">{{ tag }}</el-tag>
        </span>
      </div>
      <div class="article_gist">{{ item.gist }}</div>
      <div>
        <div @click="articleEdit(item._id)" class="article_button edit">modify</div>
        <div @click="deleteArticle(item._id)" class="article_button delete">delete</div>
      </div>
      <div class="article_underline"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'article',
    data() {
      return {
        articleList: [],
      }
    },
    mounted: function () {
      // 获取文章列表
      this.$http.get('/api/articleList').then(
        response => this.articleList = response.body.reverse(),
        response => console.log(response)
      )
    },
    methods: {
      // 跳转至文章编辑页
      articleEdit: function (id) {
        this.$router.push('/admin/articleEdit/' + id)
      },
      // 删除文章
      deleteArticle: function (id) {
        let self = this
        this.$confirm('This operation will permanently delete the article, do you want to continue?', 'prompt', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          self.$http.post('/api/admin/deleteArticle', {
            _id: id
          }).then(
            response => {
              self.$message({
                type: 'success',
                message: 'successfully deleted!'
              });
              self.fetchData()
            },
            response => {
              console.log(response)
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Undeleted'
          });
        });
      },
      // 更新数据
      fetchData: function () {
        this.$http.get('/api/articleList').then(
          response => this.articleList = response.body.reverse(),
          response => console.log(response)
        )
      }
    }
  }
</script>

<style>
  .edit:hover {
    background: limegreen;
    color: white;
    font-weight: 600;
  }

  .delete:hover {
    background: red;
    color: white;
    font-weight: 600;
  }
</style>