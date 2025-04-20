
``` Server Funcstions```
    1. Registro 
    2. Login
    3. Logout
    4. Adicionar gastos ou renda
    5. Visualizar `` 
    6. Editar ``
    7. Deletar `` 
        #gastos:
            a. Gastos fixos de preços fixos
            b. Gastos fixos de preços váriaveis
            c. Gastos váriados
        #renda:
            a. Renda fixa de valor fixo
            b. Renda fixa de valor váriavel
            c. Renda váriavel

    8. Deletar Conta e Dados

``` Data Struct ```
user->Auth
    ->month/yaer->In(a,b,c)
                ->Out(a,b,c)

user{
    id: ObjectId,
    name: string,
    email: string,
    password: string
}

[userId-month-yaer]{
    In: Renda[],
    Out: Gastos[],
    total: number

}

preset{
    Ins,
    Outs
}