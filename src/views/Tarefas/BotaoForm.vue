<template>
  <button class="button">
    <span class="icon">
      <i :class="iconClass"></i>
    </span>
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  nome: "botaoForm",
  props: {
    iconClass: { type: String, required: true },
    text: { type: String, required: true },
  },
});
</script>
