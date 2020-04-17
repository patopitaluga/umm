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
        @touchstart.preven="toggleActive"
      />
      <div
        class="meme-item__title"
        v-html="vpMeme.name"
        @click="toggleActive"
        @touchstart.preven="toggleActive"
      >
      </div>
      <div
        v-if="vdActive"
        style="display: flex;align-tems: center;justify-content: center; flex-wrap: wrap;padding-left: 4px;padding-right: 4px;"
      >
        <a
          class="btn btn--download"
          :href="'memes/' + vpMeme.img"
          download
          title="Download"
          @click.prevent="triggerDownloadMeme"
        >
          Download
        </a>
        <button
          v-if="
            !vdSharing &&
            ((vdPlatformOs === 'ios' && vdPlatformName !== 'safari') ||
            vdPlatformOs === 'android')
          "
          class="btn btn--share"
          :class="{
            'btn--share--ios': vdPlatformOs === 'ios',
            'btn--share--android': vdPlatformOs !== 'ios'
          }"
          title="Share"
          @click.prevent="triggerShareMeme"
        >
          Share
        </button>
        <div
          v-else
          class="btn"
          style="background: transparent"
        >
          Generating share image…
        </div>
        <a
          v-if="vpMeme.editable"
          class="btn btn--edit"
          title="Edit"
          :href="'edit?i=' + vpMeme.img"
        >
          Edit
        </a>
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
