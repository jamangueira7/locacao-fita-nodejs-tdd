<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
  <a href="#-como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-rotas">Rotas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-story">Storyr</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;
  </p>
<br>

# Locação de fita

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Npm](https://www.npmjs.com/) - 9.5.0
- [NodeJS](https://nodejs.org/en/) - v19.7.0

## 💻 Projeto

Esse projeto é para treinar testes TDD. Fiz um projeto de locação de fita.

Na criação do banco com as seeds eu usei nomes fakes. Por exemplo as categorias era para serem "ação" "comedia" "drama" mas ficaram com nomes aleatorios. Nomes e descrições dos filmes idem.

## 🚀 Como Rodar

- Clone o projeto.
- Entre na raiz do projeto.
- Execute `npm install`.
- Execute `npm run seed` para criar o banco.
- Execute `npm run test`.

## ↗ Rotas

- **`GET /`**: Rota default

Retorna:826166
```
{
    msg: 'Hello World!'
}
```

## 📖 Story: Alugar uma fita

#### Caso de Uso 01

Como usuário do sistema

Para locar uma fita disponível em um filme específico

Quando verifico se há uma fita disponível

Então ele deve escolher aleatoriamente uma fita do filme escolhido

#### Caso de Uso 2

Como usuário do sistema

Para locar uma fita disponível em um filme específico

Quando o dia da locação for diferente sexta ou sabado e a quantidade de fitas for menor igual a duas, liberar a locação por 1 dias.

#### Caso de Uso 3

Como usuário do sistema

Para locar uma fita disponível em um filme específico

Quando o dia da locação for diferente sexta ou sabado e a quantidade de fitas for maior que duas, liberar a locação por 2 dias.

#### Caso de Uso 04

Como usuário do sistema

Para locar uma fita disponível em um filme específico

Quando o dia da locação for sexta ou sabado e a quantidade de fitas for maior que uma, liberar a locação ate segunda feira meio dia.


#### Caso de Uso 04

Como usuário do sistema

Para locar uma fita disponível em um filme específico

Quando o dia da locação for feita por um cliente com idade menor a indicação do filme, a locação deve ser negada. 


## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝 Licença

Esse projeto está sob a licença MIT.