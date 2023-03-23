<p align="center">
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
  <a href="#-como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-rotas">Rotas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-story">Storyr</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;
  </p>
<br>

# JavaScript Expert - Modulo II - Javascript testing - Aula 05 - TDD project.

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Npm](https://www.npmjs.com/) - 9.5.0
- [NodeJS](https://nodejs.org/en/) - v19.7.0

## 💻 Projeto

Esse projeto é para treinar testes TDD.

Testes:
![img.png](.github%2Fimg.png)

Coverage:
![img_1.png](.github%2Fimg_1.png)
![img_2.png](.github%2Fimg_2.png)

## 🚀 Como Rodar

- Clone o projeto.
- Execute `npm install`.
- Entre na pasta src.
- Execute `npm run test`

## ↗ Rotas

- **`GET /`**: Rota default

Retorna:
```
{
    msg: 'Hello World!'
}
```

- **`GET /car/?categoryId`**: Rota para pegar um carro disponivel randomicamente
  

Envia:
```
{
    categoryId: "f5d825ca-d075-4b58-80f1-face110b586b"
}
```

Retorna:
```
{
    "id": "5ecafd11-792f-4580-8878-0856ff5749c2",
    "name":"Countach",
    "releaseYear":2022,
    "available":true,
    "gasAvailable":true
}
```

- **`POST /rent`**: Rota para gerar o aluguel

Envia:
```
{
  carId: '5ecafd11-792f-4580-8878-0856ff5749c2',
  custumerId: 'd465398a-b458-43b1-aae9-a5a795d5a997',
  dateInit: '2023-03-14T23:22:24.193Z',
  dateFinish: '2023-03-16T23:22:24.193Z'
}
```

Retorna:
```
{
   "customer":{
      "id":"d465398a-b458-43b1-aae9-a5a795d5a997",
      "name":"Andrew Wilkinson",
      "age":34
   },
   "car":{
      "id":"5ecafd11-792f-4580-8878-0856ff5749c2",
      "name":"Countach",
      "releaseYear":2022,
      "available":true,
      "gasAvailable":true
   },
   "amount":"R$ 133,38",
   "dueDate":"16 de março de 2023"
}
```

- **`GET /customers`**: Rota para retornar todos os clientes

Retorna:
```
[
    {
        "id":"1c006be8-f900-48e5-845d-6db43edc15be",
        "name":"Lillian Grant",
        "age":35
    },
    {
        "id":"4f59be7b-29c2-48a4-8671-113cdf6edc6d",
        "name":"Jorge Ratke",
        "age":24
    },
    {
        "id":"d465398a-b458-43b1-aae9-a5a795d5a997",
        "name":"Andrew Wilkinson",
        "age":34
    }
]
```

- **`GET /customers?customerId`**: Rota para retornar um cliente especifico por ID

Retorna:
```
{
    "id":"4f59be7b-29c2-48a4-8671-113cdf6edc6d",
    "name":"Jorge Ratke",
    "age":24
}
```

- **`GET /cars`**: Rota para retornar todos os carros

Retorna:
```
[
    {
        id: '25b1d2f7-776b-4bb1-a26c-532fc15f75b5',
        name: 'A8',
        releaseYear: 2023,
        available: true,
        gasAvailable: true
    },
    {
        id: 'c059c78b-5523-415e-afa7-2f4ebb2dd585',
        name: 'Grand Cherokee',
        releaseYear: 2022,
        available: true,
        gasAvailable: true
    }
]
```

- **`GET /car?cardId`**: Rota para retornar um carro especifico por ID

Retorna:
```
{
    "id": "5ecafd11-792f-4580-8878-0856ff5749c2",
    "name":"Countach",
    "releaseYear":2022,
    "available":true,
    "gasAvailable":true
}
```

## 📖 Story: Alugar um carro

#### Caso de Uso 01

Como usuário do sistema

Para obter um carro disponível em uma categoria específica

Dada uma categoria de carro contendo 3 carros diferentes

Quando verifico se há um carro disponível

Então ele deve escolher aleatoriamente um carro da categoria escolhida

#### Caso de Uso 02

Como usuário do sistema

Para calcular o preço final do aluguel

Dado um cliente que deseja alugar um carro por 5 dias

E ele tem 50 anos

Quando ele escolhe uma categoria de carro que custa US$ 37,6 por dia

Então devo adicionar o imposto de sua idade que é de 30% ao preço da categoria do carro

Então a fórmula final será `((preço por dia * Imposto) * número de dias)`

E o resultado final será `((37.6 * 1.3) * 5)= 244.4`

E o preço final será impresso em português do Brasil como "R$ 244,40"

#### Caso de Uso 03

Como usuário do sistema

Para registrar uma transação de aluguel

Dado um cliente registrado com 50 anos

E um modelo de carro que custa US$ 37,6 por dia

E uma data de entrega que é de 05 dias atrás

E dada uma data real 11/05/2020

Quando alugo um carro devo ver os dados do cliente

E o carro selecionado

E o preço final que será de R$ 244,40

E DueDate que será impresso no formato português do Brasil "10 de novembro de 2020"

## 🤔 Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝 Licença

Esse projeto está sob a licença MIT.

