<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import '../static/js/iconfont.js'
  import '../static/css/other.css'
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style lang="scss">
  body{
    padding: 0;
    margin: 0;
    background: #f7f7f7;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  h1, h2, p {
    margin: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    // display: inline-block;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: #2c3e50;
  }

	.icon {
	  width: 1em;
	  height: 1em;
	  vertical-align: -0.15em;
	  fill: currentColor;
	  overflow: hidden;
	}

	.BoxTitle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
	  background-color: white;
		border-radius: 10px 10px 0 0;

		.addBox{
			cursor: pointer;
			font-size: 14px;
		}
	}
  .el-breadcrumb{
    padding: 20px 20px 20px 40px;
    font-size: 20px;
  }
  .hideBox{
    &:nth-of-type(1){
      .passwdBox{
        top: 0%;
      }
    }
    .bgColor{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 4;
      opacity: 0.6;
      background: #000;
    }
    .BoxContent{
      width: 40%;
      position: absolute;
      top: 10%;
      left: 30%;
      background: #fff;
      border-radius: 15px;
      padding: 60px 25px 20px 0;
      z-index: 6;

      .closeBtn{
        width: 20px;
        line-height: 20px;
        display: inline-block;
        position: absolute;
        top: 10px;
        right: 20px;
        border: 1px solid silver;
        border-radius: 50%;
        color: silver;
        font-weight: bolder;
        cursor: pointer;
        text-align: center;
      }

      .el-form{
        .el-form-item{
          &:nth-last-of-type(1){
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
