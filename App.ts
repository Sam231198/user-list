import express from 'express'
import middleware from './app/middleware/Middlewares'
import routes from './router/routes'
import mongoose, { Mongoose } from 'mongoose'

export default class App {

    /**
     * Variavel com o link de conexão de banco do mango db
     * @var string
     */
    private mongoURL = 'mongodb+srv://samuel:2398emanuel@cluster0.rdblz.mongodb.net/develop?retryWrites=true&w=majority'

    public app: express.Application

    public constructor() {
        this.app = express()

        this.database()
        this.middleware()
        this.routes()
    }

    /**
     * função para configurar as middlewares da aplicação
     */
    private middleware(): void {
        this.app.use(middleware)
    }

    /**
     * função para configurar as rotas da aplicação
     */
    private routes(): void {
        this.app.use(routes)
    }

    /**
     * Função de configuração do banco de dados
     */
    private async database() {
        try {
            await mongoose.connect(
                this.mongoURL,
                { useNewUrlParser: true, useUnifiedTopology: true },
                () => console.log('banco conectado!')
            )

            //Get the default connection
            var db = mongoose.connection;

            //Bind connection to error event (to get notification of connection errors)
            db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        } catch (error) {
            console.log(`Conection fail: ${error}`)
        }
    }

    public listen(port: number): void {
        this.app.listen(port, () => console.log(`localhost:${port}`))
    }
}