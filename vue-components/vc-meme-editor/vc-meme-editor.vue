<template>
  <div>
    <h2>Add text</h2>

    <div
      v-for="r in vdBoxes.length"
      :key="r"
      v-cloak
      style="display: flex;"
    >
      <input
        :placeholder="'Text ' + r"
        class="meme-text-input"
        type="text"
        v-model="vdTexts[r]"
        @keyup="updateCanvas"
      />
      <input
        class="meme-text-input"
        type="number"
        v-model="vdFontSizes[r]"
        @change="updateCanvas"
        @keyup="updateCanvas"
        style="width: 60px;margin-left: 5px;"
      />
    </div>
    <div style="display: flex;width: 100%;padding: 8px 0 5px;">
      <button
        class="btn"
        @click="mtdAddText"
        style="margin: auto 0 auto auto;"
      >Add text</button>
    </div>
    <div
      v-cloak
      id="container"
      class="container"
      :class="{
        'container--might-drag': vdMightDrag > -1,
        'container--dragging': vdDragging,
        'container--resize-1': vdMightResizeCorner === 1,
        'container--resize-2': vdMightResizeCorner === 2,
        'container--resize-3': vdMightResizeCorner === 3,
        'container--resize-4': vdMightResizeCorner === 4,
        'container--resize-5': vdMightResizeCorner === 5,
        'container--resize-6': vdMightResizeCorner === 6,
        'container--resize-7': vdMightResizeCorner === 7,
        'container--resize-8': vdMightResizeCorner === 8,
      }"
      style="margin-top: 8px;"
    >
      <img id="img"/>
    </div>
    <button
      class="btn"
      id="download-button"
      style="margin: 10px auto;"
    >Download</button>
    <button
      v-if="
        (vdPlatformOs === 'ios' && vdPlatformName !== 'safari') ||
        vdPlatformOs === 'android'
      "
      class="btn"
      @click="share"
      style="margin: 10px auto;"
    >Share</button>
  </div>
</template>

<script>
import vcmemeeditor from './vc-meme-editor.js';

export default vcmemeeditor;
</script>

<style lang="scss">
@import './vc-meme-editor.scss';
</style>
