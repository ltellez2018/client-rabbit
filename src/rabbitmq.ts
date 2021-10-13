// RABBIT MQ
import rabbit from "./rabbitMQ/Rabbit";

const init = async  ()=> {
    return await rabbit.getConnection();
}

init();
