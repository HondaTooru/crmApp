<template>
 <div class="nodata">
    <div>

    </div>
 </div>
</template>

<script>

</script>

<style lang="less" scoped>
.nodata {
  height: 100%;
  position: relative;
  &>div{
    background:url(../../assets/no-data.svg) center center/cover;
    height: 140px;
    width: 140px;
    position: absolute;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    whill-change:transform
  }
}

</style>
