import {App} from './app'

const main = async () => {

const app =new App(process.env.PORT);
await app.listen();
}

main()
