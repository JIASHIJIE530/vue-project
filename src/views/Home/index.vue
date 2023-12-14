<script setup lang="ts">

import { useI18n } from 'vue-i18n';

const {locale} = useI18n();




const change = () => {
 locale.value = 'en'
}

</script>

<template>
  <div class="home">
    <h1>{{ $t('login') }}</h1>
    <button @click="change">haha</button>
  </div>
</template>
