const options = {
    client:'sqlite3',
    connection: {
        filename: './config/DB/mibase.sqlite'
    },
    useNullAsDefault: true
}

module.exports= {
    options
}