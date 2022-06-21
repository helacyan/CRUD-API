import { IUser } from "../src/user";

export = (req: Request, res: any) => {
  console.log(res)
  res.writeHead(200, {
      'Content-type': 'application/json'
  })
  res.send = (data: IUser) => {
      res.end(JSON.stringify(data));
  }
}