# Vue3: Avançando com o framework

## Módulo 1

- Instalar e configurar o `vue-router` num projeto existente;
  - Vimos que o Vue é um framework progressivo e não vem com roteamento por padrão.
  - Executamos `npm i vue-router@4`, que é versão correta para o Vue3.

- Configurar o arquivo de rotas;
  - Criamos uma lista de objetos, indicando qual componente será responsável por qual rota.

## Módulo 2

- Instalar e configurar o Vuex para gerenciamento de estados globais.
  - Executamos `npm i vuex@next`, que é a versão correta para o Vue3.

Template básico para configurar uma *store* do Vuex:

```ts
import { InjectionKey } from 'vue';
import { Store, createStore, useStore as vuexUseStore } from 'vuex';

interface IProject {
  id: string;
  name: string;
}

interface State {
  state: {
    projects: IProject[];
  }
}

const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
};
```

E para acessar os projetos de forma dinâmica em um componente, usamos a função `computed()` para acessar `store.state.projects`:

```ts
export default defineComponent({
  name: 'ComponentName',

  setup() {
    const store = useStore();

    return {
      projects: computed(() => store.state.projects)
    };
  }
}) 
```

## Módulo 3

- Manipular o estado;
  - Inserimos, editamos, excluímos e listamos os projetos.

Exemplo de *mutation* do *store*:

```ts
  const ADD_PROJECT = 'ADD_PROJECT';

  export const store = createStore<State>() {
    state: {
      projects: [],
    },

    mutations: {
      [ADD_PROJECT](state, newProject: IProject) {
        const project = {
          id: new Date().toISOString(),
          name: newProject.name,
        };

        state.projects.push(project);
      }
    }
  };
```

- Rotas aninhadas;
  - Agrupar rotas dentro de um mesmo contexto.
  
- Tipos de mutações;
  - Extraímos os nomes das mutações para constantes.

## Módulo 4

- Controlar o estado;
  - Desenvolvendo a lista de notificações.

## Módulo 5

- Mixins;
  - Como reaproveitar código e qual a fragilidade dessa técnica.

- Composition API;
  - Como reaproveitar código de uma forma mais coesa e legível.

- Computed - debugging;
  - Como depurar código de propriedades computadas.

# alura-tracker

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
