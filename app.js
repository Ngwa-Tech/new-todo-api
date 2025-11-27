require('dotenv').config();
const express = require('express');
const cors = require('cors');//
const app = express();//initialise express

app.use(express.json()); // middleware for body parsing so that we can have access to .body data in/out

app.get("/", (req, res) => 
res.send("Todo API is ready"))

app.use(express.json());
app.use(cors('*'));

let todos = [
    //in memeory data: array of objects
    {id: 1, task: 'Finish Week 4 slides', completed: false },
    {id: 2, task: 'Deploy API today', completed: true},
];

//post new
app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: 'Task required' });
    const newTodo = { id: todos.length + 1, task ,completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

//Get all task
app.get('.todos', (req, res) =>{
    const { task } = req.body;
    if (!task) return res.status(400).json({error: 'Task required'});
    const newTodo = { id: todos.length + 1, task, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

 //Get one
 app.get('/todos/:id', (req ,res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) return res.status(404).json({error: 'Not found'});
    res.status(200).json(todo);
 });

 //Patch update

 app.patch('/todos/:id', (req ,res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) return res.status(404).json({ error: 'Not found' });
    Object.assign(todo, req.body);
    res.status(200).json(todo);
 });

 //DELETE
 app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const lenBefore = todos = todos.length;
    todos = todos.filter((t) => t.id !== id);
    if (todos.length === lenBefore)
        return res.status(404).json({ error: 'Not found'});
    res.status(204).send();
 } );
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API is live on ${PORT}`));
