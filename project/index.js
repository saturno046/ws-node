// biblioteca exoress
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const tasks = []; // array vazio

app.post('/tasks', (request, response) => { // quer mapear o task

    const { body } = request; // utilizando {} se tranforma em destruct object.. forma reduzida de request.body
   
    const task = {

        id: Math.random().toString().replace('0.', ''), // gerar numero randomico "math"
        title: body.title, 
        resume: body.resume,
        isDone: body.isDone,
        isPriority: body.isPriority

    }; // simulado o banco de dados 

    tasks.push(task); // insere novo registro no array vazio
    response.status(201);
    response.send(task);
}); 

//  o '/' solicitando o root, endereco principal do servico https://localhost:3030 
app.get('/tasks', (request, response) => { // => arom function
    response.send(tasks);  
});  

app.get('/tasks/:taskId', (request, response) => {

    const task = tasks.filter(t => t.id === request.params.taskId);

    if(task) {
        response.send(task);
    }else{
        response.status(404);
        response.send();
    }
});

app.put('/tasks/:taskId', (request, response) => {
    const { body } = request;
    const task = tasks.find(t => t.id == request.params.taskId);
    
    if (task) {
    task.title = body.title;
    task.resume = body.resume;
    task.isDone = body.isDone;
    task.isPriority = body.isPriority;
    response.send(task);
   
    } else {
    response.status(404);
    response.send();
  
    }
   });

   app.delete('/tasks/:taskId', (request, response) => {
    const task = tasks.find(t => t.id == request.params.taskId);
    if (task) {
    tasks.pop(task);
    response.send(task);
    } else {
    response.status(404);
    response.send();
    }
   });

app.listen(3000, () => {
    console.log('server running port 3000');
});