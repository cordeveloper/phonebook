var express = require('express')
var cors = require('cors')
var app = express();


app.use(cors());
app.use(express.json());



let phonebook = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
];


app.get('/api/persons', (request, response)=>{
    response.json(phonebook);
});

app.get('/api/persons/:id', (request, response) => {
    const params = Number(request.params.id);
}); 

app.delete('/api/persons/:id', (request, response) => {
    const params = parseInt(request.params.id);
    const deleted = phonebook.filter(entry => entry.id !== params);

    phonebook = deleted;

    response.json(deleted);
});

app.put('/api/persons/:id', (request, response) => {
    const params = parseInt(request.params.id);
    const data = request.body;

    let foundIndex = phonebook.findIndex( entry => entry.id === params);

    if(foundIndex !== -1) {
        phonebook[foundIndex].number = data.number;
        response.json(phonebook);
    }
});

app.post('/api/persons/', (request, response) => {
    const id = Math.floor(Math.random() * (1000 - 0)) + 0;
    let person = request.body;
    person.id = id;
    phonebook = [...phonebook, person]; 
    response.json(person);
});

app.use( (request, response) => {
    response.status(404).json({
        error: 'not found'
    })
} )

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})