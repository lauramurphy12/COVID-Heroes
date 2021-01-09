module.exports = {
    configureWebpack: config => {
        config.externals = ['pg', 'tedious', 'pg-hstore', 'sqlite3']
    }
}
