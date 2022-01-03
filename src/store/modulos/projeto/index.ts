import http from '@/http';
import IProjeto from '@/interfaces/IProjeto';
import { Estado } from '@/store';
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from '@/store/tipo-acoes';
import { ALTERA_PROJETO, EXCLUI_PROJETO, DEFINIR_PROJETOS } from '@/store/tipos-mutacoes';
import { Module } from 'vuex';

export interface EstadoProjeto {
  projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
  state: {
    projetos: []
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

      // state.tarefas = state.tarefas.map(
      //   tarefa => {
      //     if (tarefa.projeto.id === projeto.id) {
      //       return { ...tarefa, projeto };
      //     }

      //     return tarefa;
      //   }
      // );
    },

    [EXCLUI_PROJETO](state, id: number) {
      state.projetos = state.projetos.filter(p => p.id !== id);
    },

    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
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

    [ALTERAR_PROJETO]({ dispatch }, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto)
        // .then(() => dispatch(ATUALIZA_TAREFAS_DO_PROJETO, projeto));
    },

    // [ATUALIZA_TAREFAS_DO_PROJETO]({ state }, projeto: IProjeto) {
    //   state.tarefas.forEach(tarefa => {
    //     if (tarefa.projeto.id === projeto.id) {
    //       http.put(`/tarefas/${tarefa.id}`, {
    //         ...tarefa, projeto
    //       })
    //     }
    //   })
    // },

    [REMOVER_PROJETO]({ commit }, id: string) {
      return http.delete(`/projetos/${id}`)
        .then(() => commit(EXCLUI_PROJETO, id));
    },
  }
}