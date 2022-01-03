import { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';

import IProjeto from '@/interfaces/IProjeto';
import ITarefa from '@/interfaces/ITarefa';
import INotificacao from '@/interfaces/INotificacao';
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, DEFINIR_PROJETOS, EXCLUI_PROJETO, EXCLUI_TAREFA, NOTIFICAR } from './tipos-mutacoes';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from './tipo-acoes';
import http from '@/http';

interface Estado {
  projetos: IProjeto[],
  tarefas: ITarefa[],
  notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: [],
  },

  mutations: {
    // [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
    //   const projeto: IProjeto = {
    //     id: new Date().toISOString(),
    //     nome: nomeDoProjeto
    //   };

    //   state.projetos.push(projeto);
    // },

    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex(p => p.id === projeto.id);

      state.projetos[index] = projeto;

      state.tarefas = state.tarefas.map(
        tarefa => {
          if (tarefa.projeto.id === projeto.id) {
            return { ...tarefa, projeto };
          }

          return tarefa;
        }
      );
    },

    [EXCLUI_PROJETO](state, id: number) {
      state.projetos = state.projetos.filter(p => p.id !== id);
    },

    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },

    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      tarefa.id = new Date().toISOString();
      state.tarefas.push(tarefa);
    },

    [ALTERA_TAREFA](state, tarefa) {
      const index = state.tarefas.findIndex(t => t.id === tarefa.id);

      state.tarefas[index] = tarefa;
    },

    [EXCLUI_TAREFA](state, idTarefa) {
      state.tarefas = state.tarefas.filter(t => t.id !== idTarefa)
    },

    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes =
          state.notificacoes.filter(n => n.id !== novaNotificacao.id);
      }, 3000);
    },
  },

  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get('projetos')
        .then(resposta => {
          commit(DEFINIR_PROJETOS, resposta.data);
        });
    },

    [CADASTRAR_PROJETO](contexto, nomeDoProjeto) {
      return http.post('/projetos', {
        nome: nomeDoProjeto
      });
    },

    [ALTERAR_PROJETO](contexto, projeto) {
      return http.put(`/projetos/${projeto.id}`, projeto);
    },

    [REMOVER_PROJETO]({ commit }, id) {
      return http.delete(`/projetos/${id}`)
        .then(() => commit(EXCLUI_PROJETO, id));
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}