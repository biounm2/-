<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>课堂笔记总结</h1>
        <el-button type="primary" @click="$router.push('/create')">新建笔记</el-button>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
}
</style>