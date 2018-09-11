const functions = require('firebase-functions');
const admin = require('firebase-admin');

// busca os dados no firebase 
admin.initializeApp(functions.config().firebase);

// implementacao da funcao 

exports.onTaskCreate = functions // criando funcao ontaskcreat 
    .database // funcionalidade que vai desparar a funcao 
    .ref('tasks/{taskId}')    // referencia da tabela  
    .onCreate((snapshot, context) => {  // vai escuta somente a criacao na tabela, snapshot "momento que eu criei um registo imagem do banco, context qual o no e o parametro exemplo"
        
    // aqui esta a logica da funcao 

        const json = snapshot.val();        // transforma o snapshot em um objeto 
                                            // objeto anonimo tem propiedades, valores... mas voce nao sabe o tipo do objeto por que ele e anonymo
        const key = context.params.taskId;  // chave do objeto. outro elemento que vamos precisa, se fomos na tabela no firebase "chave LJVVEYGBaK9898"
                                            // id vem no nó da estrutura da tabela. precisamos dele para que podemos replicar la no log
        const newObj = {
            createdAt: context.timestamp   // cria objeto com time stamp
        };

        const log = Object.assign(newObj, json, n= 1234); // funcao java script baseado no json ira cria um novo objeto com a mesma caracteristica ou criar novas propiedades
            // objete.assign ira cria novos dados na tabela com o timestamp + json 
        
        // const algo = "/logs/"+ key;    
        // vai incluir novo nó com o nome de logs.. logs e um espelho no tasks, porem a diferenca e que tem o timestamp 
        return admin
            .database()
            .ref(`/logs/${key}`) // novo no que vai receber como parametro nossa chave 
            .set(log);
                                // para fazer o dplou dessa funcao firebase deploy --only functions
    });


