# myretail-api

## Installing
```sh
$ npm i
```

## Running in debug mode
```sh
$ npm run debug
```

## Running in production mode
```sh
$ npm start
```

## Endpoints

Get details about a product: `GET /products/v1/:sku`

**Example**
```sh
$ curl localhost:3000/products/v1/13860428 | jq
```

Set a product's price: `PUT /products/v1/:sku/price`

**Example**
```sh
$ curl -X PUT localhost:3000/products/v1/13860428/price -d '{ "currentPrice": "20.00" }' -H "Content-Type: application/json" | jq
```
