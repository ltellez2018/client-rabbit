import app from './app'
//import './rabbitmq';

app.listen(app.get('port'));
console.log(`Listening on http://localhost:${app.get('port')}`);
