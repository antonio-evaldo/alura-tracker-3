# Vue3: Avançando com o framework

## Módulo 1

- Instalar e utilizar o [json-server](https://github.com/typicode/json-server)

Instalamos globalmente o `json-server` com o comando `npm install -g json-server`.
  
Para rodar o servidor, executamos o comando `json-server --watch db.json` na pasta raiz do projeto. Se o arquivo `db.json` não existir, ele será criado automaticamente.

A estrutura desse arquivo definirá as rotas e recursos da nossa Fake API. Por exemplo, a estrutura abaixo:

```json
{
  "projetos": [
    {
      "id": 1,
      "nome": "Alura Tracker 3.0"
    },
    {
      "id": 2,
      "nome": "Projeto 2"
    }
  ],
  "tarefas": [
    {
      "id": 1,
      "nome": "Estudando json-server",
      "projeto": {
        "id": 1,
        "nome": "Alura Tracker 3.0"
      }
    }
  ]
}
```

Produzirá as rotas `http://localhost:3000/projetos` e ` http://localhost:3000/tarefas`.

Para acessar o projeto 1, por exemplo, digitamos a URL `http://localhost:3000/projetos/1`.

Para fazer uma busca por uma propriedade dos projetos, podemos escrever `http://localhost:3000/projetos?nome=Projeto 2`, ou para fazer uma busca por qualquer uma das propriedades dos projetos, podemos escrever `http://localhost:3000/projetos?q=alura` (podemos verificar essas funcionalidades na documentação).

- Instalar e configurar o axios
  - Adicionamos a dependência e configuramos uma única instância para toda a aplicação

- Diferença entre *mutations* e *actions*

Enquanto as *mutations* alteram diretamente o estado da aplicação e devem ser síncronas, as *actions* são utilizadas para realizar requisições assíncronas e *commits*. Então se precisarmos alterar o estado da aplicação de acordo com uma requisição HTTP, por exemplo, devemos criar uma *action* para realizar a requisição, e assim que obtivermos os dados de forma assíncrona, chamaremos uma *mutation* com um *commit* para alterar o estado da aplicação.

Nossa aplicação agora lida mais diretamente com a API, realizando requisições GET, POST, PUT e DELETE. Trocamos diversos *commits* por *dispatchs*, e um dos únicos *commits* necessários foi o de `DEFINIR_PROJETOS`, quando precisássemos listá-los após realizar alguma alteração.

O outro *commit* que usamos foi o `EXCLUI_PROJETO`, pois como a lista não é re-renderizada quando excluimos um projeto diretamente da API, escolhemos alterar o estado da aplicação para refletir na interface a mudança realizada pela *action*.

## Módulo 2

- Criando módulos na store

Para criar um módulo, criamos uma pasta `modules` com as pastas dos módulos que queremos criar. Cada módulo é um `index.ts` que possui configuração semelhante com a store em si: criamos e exportamos uma interface, no nosso caso `EstadoProjeto`, e exportamos um objeto do tipo `Module<EstadoProjeto, Estado>`, onde `Estado` é o estado global da aplicação que criamos na store.

Esse objeto terá as mesmas propriedades do objeto de configurações de `createStore()`, por exemplo `state`, `mutations` e `actions`. Em alguns casos é necessário inicializar o valor do `state`.

Por fim, a store terá uma estrutura como essa:

```ts
export const store = createStore<Estado>({
  state: {
    tarefa: {
      tarefas: []
    },
    projeto: {
      projetos: []
    },
    notificacoes: [],
  },

  mutations: {
    // mutações globais...
  },

  modules: {
    projeto,
    tarefa
  }
})
```

- A importância de manter a saúde do projeto

Sempre que identificamos um problema conhecido, como a store com código demais, precisamos ter uma arquitetura alternativa para que o projeto possa ser mantido muito muito mais tempo antes de virar um legado difícil de trabalhar.

- Promises e async/await 
  - Vimos na atividade de alternativas que temos outra forma de lidar com métodos assíncronos

## Módulo 3

- Utilizando a *Composition API*
  - Refatoramos alguns componentes do projeto, trocando recursos da Options API por recursos da Composition API. A Composition API é um recurso do Vue 3.

- Algumas das mudanças:
  - Não utilizamos mais o `this`, já que no `setup()` o componente ainda não existe;
  - Eliminamos a option `data()` e agora importamos o método `ref()` do `vue` para criar variáveis reativas. Para **acessarmos ou alterarmos** o valor dessas variáveis, usamos `nomeDaVariavel.value`.
  - Utilizamos o primeiro parâmetro de `setup()` para acessar as `props` (mas mantemos a option `props` da Options API);
  - Utilizamos o segundo parâmetro de `setup()` para acessar o contexto do componente, nele podemos acessar o método `emit()`, em vez de utilizar `this.$emit()`.


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
