<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>

      <span>Novo projeto</span>
    </router-link>

    <table class="table is-fullwidth" v-if="projetos.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>

            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Box v-else class="mt-3">Não há projetos.</Box>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from "@/store";
import Box from "@/components/Box.vue";
import { EXCLUI_PROJETO } from '@/store/tipos-mutacoes';

export default defineComponent({
  name: "Lista",
  components: {
    Box,
  },

  setup() {
    const store = useStore();

    return {
      store,
      projetos: computed(() => store.state.projetos),
    };
  },

  methods: {
    excluir(id: string) {
      confirm("Tem certeza que deseja excluir esse projeto?") &&
        this.store.commit(EXCLUI_PROJETO, id);
    },
  },
});
</script>