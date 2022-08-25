<template>
  <div class="about">
    <h1>For-Never Home</h1><br/>
    <div class="background">
      <h3>Gone but not forgotten, For-Never Home is dedicated to the furry/scaly, big/small, wet/dry friends that we have shared our hearts and lives with. Let your pal live on into the digital age; clouds don't only exist in heaven.</h3>
    </div>
    <div class="made-by">
      <p>Created by Tim Minker 2022</p>
    </div>
    <button @click="$router.push('/')">Return home</button>
  </div>
</template>

<style>
  body {
    text-align: center;
  }

  h3 {
    margin-top: 0;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
  .background {
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    background: rgb(10, 10, 10, .50);
    border-radius: 15px 15px 15px 15px;
    transition: width 2.5s;
    text-align: center;
  }
  .background:hover {
    width: 1200px;
    text-align: center;
  }
</style>
