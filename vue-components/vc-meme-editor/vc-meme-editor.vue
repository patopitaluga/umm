<template>
  <div>
    <div v-show="!vdShowDownloadForIos">
      <h2>Add text</h2>
      <div
        v-for="(eachBox, r) in vdBoxes"
        :key="r"
        v-cloak
        style="display: flex;"
      >
        <div style="margin: 0; flex: 1 1 auto;">
          <input
            :placeholder="'Text ' + (r + 1)"
            class="meme-text-input"
            type="text"
            v-model="eachBox.text"
            @keyup="updateCanvas"
          />
        </div>
        <div style="margin: 0; flex: 0 0 auto;margin-left: 5px;">
          <select
            class="meme-text-input"
            style="height: 38px;"
            v-model="eachBox.fontFamily"
            @change="updateCanvas"
          >
            <option :value="1">Impact-ish</option>
            <option :value="2">Arial-ish</option>
          </select>
        </div>
        <div style="margin: 0; flex: 0 0 auto;width: 60px;margin-left: 5px;">
          <input
            class="meme-text-input"
            type="number"
            v-model="eachBox.fontSize"
            @change="updateCanvas"
            @keyup="updateCanvas"
            style="width: 60px;margin-left: 5px;"
          />
        </div>
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
        style="margin: 10px auto;"
        @click="triggerDownload"
      >Download</button>
      <button
        v-if="
          !vdSharing &&
          ((vdPlatformOs === 'ios' && vdPlatformName !== 'safari') ||
          vdPlatformOs === 'android')
        "
        class="btn"
        @click="mtdShare"
        style="margin: 10px auto;"
      >Share</button>
    </div>
    <div v-if="vdShowDownloadForIos">
      <div style="margin: 5px 0;">
        Hold tap to download
      </div>
      <div>
        <img :src="vdImage4DownloadIos" style="width: 100%;"/>
      </div>
    </div>
  </div>
</template>

<script>
import vcmemeeditor from './vc-meme-editor.js';

export default vcmemeeditor;
</script>

<style lang="scss">
@import './vc-meme-editor.scss';
</style>
