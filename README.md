# Cryptocurrencies Monitor wallop
[By Ivan Andres Salazar]

A project in NodeJS + express + mongodb.

#Folder structure:


The first time, you will need to run

```
yarn install
```

Then just start the server with

```
yarn start:dev
```

I am separated this application into 5 different layers

Domain.
```
        -> models

        -> Use cases (services)
```

Api (endpoints definitions)

Events ( actions automatically)
```
        -> coinList: update periodically the list of coins.
        -> currencyList: update periodically the list of currencies.
```

Infrastructure (DbConection).

Middleware  (validations)