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
import { computed, defineComponent } from "vue";

import Temporizador from "./Temporizador.vue";
import IProjeto from "@/interfaces/IProjeto";

import { useStore } from "@/store";

export default defineComponent({
  name: "Formulario",
  components: { Temporizador },
  emits: ["aoFinalizarTarefa"],

  setup() {
    const store = useStore();

    return {
      store,
      projetos: computed(() => store.state.projeto.projetos),
    };
  },

  data() {
    return {
      descricao: "",
      idProjeto: 0,
    };
  },

  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      const projeto = this.projetos.find(
        (proj) => proj.id === this.idProjeto
      ) as IProjeto;

      const tarefa = {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto,
      };

      this.$emit("aoFinalizarTarefa", tarefa);

      this.descricao = "";
    },
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>