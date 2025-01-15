'use strict';

const path = require('path');

const express = require('express');
const app = express();

const { port, host } = require('./config.json');

const Datastorage = require('./storageLayer/dataStorageLayer');
const storage = new Datastorage();

app.set('view engine', 'ejs'); // this example uses static pages, like a php programme
app.set('views', path.join(__dirname, 'pages')); // tells the machine where the ejs pages are

app.use(express.urlencoded({ extended: true })); // how we get the data from the frontend to backend - tells to use urlencoded middleware(in the middle of root and function)
app.use(express.static(path.join(__dirname, 'public')));

const homePath = path.join(__dirname, 'home.html');

app.get('/', (req, res) => res.sendFile(homePath));

app.get('/all', (req, res) => storage.getAll()
    .then(data => res.render('allPersons', { result: data }))
);

app.get('/search', (req, res) => res.render('searchPerson', {
    title: 'Search',
    header: 'Get person',
    action: '/search'
}));

// FORM 2
app.get('/search2', (req, res) => res.render('form2', {
    title: 'Search',
    header: 'Get person',
    action: '/search',
    fields: [
        { label: 'Id', name: 'id', value: '', readonly: '', size: 10 }
    ]
}));

app.post('/search', (req, res) => {
    if (!req.body) {
        return res.statusCode(500);
    }

    const id = req.body.id;
    storage.get(id).then(result => res.render('personPage', { // browser always gets a new page
        title: 'Person',
        header: 'Person data',
        result: result
    }));
});

// ----------------------------------------------
// PAGE IS RENDERED IN THE BACKEND and then send it as static page to the backend, then the page is used as a single page and can be updated!!!
// ----------------------------------------------

app.get('/remove', (req, res) => res.render('searchPerson', {
    title: 'Search to remove',
    header: 'Remove person',
    action: '/remove'
}));
app.post('/remove', (req, res) => {
    if (!req.body) { // body has all the fields from our storage 
        return res.statusCode(500);
    }
    const id = req.body.id;
    storage.remove(id)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error))
    /*   .then(status => res.render('statusPage', {
          title: 'Status',
          header: 'Status',
          status
      })) */
    /*    .catch(error => res.render('statusPage', {
           title: 'Error',
           header: 'Error',
           status: error
       })) */
});

app.get('/inputform', (req, res) => res.render('form', { // get = send data from browser to server
    title: 'Add',
    header: 'Add Person',
    action: '/input',
    id: { value: '', readonly: '' },
    firstname: { value: '', readonly: '' },
    lastname: { value: '', readonly: '' },
    department: { value: '', readonly: '' },
    salary: { value: '', readonly: '' }
}));

app.post('/input', (req, res) => {
    storage.insert(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error))
});

// FORM 2
app.get('/inputform2', (req, res) => res.render('form2', { // get = send data from browser to server
    title: 'Add',
    header: 'Add Person',
    action: '/input',
    fields: [
        { label: 'Id', name: 'id', value: '', readonly: '', size: 10 },
        { label: 'Firstname', name: 'firstname', value: '', readonly: '', size: 10 },
        { label: 'Lastname', name: 'lastname', value: '', readonly: '', size: 10 },
        { label: 'Department', name: 'department', value: '', readonly: '', size: 10 },
        { label: 'Salary', name: 'salary', value: '', readonly: '', size: 10 },
    ]
}))

app.get('/newupdateform', (req, res) => res.render('form2', { // get = send data from browser to server
    title: 'Update',
    header: 'Update person',
    action: '/updatestage2',
    fields: [
        { label: 'Id', name: 'id', value: '', readonly: '', size: 10 }
    ]
}));

app.get('/updateform', (req, res) => res.render('form2', {
    title: 'Update',
    header: 'Update person',
    action: '/updatestage2',
    fields: [
        { label: 'Id', name: 'id', value: '', readonly: '', size: 10 },
        { label: 'Firstname', name: 'firstname', value: '', readonly: 'readonly', size: 10 },
        { label: 'Lastname', name: 'lastname', value: '', readonly: 'readonly', size: 10 },
        { label: 'Department', name: 'department', value: '', readonly: 'readonly', size: 10 },
        { label: 'Salary', name: 'salary', value: '', readonly: 'readonly', size: 10 }
    ]
}));

app.post('/updatestage2', async (req, res) => {
    if (!req.body) return res.statusCode(500);

    const id = req.body.id;
    const resultData = await storage.get(id);
    if (resultData.length > 0) {
        const result = resultData[0];
        res.render('form2', {
            title: 'Update',
            header: 'Update person',
            action: '/updatestage3',
            fields: [
                { label: 'Id', name: 'id', value: result.id, readonly: 'readonly', size: 10 },
                { label: 'Firstname', name: 'firstname', value: result.firstname, readonly: '', size: 10 },
                { label: 'Lastname', name: 'lastname', value: result.lastname, readonly: '', size: 10 },
                { label: 'Department', name: 'department', value: result.department, readonly: '', size: 10 },
                { label: 'Salary', name: 'salary', value: result.salary, readonly: '', size: 10 }
            ]
        });
    }
    else {
        res.render('form2', {
            title: 'Update',
            header: 'Update person',
            action: '/updatestage3',
            fields: [
                { label: 'Id', name: 'id', value: id, readonly: 'readonly', size: 10 },
                { label: 'Firstname', name: 'firstname', value: '', readonly: '', size: 10 },
                { label: 'Lastname', name: 'lastname', value: '', readonly: '', size: 10 },
                { label: 'Department', name: 'department', value: '', readonly: '', size: 10 },
                { label: 'Salary', name: 'salary', value: '', readonly: '', size: 10 }
            ]
        });
    }
});

app.post('/updatestage3', (req, res) => {
    storage.update(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error))
});




app.listen(port, host,
    () => console.log(`${host}:${port} serving`));

function sendStatusPage(res, status, title = 'Status', header = 'Status') {
    return res.render('statusPage', { title, header, status })
}

function sendErrorPage(res, error, title = 'Error', header = 'Error') {
    return sendStatusPage(res, error, title, header);
}