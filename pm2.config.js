module.exports = {
    apps: [{
        name: "app",
        script: "server.js",
        watch: false,
        autorestart: false,
        watch_options: {
            followSymlinks: false
        },
        env: {
            NODE_ENV: "development",
            PORT: 3001,
            DATABASE: "mongodb://127.0.0.1:27017/user_order",
            JWT_SECRET:"vishal"
        },
        env_production: {
            NODE_ENV: "production",
            PORT: 3001,
            DATABASE: "mongodb://MACHINE-IP:PORT/user_order" ,
            JWT_SECRET:"vishal"
        }
    }]
}