<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>

      <div class="field">
        <button type="submit" class="button">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useStore } from "@/store";
import { ALTERA_PROJETO, ADICIONA_PROJETO } from "@/store/tipos-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";

import useNotificador from '@/hooks/notificador';

export default defineComponent({
  name: "Formulario",
  props: {
    id: { type: String },
  },

  setup() {
    const store = useStore();
    const { notificar } = useNotificador();

    return {
      store,
      notificar
    };
  },

  data() {
    return {
      nomeDoProjeto: "",
    };
  },

  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (proj) => proj.id === this.id
      );

      this.nomeDoProjeto = projeto?.nome || "";
    }
  },

  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        });
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      }

      this.nomeDoProjeto = "";

      this.notificar(
        "Excelente!",
        "O projeto foi cadastrado com sucesso!",
        TipoNotificacao.SUCESSO
      );

      this.$router.push("/projetos");
    },
  },
});
</script>