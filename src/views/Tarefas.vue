<template>
  <Formulario @aoFinalizarTarefa="salvarTarefa" />

  <div class="lista">
    <Tarefa
      v-for="tarefa in tarefas"
      :key="tarefa.id"
      :tarefa="tarefa"
      @aoClicarTarefa="selecionarTarefa"
    />

    <Box v-if="!tarefas.length">Ainda não há tarefas.</Box>
  </div>

  <div
    class="modal"
    :class="{ 'is-active': tarefaSelecionada }"
    v-if="tarefaSelecionada"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <form @submit.prevent="alterarTarefa(tarefaSelecionada)">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button
            @click="fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">
              Descrição da Tarefa
            </label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoDaTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Salvar alterações</button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import ITarefa from "@/interfaces/ITarefa";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import { computed, defineComponent } from "vue";

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

  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },

  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },

    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },

    alterarTarefa(tarefa: ITarefa) {
      this.store.dispatch(ALTERAR_TAREFA, tarefa)
        .then(() => this.fecharModal());
    },

    fecharModal() {
      this.tarefaSelecionada = null;
    },
  },

  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    return {
      store,
      tarefas: computed(() => store.state.tarefa.tarefas),
    };
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
