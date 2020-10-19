module.exports = app => {

    app.get('/ping', function (req, res) {
        return res.send('pong');
    });

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}