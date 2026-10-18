const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const produtos = [
    { id: 1, nome: "Teclado mecanico", preco: 150.00},
    {id: 2, nome: "Mouse gamer", preco: 90.00},
    {id: 3, nome: "Monitor", preco: 800.00}
]

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.get('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);

    const produto = produtos.find((p) => p.id === id);

    if(!produto) {
        return res.status(404).json({
            erro: 'Produto não encontrado'
        });
    }
    res.json(produto);
})

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de produtos funcionando!'
    });
});

app.post('/produtos', (req, res) => {
    const {nome, preco} = req.body;

    if (!nome || preco == null) {
        return res.status(400).json({
            erro: 'Nome e preço são onrigatórios'
        });
    }

    const novoProduto = {
        id: produtos.length
        ? Math.max(...produtos.map(p => p.id)) + 1
        :1,
        nome,
        preco: Number(preco)
    };
    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

    app.put('/produtos/:id', (req, res) => {

        const id = Number(req.params.id);
        const produto = produtos.find((p) => p.id === id);

        if (!produto) {
            return res.status(404).json({
                erro: 'Produto não encontrado'
            });
        }
        const { nome, preco} = req.body;

        if (nome !== undefined) produto.nome = nome;
        if (preco !== undefined) produto.preco = Number(preco);

        res.json(produto);
    })

    app.delete('/produtos/:id', (req, res) => {

        const id = Number(req.params.id);
        
        const indice = produtos.findIndex((p) => p.id === id);

        if ( indice === -1) {
        return res.status(404).json({
            erro: 'Produto não encontrado'
        });

        }

        produtos.splice(indice, 1);

        res.status(204).send();

    })


app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
});