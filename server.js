const http = require('http');
const cats = require('./data/cats');
const {
    getCats,
    getCat,
    addCat,
    updateCat,
    deleteCat
} = require('./controllers/catController');

const server = http.createServer((req, res) => { 
    if (req.url === '/api/cats' && req.method === 'GET') {
        getCats(req, res);

    } else if (req.url.match(/\/api\/cats\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getCat(req, res, id);
    
    } else if (req.url === '/api/cats' && req.method === 'POST') {
        addCat(req, res);

    } else if (req.url.match(/\/api\/cats\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateCat(req, res, id);

    } else if (req.url.match(/\/api\/cats\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deleteCat(req, res, id);

    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ message: 'Route Not Found' }));

    }
    
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
