<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />

    <BotaoForm
      iconClass="fas fa-play"
      text="play"
      :disabled="cronometroAtivo"
      @click="iniciar"
    />

    <BotaoForm
      iconClass="fas fa-stop"
      text="stop"
      :disabled="!cronometroAtivo"
      @click="finalizar"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BotaoForm from "./BotaoForm.vue";
import Cronometro from "./Cronometro.vue";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "Temporizador",
  emits: ["aoFinalizarTemporizador"],
  components: { Cronometro, BotaoForm },

  setup() {
    const { notificar } = useNotificador();

    return {
      notificar,
    };
  },

  data() {
    return {
      tempoEmSegundos: 0,
      cronometroID: 0,
      cronometroAtivo: false,
    };
  },

  props: {
    temProjeto: { type: Boolean },
  },

  methods: {
    iniciar() {
      this.cronometroAtivo = true;

      this.cronometroID = setInterval(() => {
        this.tempoEmSegundos++;
      }, 1000);
    },

    finalizar() {
      if (this.temProjeto) {
        clearInterval(this.cronometroID);
        this.cronometroAtivo = false;
        
        this.$emit("aoFinalizarTemporizador", this.tempoEmSegundos);
        this.tempoEmSegundos = 0;
      } else {
        this.notificar(
          "Selecione um projeto",
          "A nova tarefa deve estar vinculada a um projeto.",
          TipoNotificacao.ATENCAO
        );
      }
    },
  },
});
</script>
