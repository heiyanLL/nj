<template>
    <div id="app">
      <router-view />
    </div>
</template>

<script>
    export default {
        name: "App"
    };
</script>

<style lang="less">
    body,
    html {
        margin: 0;
        font-size: 14px;
    }
    h1,p{
        margin: 0;
    }
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>
