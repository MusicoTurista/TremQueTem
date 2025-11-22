export function part1(tipo: string) {
    return `Gere uma receita ${tipo} que utilize apenas: `
}

export function part2() {
    return "A receita pode conter APENAS os ingredientes pedidos e nada além deles\nEla pode conter, ainda que não obrigatorio: "
}

export function part3() {
    return "\n Precisa ser livre de: "
}

export function part4() {
    return `
Responda APENAS com um JSON válido.
Nada de explicações.
Ela deve ser entregue em modelo JSON seguindo o padrão:
"nome_receita": "", //Nome 
    "descricao": "", //Descrição da receira
    "dificuldade": "", //Dificuldade de preparo
    "tempo_preparo": "", //Tempo de preparo
    "ingredientes": [
        {
            "nome": "", //Nome o ingrediente /
            "quantidade": "", //Quantidade A ser Usada
            "unidade": "", //Unidade, Xicara, Colher
            "nota": "" //Obsercação sobre o ingrediente, ex: "Cerca de 250g, descascadas e picadas" Conversão de xicaras para Ml ou Gramas
        }
    ],
    "modo_preparo": [
        {
            "passo": "", //Numero do passo
            "titulo": "", //Titulo do passo, ex: Prepare a ...:, "Homogeneizar:, "Assar"
            "instrucao": "" //Intrução sobre como fazer o passo
        }
    ],
    "nota_importante": "", //Observação sobre a receita, que possa sar importante, dizendo sobre a restrição que foi necessaria para cumprir a necessidade da receita, e o que isso pode causar /
    "alteracao": ""  //possivel alteração para melhorar a receita, como adicionar fermento ou açucar
}`
}
