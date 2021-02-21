const Cat = require('../models/catModel');
const { getPostData } = require('../utils');

// Gets all cats
// GET /api/cats
async function getCats(req, res) {
    try {
        const cats = await Cat.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cats));
    } catch (error) {
        console.error(error);
    }
}

// Get single cat
// GET /api/cat/:id
async function getCat(req, res, id) {
    try {
        const cat = await Cat.findById(id);

        if (!cat) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Cat Not Found' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(cat));
        }
    } catch (error) {
        console.error(error);
    }
}

// Add a cat
// POST /api/cats
async function addCat(req, res) {
    //try {

    //     let body = '';
    //     req.on('data', (chunk) => {
    //         body += chunk.toString();
    //     });

    //     req.on('end', async () => {
    //         const { name, description } = JSON.parse(body);

    //         const cat = {
    //             name,
    //             description
    //         };

    //         const newCat = await Cat.add(cat);

    //         res.writeHead(201, {// send status code
    //             'Content-Type': 'application/json'
    //         });
    //         return res.end(JSON.stringify(newCat));
    //     });

    // } catch (error) {
    //     console.error(error);
    // }
    try {
        const body = await getPostData(req);

        const { name, description } = JSON.parse(body);

        const cat = {
            name,
            description
        };

        const newCat = await Cat.add(cat);

        res.writeHead(201, {
            'Content-Type': 'application/json'
        });
        return res.end(JSON.stringify(newCat));

    } catch (error) {
        console.error(error);
    }
}

// Update a cat
// PUT /api/cats/:id
async function updateCat(req, res, id) {
    try {
        const cat = await Cat.findById(id);

        if (!cat) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Cat Not Found' }));

        } else {        
            const body = await getPostData(req);

            const { name, description } = JSON.parse(body);

            const catData = {
                name: name || cat.name,
                description: description || cat.description
            };

            const updCat = await Cat.update(id, catData);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(updCat));
        }
    } catch (error) {
        console.error(error);
    }
}

// Delete a cat
// DELETE /api/cat/:id
async function deleteCat(req, res, id) {
    try {
        const cat = await Cat.findById(id);
        console.log(cat);

        if (!cat) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                message: 'Cat Not Found'
            }));
        } else {
            await Cat.remove(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ message: `${name} has found their forever home` }));
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getCats,
    getCat,
    addCat,
    updateCat,
    deleteCat
};