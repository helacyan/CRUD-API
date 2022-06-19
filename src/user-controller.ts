import { randomUUID } from 'crypto';
import { IUser } from './user';

export const users: IUser[] = []

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
