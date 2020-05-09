<template>
  <div style="padding: 2px 10px 10px; background: #eee;margin-top: 10px;border-radius: 5px;">
    <form
      autocomplete="off"
      method="POST"
      @submit.prevent="mtdPreventSubmit"
    >
      <input
        :autocomplete="false"
        class="search__input"
        type="text"
        ref="searchinput"
        v-model="vdInputSuggestionTerm"
        @blur="mtdBlurSearchInput"
        @focus="mtdDisplaySuggestions"
        @keyup="mtdSuggestSearchTermChanged"
        placeholder="Search meme by name, year or category"
      />
    </form>
    <memelist
      v-if="vdInputSuggestionTerm !== ''"
      :vp-meme-list="vdMatchingMemes"
    >
    </memelist>
    <div
      v-if="vdInputSuggestionTerm !== '' && vdMatchingMemes.length === 0"
      style="font-size: 13px;"
    >
      There are no results for: <strong>{{ vdInputSuggestionTerm }}</strong>
    </div>
  </div>
</template>

<script>
import vcsearch from './vc-search.js';

export default vcsearch;
</script>

<style lang="scss">
@import './vc-search.scss';
</style>
