// ***** API DESENVOLVIDA PARA TESTE DE VAGA DE ESTÁGIO/DEV JR. ***** //
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()


const port = process.env.PORT   //declarando qual porta sera usada
const dbUser = process.env.DBUSERNAME //usuario do db
const dbPass = process.env.DBPASSWORD //senha do db

// configuração para conseguir utilizar json na aplicação
app.use(express.urlencoded({
    extended:true,
}),)
app.use(express.json())


//tudo que chegar como /task/? sera direcionado para este router 
const taskRoutes = require('./routes/tasks');
app.use('/task',taskRoutes);

//////conexão com o banco de dados

const connectionURI = `mongodb+srv://${dbUser}:${dbPass}@devtest.2excnhd.mongodb.net/?retryWrites=true&w=majority`

//como a conexão do moongose funciona com promisses utilizei .then 
//para sómente rodar a aplicação caso consiga a conexão
mongoose.connect(connectionURI).then(()=>{
    
    //entregando porta a ser escutada :)
    app.listen(port,()=>{
        console.log(`seu app está rodando na porta ${port}`);
        console.log('conectado ao mongodb');
    })
}).catch((error)=>console.log(error))


