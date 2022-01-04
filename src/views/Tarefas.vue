<template>
  <Formulario @aoFinalizarTarefa="salvarTarefa" />

  <div class="lista">
    <Box v-if="!tarefas.length">Ainda não há tarefas.</Box>

    <div class="field">
      <p class="control has-icons-left">
        <input
          v-model="filtro"
          class="input"
          type="text"
          placeholder="Digite para filtrar"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <Tarefa
      v-for="tarefa in tarefas"
      :key="tarefa.id"
      :tarefa="tarefa"
      @aoClicarTarefa="selecionarTarefa"
    />
  </div>

  <Modal :estaAtivo="tarefaSelecionada !== null">
    <template v-slot:cabecalho>
      <p class="modal-card-title">Editando uma tarefa</p>
      <button @click="fecharModal" class="delete" aria-label="close"></button>
    </template>

    <template v-slot:corpo>
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
    </template>

    <template v-slot:rodape>
      <button
        @click="alterarTarefa(tarefaSelecionada)"
        class="button is-success"
      >
        Salvar alterações
      </button>

      <button @click="fecharModal" class="button">Cancelar</button>
    </template>
  </Modal>
</template>

<script lang="ts">
import Modal from "@/components/Modal.vue";
import ITarefa from "@/interfaces/ITarefa";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import { computed, defineComponent, ref, watchEffect } from "vue";

import Box from "../components/Box.vue";
import Formulario from "./Tarefas/Formulario.vue";
import Tarefa from "./Tarefas/Tarefa.vue";

export default defineComponent({
  name: "Tarefas",
  components: {
    Formulario,
    Tarefa,
    Box,
    Modal,
  },

  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref("");

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      filtro,
      store,
      tarefas: computed(() => store.state.tarefa.tarefas),
    };
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
      this.store
        .dispatch(ALTERAR_TAREFA, tarefa)
        .then(() => this.fecharModal());
    },

    fecharModal() {
      this.tarefaSelecionada = null;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
