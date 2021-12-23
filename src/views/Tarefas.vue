<template>
  <Formulario />

  <div class="lista">
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
    />

    <Box v-if="!tarefas.length">Ainda não há tarefas.</Box>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from "@/store";
import Box from "../components/Box.vue";
import Formulario from "./Tarefas/Formulario.vue";
import Tarefa from "./Tarefas/Tarefa.vue";

export default defineComponent({
  name: "Tarefas",
  components: {
    Formulario,
    Tarefa,
    Box,
  },

  setup() {
    const store = useStore();

    return {
      tarefas: computed(() => store.state.tarefas),
    };
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
