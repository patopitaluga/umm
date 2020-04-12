<template>
  <ul class="search__results">
    <li
      class="search__suggestion"
      v-for="(eachMemeFound, i) in vpMemeList"
      :key="i"
    >
      <img :src="'memes/' + eachMemeFound.img"/>
      <div
        class="search__suggestion__title"
        v-html="eachMemeFound.name"
      >
      </div>
      <a
        class="search__suggestion__link"
        :href="'/memes/' + eachMemeFound.img"
        download
        @click.prevent="$emit('memeclicked', eachMemeFound)"
      >
        Download
      </a>
      <button
        class="search__suggestion__btn"
        @click="mtdEditSelected(eachMemeFound.img)"
      >
        Add text
      </button>
    </li>
  </ul>
</template>

<script>
import vcmemelist from './vc-meme-list.js';

export default vcmemelist;
</script>

<style lang="scss">
@import './vc-meme-list.scss';
</style>
