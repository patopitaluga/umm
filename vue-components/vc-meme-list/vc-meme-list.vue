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
      <div style="display: flex;align-tems: center;justify-content: center;">
        <a
          class="btn btn--download"
          :href="'memes/' + eachMeme.img"
          download
          title="Download"
          @click.prevent="$emit('downloadmeme', eachMeme)"
        >
          Download
        </a>
        <button
          v-if="
            vdPlatformOs === 'ios' ||
            vdPlatformOs === 'android'
          "
          class="btn btn--share"
          :class="{
            'btn--share--ios': vdPlatformOs === 'ios',
            'btn--share--android': vdPlatformOs !== 'ios'
          }"
          title="Share"
          @click.prevent="$emit('sharememe', eachMeme)"
        >
          Share
        </button>
        <button
          v-if="eachMeme.editable"
          class="btn btn--edit"
          title="Edit"
          @click="mtdEditSelected(eachMeme.img)"
        >
          Edit
        </button>
      </div>
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
