import { randomUUID } from 'crypto';
import { IUser } from './user';

export const users: IUser[] = [
  {username: "asd", age: 25, hobbies: ['basketball', 'swimming'], id: "d89b77f3-f86c-4c6f-8823-aabe750a64a7", },
  {username: "zxc", age: 15, hobbies: ['dota', 'cs:go'], id: "fc80110b-0c87-4bd2-882a-ffe3c397d645", }
]

export const getUsers =  async (req:Request, res: any) => {
  res.send(users);
}

export const createUser = async  (req: { body: IUser}, res: any) => {
  const user = req.body
  if (user.age && typeof user.age === 'number' && user.username && typeof user.username === 'string'  && user.hobbies && Array.isArray(user.hobbies) && (typeof user.hobbies[0] === 'string' || typeof user.hobbies[0] === 'undefined')) {
    user.id = randomUUID()
    users.push(user)
    res.writeHead(201, { "Content-Type": "application/json" });
    res.send(user);
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Body does not contain required fields or fields are invalid. Username should be string, age - number, hobbies - array of strings or empty array" }));
  }
}
