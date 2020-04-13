<template>
  <li
    class="meme-item"
    :class="{
      'meme-item--active': vdActive,
    }"
  >
    <div class="meme-item__bg">
      <img
        :src="'memes/' + vpMeme.img"
        @click="toggleActive"
      />
      <div
        class="meme-item__title"
        v-html="vpMeme.name"
        @click="toggleActive"
      >
      </div>
      <div
        v-if="vdActive"
        style="display: flex;align-tems: center;justify-content: center; flex-wrap: wrap;"
      >
        <a
          class="btn btn--download"
          :href="'memes/' + vpMeme.img"
          download
          title="Download"
          @click.prevent="$emit('downloadmeme', vpMeme)"
        >
          Download
        </a>
        <button
          v-if="
            (vdPlatformOs === 'ios' && vdPlatformName !== 'safari') ||
            vdPlatformOs === 'android'
          "
          class="btn btn--share"
          :class="{
            'btn--share--ios': vdPlatformOs === 'ios',
            'btn--share--android': vdPlatformOs !== 'ios'
          }"
          title="Share"
          @click.prevent="$emit('sharememe', vpMeme)"
        >
          Share
        </button>
        <button
          v-if="vpMeme.editable"
          class="btn btn--edit"
          title="Edit"
          @click="mtdEditSelected(vpMeme.img)"
        >
          Edit
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import vcmemeitem from './vc-meme-item.js';

export default vcmemeitem;
</script>

<style lang="scss">
@import './vc-meme-item.scss';
</style>
