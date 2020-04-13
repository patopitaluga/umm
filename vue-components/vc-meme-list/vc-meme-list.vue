<template>
  <ul
    class="search__results"
    :class="{
      'search__results--cols3': vpCols === 3,
      'search__results--cols4': vpCols === 4,
    }"
  >
    <li
      class="search__suggestion"
      v-for="(eachMeme, i) in vpMemeList"
      :key="i"
    >
      <img :src="'memes/' + eachMeme.img"/>
      <div
        class="search__suggestion__title"
        v-html="eachMeme.name"
      >
      </div>
      <a
        class="search__suggestion__link"
        :href="'memes/' + eachMeme.img"
        download
        @click.prevent="$emit('memeclicked', eachMeme)"
      >
        Download
      </a>
      <button
        v-if="eachMeme.editable"
        class="search__suggestion__btn"
        @click="mtdEditSelected(eachMeme.img)"
      >
        Edit
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
