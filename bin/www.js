const node_env = require('node_env');
const app = require('../app.js')
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
