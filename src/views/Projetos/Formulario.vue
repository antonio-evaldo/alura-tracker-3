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
import { TipoNotificacao } from "@/interfaces/INotificacao";

import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";
import IProjeto from '@/interfaces/IProjeto';

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
      notificar,
    };
  },

  data() {
    return {
      nomeDoProjeto: "",
    };
  },

  mounted() {
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find(
        (proj) => proj.id === Number(this.id)
      );

      this.nomeDoProjeto = projeto?.nome || "";
    }
  },

  methods: {
    salvar() {
      if (this.id) {
        this.store
          .dispatch(ALTERAR_PROJETO, {
            id: Number(this.id),
            nome: this.nomeDoProjeto,
          } as IProjeto)
          .then(() => this.lidarComSucesso());
      } else {
        this.store
          .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.lidarComSucesso());
      }
    },

    lidarComSucesso() {
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