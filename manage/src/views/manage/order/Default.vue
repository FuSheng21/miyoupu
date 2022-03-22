<template>
    <div>
        <keep-alive :include="/List$/">
        <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
export default {
    name:'Order'
}
</script>