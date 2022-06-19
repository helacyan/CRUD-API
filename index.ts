import { Application } from './framework/Application'
import { router } from './src/user-router'
import jsonParser from './framework/parseJson';
import parseUrl from './framework/parseUrl';
import 'dotenv/config'

export const app: any = new Application()

app.use(jsonParser)
app.use(parseUrl('http://localhost:5000'));

app.addRouter(router)
