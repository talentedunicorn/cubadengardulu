<template>
  <article class="Playlist">
    <h3 class="PlaylistTitle">{{ playlist.fields.title }}</h3>
    <nuxt-img
      class="PlaylistImage"
      format="webp"
      loading="lazy"
      width="600"
      :src="playlist.fields.cover.fields.file.url"
      :alt="playlist.fields.cover.fields.title"
    />
    <div class="PlaylistContent">
      <slot></slot>
      <iframe
        :src="playlist.fields.link"
        :title="playlist.fields.title"
        width="100%"
        height="380"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        class="PlaylistEmbed"
        loading="lazy"
      ></iframe>
    </div>
  </article>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'

type TPlaylist = {
  fields: {
    cover: {
      fields: {
        file: { url: string }
        title: string
      }
    }
    link: string
    content: any
  }
}
export default Vue.extend({
  props: {
    playlist: {
      type: Object as PropType<TPlaylist>,
      default: {} as PropType<TPlaylist>,
    },
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
  border-radius: 1rem;
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
