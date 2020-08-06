Boas vindas ao primeiro projeto A CLI of Ice and Fire!
Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por Slack! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

O que deverá ser desenvolvido
Você vai refatorar parte de um CLI (command line interface) para que, ao invés de utilizar callbacks, utilize apenas Promises. Além disso, você vai implementar mais algumas funcionalidades, consumindo a mesma API que está sendo consumida.

Desenvolvimento
O CLI mostra informações sobre o mundo de Game of Thrones utilizando, como fonte dessas informações, uma API pública chamada An API of Ice And Fire.

O código deste repositório possui a funcionalidade de listar as personagens, e exibir os detalhes sobre uma personagem selecionada. Além de refatorar o código já existente, você deverá adicionar a funcionalidade de buscar livros pelo nome, exibir os resultados, e mostrar os detalhes do livro selecionado.

Requisitos do projeto
1 - O projeto deve ser feito, necessariamente, utilizando Promises
Não pode haver nenhum tipo de código síncrono ou que utilize callbacks.

Você pode trocar a biblioteca utilizada para fazer requisições HTTP, se preferir, mas a biblioteca atual já suporta Promises.

Você também pode utilizar async/await sempre que precisar manipular as Promises. Com isso, não existe a necessidade de consumi-las utilizando then e catch.

Dica: Para entender como utilizar Promises ao invés de callbacks com o superagent, você pode consultar a documentação oficial no npm.

2 - Exibir, no menu inicial, o sub-menu "livros" e, dentro dele, uma opção "Pesquisar livros"
Ao selecionar essa opção, permita que o usuário insira o nome do livro que deseja pesquisar.

Dica: Você pode seguir a mesma estrutura já existente para o menu de personagens, presente na pasta lib/menus/characters.

3 - Utilizando o nome inserido, realizar uma requisição para o endpoint /books da API, com o parâmetro ?name contendo o nome digitado pelo usuário e apresentar os resultados para o usuário numa lista
Você pode consultar a documentação deste endpoint para verificar qual o formato em que os dados serão retornados.

A lista deve exibir apenas o nome do livro, e deve permitir que o usuário escolha um dos livros sobre o qual deseja ver os detalhes.

Dica: Para realizar a busca utilizando o nome informado pelo usuário, você precisa enviar para a API o parâmetro name na URL, como o exemplo a seguir: https://www.anapioficeandfire.com/api/books?name=A Game of Thrones

4 - Caso nada seja digitado no momento da pesquisa, exiba todos os livros, paginados de 10 em 10
Quando o CLI solicitar o nome do livro que a pessoa deseja pesquisar, existe a possibilidade de nada ser digitado. Nesse caso, a busca deve ser feita com o parâmetro ?name em branco (?name=), para que a API retorne todos os livros.

5 - Apresentar as opções "Próxima página" e "Página anterior" caso existam mais de 10 resultados
Ambas as opções só devem ser exibidas quando de fato forem úteis, ou seja, se o usuário já estiver na primeira página, a opção "Página anterior" não deve ser exibida e, se o usuário já estiver na última página, a opção "Próxima página" não deve ser exibida.

Para entender como a paginação funciona, leia a documentação da API.

Você precisará ler o conteúdo do header link, retornado pela API quando utiliza-se paginação. O arquivo lib/utils.js já possui uma função (parseLinks) que realiza a leitura desse header e o converte de string para um objeto. O arquivo lib/menus/characters/actions/list.js já faz a implementação desse requisito, você pode utiliza-lo como referência.

6 - Quando o um livro for selecionado, exibir na tela as propriedades daquele livro
Atenção: As propriedades characters e povCharacters não deverão ser exibidas.

Essa exibição deve ocorrer da mesma forma que ocorre com a personagem no menu "Personagens".

Após exibir os detalhes do livro, a aplicação deve retornar para a tela de resultados de livros.

7 - Sempre exibir uma opção de voltar
Em todos os menus, uma opção de "voltar" deve ser exibida. Essa opção deve levar o usuário para o menu anterior e, através dela, deve ser possível chegar de volta ao menu principal.

8 - Caso nenhum resultado for encontrado, exibir uma mensagem e voltar ao menu de livros
A API realiza a busca por palavras exatas no valor informado no parâmetro name. Caso seja informado um livro que não existe, a API retornará um Array vazio.

Para esses casos, exiba na tela a mensagem "Nenhum livro encontrado para essa pesquisa" e, logo em seguida, retorne ao menu de livros

9 - Exibir opção de listar as casas do mundo de Game of Thrones
Exibir, no menu principal, um menu "casas" e, dentro dele, uma opção "Listar casas".

O comportamento deve ser idêntico ao de listar personagens, inclusive a paginação, que deve atender ao requisito 5.

Atenção A propriedade swornMembers não deve ser exibida ao selecionar uma casa.

Bônus
10 - Implemente testes unitários que cubram 90% do código
Instruções para entregar seu projeto:
ANTES DE COMEÇAR A DESENVOLVER:
Clone o repositório
git clone git@github.com:betrybe/sd-0x-a-cli-of-ice-and-fire.git.
Entre na pasta do repositório que você acabou de clonar:
cd sd-0x-a-cli-of-ice-and-fire
Instale as dependências
npm install
Crie uma branch a partir da branch master
Verifique que você está na branch master
Exemplo: git branch
Se não estiver, mude para a branch master
Exemplo: git checkout master
Agora crie uma branch à qual você vai submeter os commits do seu projeto
Você deve criar uma branch no seguinte formato: nome-de-usuario-nome-do-projeto
Exemplo: git checkout -b joaozinho-a-cli-of-ice-and-fire
Para cada menu novo que você adicionar, crie um diretório dentro de lib/menus, e adicione os arquivos do menu lá. Por exemplo, crie um menu books e adicione-o ao index da pasta menus:
mkdir lib/menus/books
touch lib/menus/books/index.js
module.exports = function () {
  console.log('Menu de livros');
};
// lib/menus/index.js
const books = require('./books');
const characters = require('./characters');

module.exports = {
  books,
  characters,
};
Adicione as mudanças ao stage do Git e faça um commit
Verifique que as mudanças ainda não estão no stage
Exemplo: git status (deve aparecer listado o arquivo lib/menus/books.js em vermelho)
Adicione o arquivo alterado ao stage do Git
Exemplo:
git add . (adicionando todas as mudanças - que estavam em vermelho - ao stage do Git)
git status (deve aparecer listado o arquivo src/last.js em verde)
Faça o commit inicial
Exemplo:
git commit -m 'iniciando o projeto A CLI of Ice and Fire' (fazendo o primeiro commit)
git status (deve aparecer uma mensagem tipo nothing to commit )
Adicione a sua branch com o novo commit ao repositório remoto
Usando o exemplo anterior: git push -u origin joaozinho-a-cli-of-ice-and-fire
Crie um novo Pull Request (PR)
Vá até a página de Pull Requests do repositório no GitHub
Clique no botão verde "New pull request"
Clique na caixa de seleção "Compare" e escolha a sua branch com atenção
Clique no botão verde "Create pull request"
Adicione uma descrição para o Pull Request e clique no botão verde "Create pull request"
Não se preocupe em preencher mais nada por enquanto!
Volte até a página de Pull Requests do repositório e confira que o seu Pull Request está criado
DURANTE O DESENVOLVIMENTO
Faça commits das alterações que você fizer no código regularmente

Lembre-se de sempre após um (ou alguns) commits atualizar o repositório remoto

Os comandos que você utilizará com mais frequência são:

git status (para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)
git add (para adicionar arquivos ao stage do Git)
git commit (para criar um commit com os arquivos que estão no stage do Git)
git push -u nome-da-branch (para enviar o commit para o repositório remoto na primeira vez que fizer o push de uma nova branch)
git push (para enviar o commit para o repositório remoto após o passo anterior)
DEPOIS DE TERMINAR O DESENVOLVIMENTO
Para "entregar" seu projeto, siga os passos a seguir:

Vá até a página DO SEU Pull Request, adicione a label de "code-review" e marque seus colegas
No menu à direita, clique no link "Labels" e escolha a label code-review
No menu à direita, clique no link "Assignees" e escolha o seu usuário
No menu à direita, clique no link "Reviewers" e digite students, selecione o time tryber/students-sd-0x
Se ainda houver alguma dúvida sobre como entregar seu projeto, aqui tem um video explicativo.

REVISANDO UM PULL REQUEST
⚠⚠⚠

À medida que você e os outros alunos forem entregando os projetos, vocês serão alertados via Slack para também fazer a revisão dos Pull Requests dos seus colegas. Fiquem atentos às mensagens do "Pull Reminders" no Slack!

Use o material que você já viu sobre Code Review para te ajudar a revisar os projetos que chegaram para você.