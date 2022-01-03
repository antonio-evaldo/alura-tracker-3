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

- Diferença entre *mutations* e *actions*

Enquanto as *mutations* alteram diretamente o estado da aplicação e devem ser síncronas, as *actions* são utilizadas para realizar requisições assíncronas e *commits*. Então se precisarmos alterar o estado da aplicação de acordo com uma requisição HTTP, por exemplo, devemos criar uma *action* para realizar a requisição, e assim que obtivermos os dados de forma assíncrona, chamaremos uma *mutation* com um *commit* para alterar o estado da aplicação.

Nossa aplicação agora lida mais diretamente com a API, realizando requisições GET, POST, PUT e DELETE. Trocamos diversos *commits* por *dispatchs*, e um dos únicos *commits* necessários foi o de `DEFINIR_PROJETOS`, quando precisássemos listá-los após realizar alguma alteração.

O outro *commit* que usamos foi o `EXCLUI_PROJETO`, pois como a lista não é re-renderizada quando excluimos um projeto diretamente da API, escolhemos alterar o estado da aplicação para refletir na interfacte a mudança realizada pela *action*.

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
