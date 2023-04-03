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

![img.png](.github%2Fimg.png)
![img_1.png](.github%2Fimg_1.png)
![img_2.png](.github%2Fimg_2.png)
![img_3.png](.github%2Fimg_3.png)
![img_4.png](.github%2Fimg_4.png)
![img_5.png](.github%2Fimg_5.png)
![img_6.png](.github%2Fimg_6.png)
![img_7.png](.github%2Fimg_7.png)
![img_8.png](.github%2Fimg_8.png)
![img_9.png](.github%2Fimg_9.png)

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

- **`POST /category`**: Rota para criar categoria

Enviar:
```
{
   "name": "test API"
}
```

Retorna:
```
{
   "id":"97587e96-fa58-48d2-acb7-9f2b27a0064f",
   "name":"analog"
}
```

- **`POST /category/change`**: Rota para alterar categoria

Enviar:
```
{
   "id": "42153792-2d54-4159-99e6-d09b0c419b2f",
   "name": "test API change"
}
```

Retorna:
```
{
   "id": "42153792-2d54-4159-99e6-d09b0c419b2f",
   "name": "test API change"
}
```

- **`POST /category/delete`**: Rota para deletar categoria

Enviar:
```
{
   "id": "ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9"
}
```

Retorna:
```
{
   "msg": "Category ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9 remove"
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

- **`POST /client`**: Rota para criar cliente

enviar:
```
{
   "name": "Client test",
    "birthDate": "2002-09-07T13:17:48.098Z",
    "address": "Dickens Mall, 9551 Georgetown = IN",
    "gender": "male",
}
```

Retorna:
```
{
   "id":"1f671f49-0e3f-442e-b764-f0a4222b5a3e",
   "name": "Client test",
   "birthDate": "2002-09-07T13:17:48.098Z",
   "address": "Dickens Mall, 9551 Georgetown = IN",
   "gender": "male",
}
```

- **`POST /client/change`**: Rota para alterar cliente

enviar:
```
{
    "id": "1f671f49-0e3f-442e-b764-f0a4222b5a3e",
    "name": "Client test change",
    "birthDate": "2002-09-07T13:17:48.098Z",
    "address": "Dickens Mall, 9551 Georgetown = IN change",
    "gender": "male",
}
```

Retorna:
```
{
    "id": "1f671f49-0e3f-442e-b764-f0a4222b5a3e",
    "name": "Client test change",
    "birthDate": "2002-09-07T13:17:48.098Z",
    "address": "Dickens Mall, 9551 Georgetown = IN change",
    "gender": "male",
}
```

- **`POST /client/delete`**: Rota para excluir cliente

enviar:
```
{
    "id": "1f671f49-0e3f-442e-b764-f0a4222b5a3e",
}
```

Retorna:
```
{
    "msg": "Client 1f671f49-0e3f-442e-b764-f0a4222b5a3e remove",
}
```

- **`GET /tapes`**: Rota para retornar todas as fitas

Retorna:
```
{
    [
       {
          "id":"3f651fb7-aa33-4d3a-ba7a-6178d7a1df36",
          "color":"lime",
          "movieId":"a6e634fd-1c79-4062-9d4b-61ead6cf2b8c"
       },
       {
          "id":"404c8449-ba84-45ae-b0cc-f1c182e1be9f",
          "color":"white",
          "movieId":"0bac0382-9823-4450-b3ad-e573e0c40f74"
       },
       {
          "id":"9593311a-080e-46ad-8f0b-0433f1dabd94",
          "color":"red",
          "movieId":"fda3e16a-2e6e-41fb-8368-3dba38372eda"
       }
    ]
}
```

- **`GET /tape?id`**: Rota para retornar fita por ID

Retorna:
```
{
   "id":"150e9058-0281-4608-bcf4-98fa7aecdfcc",
   "color":"magenta",
   "movieId":"e515aaae-ffc5-4e90-9c5a-f1f6ceeca79d"
}
```

- **`GET /tape?color`**: Rota para retornar fita por cor

Retorna:
```
{
   "id":"150e9058-0281-4608-bcf4-98fa7aecdfcc",
   "color":"magenta",
   "movieId":"e515aaae-ffc5-4e90-9c5a-f1f6ceeca79d"
}
```

- **`GET /tape?moveId`**: Rota para retornar fita por movieID

Retorna:
```
{
    [
       {
          "id":"3f651fb7-aa33-4d3a-ba7a-6178d7a1df36",
          "color":"lime",
          "movieId":"a6e634fd-1c79-4062-9d4b-61ead6cf2b8c"
       },
       {
          "id":"d937e217-f7e3-45ef-8933-babcd079102b",
          "color":"gold",
          "movieId":"a6e634fd-1c79-4062-9d4b-61ead6cf2b8c"
       },
       {
          "id":"a7aef042-5810-4323-881e-731ad7f98743",
          "color":"cyan",
          "movieId":"a6e634fd-1c79-4062-9d4b-61ead6cf2b8c"
       }
    ]
}
```

- **`GET /tape/random?moveId`**: Rota para retornar fita aleatoria por movieID

Retorna:
```
{
  "id":"d937e217-f7e3-45ef-8933-babcd079102b",
  "color":"gold",
  "movieId":"a6e634fd-1c79-4062-9d4b-61ead6cf2b8c"
}
```

- **`POST /tape`**: Rota para criar fita

enviar:
```
{
  "color": "blue",
  "movieId": "7e5c8719-313f-445b-83d9-21d1ecf78b91",
}
```

Retorna:
```
{
  "id":"d937e217-f7e3-45ef-8933-babcd079102b",
  "color": "blue",
  "movieId": "7e5c8719-313f-445b-83d9-21d1ecf78b91",
}
```

- **`POST /tape/delete`**: Rota para deletar fita

enviar:
```
{
  "id":"d937e217-f7e3-45ef-8933-babcd079102b",
}
```

Retorna:
```
{
  "msg": "Tape d937e217-f7e3-45ef-8933-babcd079102b remove",
}
```

- **`GET /moveis`**: Rota para retornar todos os filmes

Retorna:
```
{
    [
       {
          "id":"22ac54f3-77a7-4dbc-80fe-2c695a0f48ca",
          "name":"talkative driver blanditiis index solidly",
          "description":"Goodyear customized Architect Sports Program kelvin Total redundant Tunnel withdrawal",
          "categoryId":"ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
          "year":2002,
          "classification":0
       },
       {
          "id":"7e5c8719-313f-445b-83d9-21d1ecf78b91",
          "name":"motivating Pants Neon squiggly compelling",
          "description":"up Passenger white Borders Sioux partially white unexpectedly Central drive",
          "categoryId":"06a7b337-18dc-4690-a12b-911b01937376",
          "year":1977,
          "classification":0
       },
       {
          "id":"e841e9fc-a1f3-4cbf-aed7-cd4fdd4d59ae",
          "name":"asynchronous or South for more",
          "description":"female Cisgender optical Skyway optimize Analyst tepid empower not invoice",
          "categoryId":"ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
          "year":1956,
          "classification":18
       },
       {
          "id":"ea99a7c7-7932-4dc9-ae8d-b601d84961dd",
          "name":"Southwest which Berkshire Toyota untimely",
          "description":"Bicycle quod Delaware Southeast Sunrise actuating Lead Southwest up Female",
          "categoryId":"ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
          "year":1979,
          "classification":16
       }
    ]
}
```

- **`GET /movie?id`**: Rota para retornar filme por ID

Retorna:
```
{
   "id":"8186123a-aaa3-414e-a1f6-8888e2cee196",
   "name":"female Bespoke Executive Cambridgeshire urge",
   "description":"Israeli concept provided woman structure Sports Place programming loom leverage",
   "categoryId":"42153792-2d54-4159-99e6-d09b0c419b2f",
   "year":1987,
   "classification":16
}
```

- **`GET /movie?categoryId`**: Rota para retornar filme por categoryId

Retorna:
```
[
   {
      "id":"22ac54f3-77a7-4dbc-80fe-2c695a0f48ca",
      "name":"talkative driver blanditiis index solidly",
      "description":"Goodyear customized Architect Sports Program kelvin Total redundant Tunnel withdrawal",
      "categoryId":"ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
      "year":2002,
      "classification":0
   },
   {
      "id":"e841e9fc-a1f3-4cbf-aed7-cd4fdd4d59ae",
      "name":"asynchronous or South for more",
      "description":"female Cisgender optical Skyway optimize Analyst tepid empower not invoice",
      "categoryId":"ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
      "year":1956,
      "classification":18
   }
]
```

- **`GET /movie?classification`**: Rota para retornar filme por classificação indicativa

Retorna:
```
[
   {
      "id":"53937ec5-7c09-40af-af96-c9a4ff1f19df",
      "name":"Stanford cohesive Hybrid program frantically",
      "description":"Luxurious withdrawal experiences payment Chrysler red Country transmitter gadzooks Kids",
      "categoryId":"06a7b337-18dc-4690-a12b-911b01937376",
      "year":1980,
      "classification":12
   },
   {
      "id":"8c13f2b6-3947-41b9-8264-f19f6f88a4c5",
      "name":"explicit bypass midst synthesizing 1080p",
      "description":"Diesel Montana East Ferrari Blues Northeast SMTP Evanston male Card",
      "categoryId":"ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
      "year":1987,
      "classification":12
   },
   {
      "id":"e515aaae-ffc5-4e90-9c5a-f1f6ceeca79d",
      "name":"eos Devolved Electric Frozen yahoo",
      "description":"Northwest Tanzania for wireless enterprise whereas male mindless fooey model",
      "categoryId":"06a7b337-18dc-4690-a12b-911b01937376",
      "year":2002,
      "classification":12
   },
   {
      "id":"fbd8877a-470f-434d-8c17-db8638078b2e",
      "name":"withdrawal hacking second Forint Beauty",
      "description":"indigo Minnesota Bicycle back Southeast villainous error matrix Human North",
      "categoryId":"97587e96-fa58-48d2-acb7-9f2b27a0064f",
      "year":2017,
      "classification":12
   }
]
```

- **`GET /movie?years`**: Rota para retornar filme por classificação indicativa (formato years=1997-2010)

Retorna:
```
[
   {
      "id":"22ac54f3-77a7-4dbc-80fe-2c695a0f48ca",
      "name":"talkative driver blanditiis index solidly",
      "description":"Goodyear customized Architect Sports Program kelvin Total redundant Tunnel withdrawal",
      "categoryId":"ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
      "year":2002,
      "classification":0
   },
   {
      "id":"9fdecb96-bbec-46f7-bfc3-ded2ac16d54b",
      "name":"Palladium Operations Director Fresh Administrator",
      "description":"Pound Northeast throughout sequence hm radian excepturi wireless Dominican orange",
      "categoryId":"06a7b337-18dc-4690-a12b-911b01937376",
      "year":2009,
      "classification":16
   }
]
```

- **`GET /movie?name`**: Rota para retornar filmes por uma parte do nome

Retorna:
```
[
   {
      "id":"e841e9fc-a1f3-4cbf-aed7-cd4fdd4d59ae",
      "name":"asynchronous or South for more",
      "description":"female Cisgender optical Skyway optimize Analyst tepid empower not invoice",
      "categoryId":"ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
      "year":1956,
      "classification":18
   },
   {
      "id":"ea99a7c7-7932-4dc9-ae8d-b601d84961dd",
      "name":"Southwest which Berkshire Toyota untimely",
      "description":"Bicycle quod Delaware Southeast Sunrise actuating Lead Southwest up Female",
      "categoryId":"ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
      "year":1979,
      "classification":16
   }
]
```

- **`GET /movie?description`**: Rota para retornar filmes por uma parte da descrição

Retorna:
```
[
   {
      "id":"ea99a7c7-7932-4dc9-ae8d-b601d84961dd",
      "name":"Southwest which Berkshire Toyota untimely",
      "description":"Bicycle quod Delaware Southeast Sunrise actuating Lead Southwest up Female",
      "categoryId":"ec1130eb-bcc2-4d87-bd4d-281c9f9e59a9",
      "year":1979,
      "classification":16
   },
   {
      "id":"8021a7c6-6bd9-44fa-a8cb-3ad6e60c35d8",
      "name":"implement World calculate char dynamic",
      "description":"South Card West Northeast Copper twine nor Quality navigating yellow",
      "categoryId":"42153792-2d54-4159-99e6-d09b0c419b2f",
      "year":2001,
      "classification":16
   }
]
```

- **`POST /movie`**: Rota para criar filme

enviar:
```
{
    "name":"name test",
    "description":"description test",
    "categoryId":"077968ee-fd43-4286-84d3-6bb5604811f0",
    "year":1559,
    "classification":0
}
```

Retorna:
```
{
    "id":"1f671f49-0e3f-442e-b764-f0a4222b5a3e",
    "name":"name test",
    "description":"description test",
    "categoryId":"077968ee-fd43-4286-84d3-6bb5604811f0",
    "year":1559,
    "classification":0
}
```

- **`POST /movie/change`**: Rota para alterar filme

enviar:
```
{
    "id":"ea99a7c7-7932-4dc9-ae8d-b601d84961dd",
    "name":"West white Solutions blue Albuquerque",
    "description":"East programming man Keyboard woefully experiences though Islands Manager yippee",
    "categoryId":"06a7b337-18dc-4690-a12b-911b01937376",
    "year":1997,
    "classification":16
}
```

Retorna:
```
{
    "id":"ea99a7c7-7932-4dc9-ae8d-b601d84961dd",
    "name":"West white Solutions blue Albuquerque change",
    "description":"East programming man Keyboard woefully experiences though Islands Manager yippee change",
    "categoryId":"06a7b337-18dc-4690-a12b-911b01937376",
    "year":1996,
    "classification":16
}
```

- **`POST /movie/delete`**: Rota para excluir filme

enviar:
```
{
    "id": "1f671f49-0e3f-442e-b764-f0a4222b5a3e",
}
```

Retorna:
```
{
    "msg": "Movie 1f671f49-0e3f-442e-b764-f0a4222b5a3e remove",
}
```

- **`POST /rental`**: Rota para criar um aluguel de fita

enviar:
```
{
    "clientId": "8591436b-669b-4d4e-a58d-ebef5753383f",
    "movies": [
        "e841e9fc-a1f3-4cbf-aed7-cd4fdd4d59ae",
        "9c85295f-e021-4f00-9a78-e575ae08c451",
    ],
}
```

Retorna:
```
{
   "id":"fea5fe95-ded3-4bdc-aef0-eba057218a55",
   "tapeId":[
      "5f190ef2-9a44-43b0-9ddd-01ed19a6943e",
      "995c94fb-d67a-4b06-8331-e88bfbda93fd"
   ],
   "clientId":"8591436b-669b-4d4e-a58d-ebef5753383f",
   "startDate":"2023-03-31T13:11:12.000Z",
   "endDate":"2023-04-03T13:11:12.000Z",
   "amount":"8.00",
   "isRent":true
}
```

- **`POST /rental/finalize`**: Rota para finalizar um aluguel de fita

enviar:
```
{
    "id": "a01c1176-04d4-4436-9e94-0871424946bc"
}
```

Retorna:
```
{
   "id":"fea5fe95-ded3-4bdc-aef0-eba057218a55",
   "tapeId":[
      "5f190ef2-9a44-43b0-9ddd-01ed19a6943e",
      "995c94fb-d67a-4b06-8331-e88bfbda93fd"
   ],
   "clientId":"8591436b-669b-4d4e-a58d-ebef5753383f",
   "startDate":"2023-03-31T13:11:12.000Z",
   "endDate":"2023-04-03T13:11:12.000Z",
   "amount":"8.00",
   "isRent":false
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