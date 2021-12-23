<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo Alura Tracker" />
    </h1>

    <div class="has-text-centered">
      <button @click="trocarTema" class="button">
        {{ modoEscuroAtivo ? "Desativar" : "Ativar" }} modo escuro
      </button>
    </div>

    <nav class="panel mt-5">
      <ul>
        <router-link to="/" class="link">
          <li>
            <i class="fas fa-tasks"></i>
            tarefas
          </li>
        </router-link>
        <router-link to="/projetos" class="link">
          <li>
            <i class="fas fa-project-diagram"></i>
            projetos
          </li>
        </router-link>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTrocarTema"],

  data() {
    return {
      modoEscuroAtivo: false,
    };
  },

  methods: {
    trocarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit("aoTrocarTema", this.modoEscuroAtivo);
    },
  },
});
</script>

<style scoped>
h1 {
  text-align: center;
}

strong {
  color: #f95738;
}

header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding: 2rem;
}

@media only screen and (max-width: 768px) {
  header {
    height: auto;
  }
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}
</style>