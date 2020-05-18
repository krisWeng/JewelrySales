<template>
  <main id="search">
    <div class="searchBox">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-xiangzuo"></use>
      </svg>
      <el-autocomplete
        class="inline-input"
        v-model="searchA"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
        clearable
      ></el-autocomplete>
      <el-button type="primary" round size="small" @click="search">搜索</el-button>
    </div>
  </main>
</template>

<script>
  export default{
    data(){
      return{
        searchP: "",
        searchA: "",
        shopList: []
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.searchP = item.second_classify_id
        this.searchA = item.value
      },
      // 搜索
      search(){
        if(this.searchP==''){
          this.searchP = this.searchA
        }else{
          this.searchP = this.searchP
        }
        this.$router.push({
          path: '/shopList/'+this.searchP
        })
      },
      loadAll() {
        return [
          { "value": "耳环", "second_classify_id": "E100101" },
          { "value": "耳坠", "second_classify_id": "E100103" },
          { "value": "耳钉", "second_classify_id": "E100102" },
          { "value": "耳饰 耳环", "second_classify_id": "E100101" },
          { "value": "耳饰 耳坠", "second_classify_id": "E100103" },
          { "value": "耳饰 耳钉", "second_classify_id": "E100102" },

          { "value": "项链", "second_classify_id": "J100101" },
          { "value": "项圈", "second_classify_id": "J100102" },
          { "value": "颈饰 项链", "second_classify_id": "J100101" },
          { "value": "颈饰 项圈", "second_classify_id": "J100102" },

          { "value": "发夹", "second_classify_id": "T100101" },
          { "value": "头花", "second_classify_id": "T100102" },
          { "value": "发簪", "second_classify_id": "T100103" },
          { "value": "发饰 发夹", "second_classify_id": "T100101" },
          { "value": "发饰 头花", "second_classify_id": "T100102" },
          { "value": "发饰 发簪", "second_classify_id": "T100103" },

          { "value": "脚链", "second_classify_id": "J100201" },
          { "value": "脚镯", "second_classify_id": "J100202" },
          { "value": "脚饰 脚链", "second_classify_id": "J100201" },
          { "value": "脚饰 脚镯", "second_classify_id": "J100202" },

          { "value": "手镯", "second_classify_id": "S100101" },
          { "value": "手链", "second_classify_id": "S100102" },
          { "value": "臂环", "second_classify_id": "S100103" },
          { "value": "戒指", "second_classify_id": "S100104" },
          { "value": "指环", "second_classify_id": "S100105" },
          { "value": "手饰 手镯", "second_classify_id": "S100101" },
          { "value": "手饰 手链", "second_classify_id": "S100102" },
          { "value": "手饰 臂环", "second_classify_id": "S100103" },
          { "value": "手饰 戒指", "second_classify_id": "S100104" },
          { "value": "手饰 指环", "second_classify_id": "S100105" },

          { "value": "胸针", "second_classify_id": "X100101" },
          { "value": "胸章", "second_classify_id": "X100102" },
          { "value": "胸花", "second_classify_id": "X100103" },
          { "value": "胸饰 胸针", "second_classify_id": "X100101" },
          { "value": "胸饰 胸章", "second_classify_id": "X100102" },
          { "value": "胸饰 胸花", "second_classify_id": "X100103" },

          { "value": "腰链", "second_classify_id": "Y100101" },
          { "value": "腰带", "second_classify_id": "Y100102" },
          { "value": "腰饰 腰链", "second_classify_id": "Y100101" },
          { "value": "腰饰 腰带", "second_classify_id": "Y100102" },
        ]
      },
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>

<style lang="scss">
  #search{
    .searchBox{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;

      .icon{
        font-size: 20px;
      }

      .el-input{
        height: 35px;

        input{
          line-height: 25px;
          height: 35px;
          background: #f7f7f7;
          border: 1px solid #409EFF;
          border-radius: 20px;
        }
        .el-input__icon{
          line-height: 35px;
        }
      }
    }
  }
</style>
