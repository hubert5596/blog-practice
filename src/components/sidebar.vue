<template>
  <div id="left_menu">
    <div class="menu_name">
      <h1>Блог Ху Битай</h1>
      <h5>A simple blog system</h5>
    </div>
    <nav>
      <ul>
        <router-link to="/article">
          <li class="nav">
            <span>Front page</span>
          </li>
        </router-link>
        <router-link to="/about">
          <li class="nav">
            <span>About the Blog</span>
          </li>
        </router-link>
        <router-link to="/admin/signin">
          <li class="nav">
            <span>Log in</span>
          </li>
        </router-link>
        <router-link to="/admin/articleList">
          <li class="nav">
            <span>Manage</span>
          </li>
        </router-link>
        <router-link to="/admin/articleEdit">
          <li class="nav">
            <span>Write articles</span>
          </li>
        </router-link>
      </ul>
    </nav>
    <div class="info">
      <img src="../assets/head.jpg" alt="head">
      <div class="info_name">HUBITAI</div>
      <div class="archive">
        <ul>
          <router-link to="/article">
            <li>
              <span class="archive_count">{{ articleNumber }}</span>
              <span class="archive_name">links</span>
            </li>
          </router-link>
        </ul>
      </div>
      <ul class="communication">
        <li class="communication_item">
          <a href="https://github.com/hubert5596">
            <span>GitHub</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="https://edurfe.bsu.by/login/index.php">
            <span>Bsuedu</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="https://www.keybr.com/">
            <span>Keybrd</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="https://zty.pe/">
            <span>Ztgame</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data() {
      return {
        articleNumber: ''
      }
    },
    mounted: function () {
      this.$http.get('/api/articleList').then(
        response => this.articleNumber = response.body.length,
        response => console.log(response)
      )
    }
  }
</script>

<style>
  #left_menu {
    float: left;
    width: 240px;
    margin-right: 20px;
  }

  @media (max-width: 767px) {
    #left_menu {
      display: none;
    }
  }

  #left_menu a:hover {
    color: #222;
    background: #f5f7f9;
  }

  .menu_name {
    background: rgb(0, 0, 0);
    color: white;
    padding: 10px 0;
  }

  nav {
    background: white;
    padding: 20px 0;
  }

  .nav {
    padding: 8px 20px;
    text-align: left;
  }

  .info {
    margin-top: 10px;
    padding: 20px;
    background: white;
  }

  .info_name {
    font-weight: 600;
    padding: 5px;
  }

  .info img {
    width: 120px;
    height: 120px;
  }

  .archive {
    padding-top: 20px;
  }

  .archive .archive_count {
    display: block;
    color: #222;
    font-weight: 600;
    font-size: 16px;
  }

  .archive .archive_name {
    display: block;
    color: #999;
    font-size: 14px;
  }

  .communication {
    padding-top: 20px;
  }

  .communication_item {
    display: inline-block;
    width: 40%;
    font-size: 14px;
    font-weight: 600;
    padding: 5px;
  }
</style>