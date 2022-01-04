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
import { defineComponent, ref } from "vue";

import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";

import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";
import IProjeto from "@/interfaces/IProjeto";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "Formulario",
  props: {
    id: { type: String },
  },

  setup(props) {
    const router = useRouter();

    const store = useStore();
    const { notificar } = useNotificador();

    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id === Number(props.id)
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETO, {
            id: Number(props.id),
            nome: nomeDoProjeto.value,
          } as IProjeto)
          .then(() => lidarComSucesso());
      } else {
        store
          .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => lidarComSucesso());
      }
    };

    const lidarComSucesso = () => {
      nomeDoProjeto.value = "";
      notificar(
        "Excelente!",
        "O projeto foi cadastrado com sucesso!",
        TipoNotificacao.SUCESSO
      );
      router.push("/projetos");
    }

    return {
      nomeDoProjeto: nomeDoProjeto,
      salvar
    };
  },
});
</script>