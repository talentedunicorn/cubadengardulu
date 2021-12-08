<template>
  <article class="Playlist">
    <h3 class="PlaylistTitle">{{ playlist.fields.title }}</h3>
    <nuxt-img
      class="PlaylistImage"
      width="600"
      :src="playlist.fields.cover.fields.file.url"
      :alt="playlist.fields.cover.fields.title"
    />
    <div class="PlaylistContent">
      <slot></slot>
      <iframe
        v-show="iframeLoaded"
        :src="playlist.fields.link"
        width="100%"
        height="380"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        class="PlaylistEmbed"
        @load="iframeLoaded = true"
      ></iframe>
    </div>
  </article>
</template>
<script lang="ts">
// eslint-disable-next-line import/named
import Vue, { PropType } from 'vue'
import { RichTextContent } from 'contentful'

type TPlaylist = {
  fields: {
    cover: {
      fields: {
        file: { url: string }
        title: string
      }
    }
    link: string
    content: RichTextContent
  }
}
export default Vue.extend({
  props: {
    playlist: {
      type: Object as PropType<TPlaylist>,
      default: {} as PropType<TPlaylist>,
    },
  },
  data() {
    return {
      iframeLoaded: false,
    }
  },
})
</script>

<style scoped>
.Playlist {
  display: grid;
  grid-template-areas: 'image' 'title' 'content';
  gap: 2rem 4rem;
}

.PlaylistTitle {
  grid-area: title;
  align-self: end;
}

.PlaylistImage {
  grid-area: image;
}

.PlaylistContent {
  grid-area: content;
}

.PlaylistEmbed {
  margin-top: 2rem;
}

@media screen and (min-width: 60rem) {
  .Playlist {
    grid-template-areas: 'image title' 'image content';
    grid-template-columns: 25rem 1fr;
    grid-auto-rows: max-content;
    position: relative;
    min-height: 80vh;
  }

  .PlaylistImage {
    position: sticky;
    top: 6rem;
  }
}
</style>
