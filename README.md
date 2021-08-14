# Azeplast - Teste de desenvolvimento

Aplicação construida com:

- Next.js:
   - React + Tailwind + Chart.js (Front End)
   - Node.js + Express nativo (Back end) 
   - Vercel (Ambiente de produção)
 

## Acesso

Pode ser acessado diretamente em ambiente de produção no link:
[Azeplast](https://teste-azeplast.vercel.app/)

## Ambiente de desenvolvimento
Para acesso em ambiente de desenvolvimento, consta apenas clonar o repositório e alterar o link das requisições para localhost 
```python
#Instala as dependencias o package.json
npm i

#Roda o ambiente de desenvolvimento na porta 3000
npm run dev

## Link de produção
[Vercel](https://teste-azeplast.vercel.app/)
```
## Documentação
- Pegar os tipos de produtos e suas quantias
```bash
https://teste-azeplast.vercel.app/api/productsTypes
```

- Pegar toda a lista de produtos
```bash
https://teste-azeplast.vercel.app/api/products
```

- Pegar produtos baseados no tipo
```bash
https://teste-azeplast.vercel.app/api/products?type={{tipo do produto}}
```
