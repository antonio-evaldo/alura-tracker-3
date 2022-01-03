import http from '@/http';
import ITarefa from '@/interfaces/ITarefa';
import { Estado } from '@/store';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from '@/store/tipo-acoes';
import { ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUI_TAREFA, DEFINIR_TAREFAS } from '@/store/tipos-mutacoes';
import { Module } from 'vuex';

export interface EstadoTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: []
  },

  mutations: {
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },

    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(t => t.id === tarefa.id);

      state.tarefas[index] = tarefa;
    },

    [EXCLUI_TAREFA](state, idTarefa: number) {
      state.tarefas = state.tarefas.filter(t => t.id !== idTarefa)
    },

    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
  },

  actions: {
    [OBTER_TAREFAS]({ commit }) {
      http.get('tarefas')
        .then(resposta => {
          commit(DEFINIR_TAREFAS, resposta.data);
        });
    },

    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.post('/tarefas', tarefa)
        .then(resposta => commit(ADICIONA_TAREFA, resposta.data));
    },

    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa));
    },
  }
}