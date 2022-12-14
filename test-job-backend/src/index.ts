import * as express from "express"
import * as cors from 'cors';
import * as bodyParser from "body-parser"
import {Request, Response} from "express"
import {AppDataSource} from "./data-source"
import {Routes} from "./routes"

AppDataSource.initialize().then(async () => {

  const app = express()
  app.use(bodyParser.json())

  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any))[route.action](req, res, next)
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

      } else if (result !== null && result !== undefined) {
        res.json(result)
      }
    })
  })

  app.use(cors({
    origin:"*",
    optionsSuccessStatus: 200
  }));
  app.use(bodyParser.json()); // other middlewares
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.listen(3000)

  console.log("Server running")

}).catch(error => console.log(error))
