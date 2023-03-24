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

Retorna:
```
{
    msg: "404 - Essa rota não existe."
}
```

- **`GET /categories`**: Rota para retornar todas as categorias

Retorna:
```
{
    [
       {
          "id":"97587e96-fa58-48d2-acb7-9f2b27a0064f",
          "name":"analog"
       },
       {
          "id":"ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
          "name":"overlook"
       },
       {
          "id":"42153792-2d54-4159-99e6-d09b0c419b2f",
          "name":"Baby"
       },
       {
          "id":"06a7b337-18dc-4690-a12-911b01937376",
          "name":"recklessly"
       }
    ]
}
```

- **`GET /category?id`**: Rota para retornar categoria por ID

Retorna:
```
{
   "id":"97587e96-fa58-48d2-acb7-9f2b27a0064f",
   "name":"analog"
}
```

- **`GET /clients`**: Rota para retornar todos os clientes

Retorna:
```
{
    [
       {
          "id":"c90f803b-03b7-4754-89d9-bc0bcad9cd95",
          "name":"Jeannie Hauck",
          "birthDate":"2004-06-09T02:28:28.084Z",
          "address":"Dave Expressway, 98911 Asheville = UT",
          "gender":"female"
       },
       {
          "id":"8591436b-669b-4d4e-a58d-ebef5753383f",
          "name":"Mr. Natalie Kuhlman",
          "birthDate":"2000-10-04T19:13:55.534Z",
          "address":"Mraz Lake, 0289 Hesperia = AZ",
          "gender":"male"
       }
    ]
}
```

- **`GET /client?id`**: Rota para retornar cliente por ID

Retorna:
```
{
   "id":"1f671f49-0e3f-442e-b764-f0a4222b5a3e",
   "name":"Estelle Pacocha",
   "birthDate":"2002-09-07T13:17:48.098Z",
   "address":"Dickens Mall, 9551 Georgetown = IN",
   "gender":"male"
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