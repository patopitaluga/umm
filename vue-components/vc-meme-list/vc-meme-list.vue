<template>
  <ul
    class="search__results"
    :class="{
      'search__results--cols3': vpCols === 3,
      'search__results--cols4': vpCols === 4,
    }"
  >
    <memeitem
      v-for="(eachMeme, i) in vpMemeList"
      :key="i"
      :vp-meme="eachMeme"
      @memeactive="deactivateOthers"
    >
    </memeitem>
  </ul>
</template>

<script>
import vcmemelist from './vc-meme-list.js';

export default vcmemelist;
</script>

<style lang="scss">
@import './vc-meme-list.scss';
</style>
