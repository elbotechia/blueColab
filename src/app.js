import { Server } from './server/Server.js';



class App {

    constructor(){
        this.server = new Server();
    }

    run(){
        this.server.listen();
    }
}

const main =()=>{
const app = new App();
app.run();  
}

main()