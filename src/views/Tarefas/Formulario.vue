<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="0">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <Temporizador
          @aoFinalizarTemporizador="finalizarTarefa"
          :temProjeto="Boolean(idProjeto)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import Temporizador from "./Temporizador.vue";
import IProjeto from "@/interfaces/IProjeto";

import { useStore } from "@/store";

export default defineComponent({
  name: "Formulario",
  components: { Temporizador },
  emits: ["aoFinalizarTarefa"],

  setup(props, { emit }) {
    const store = useStore();

    const descricao = ref("");
    const idProjeto = ref(0);

    const projetos = computed(() => store.state.projeto.projetos);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      const projeto = projetos.value.find(
        (proj) => proj.id === idProjeto.value
      ) as IProjeto;

      emit("aoFinalizarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto,
      });

      descricao.value = "";
    };

    return {
      descricao,
      idProjeto,
      projetos,
      finalizarTarefa,
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>