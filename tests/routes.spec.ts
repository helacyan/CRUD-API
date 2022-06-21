import supertest, { SuperTest, Test } from "supertest";
import { app } from "../index";
import "dotenv/config";

describe("api test", () => {
  describe("users", () => {
    let req: SuperTest<Test>;
    let id: string;
    const test = {
      username: "123",
      age: 1,
      hobbies: ["123"],
    };

    beforeAll((done) => {
      const port = process.env.PORT;
      app.listen(port, done);
      req = supertest(`http://localhost:${port}/api/`);
    });

    afterAll(() => {
      app.close();
    });

    it("Get all records with a GET", async () => {
      const res = await req
        .get("users")
        .set("Accept", "application/json");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("A new object is created by a POST", async () => {
      const res = await req
        .post("users")
        .send(test)
        .set("Accept", "application/json");

      expect(res.status).toBe(201);
      id = res.body.id;
      expect(res.body).toEqual({ ...test, id });
    });

    it("Get the created record by its id", async () => {
      const res = await req
        .get(`users/${id}`)
        .set("Accept", "application/json");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ...test, id });
    });

    it("Update the created record with a PUT", async () => {
      const updatedUser = {
        username: "testUser2",
        age: 23,
        hobbies: ["testHobbie2"],
      };
      const res = await req
        .put(`users/${id}`)
        .send(updatedUser)
        .set("Accept", "application/json");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ ...updatedUser, id: res.body.id });
    });

    it("Delete the created object by id", async () => {
      const res = await req.delete(`users/${id}`);

      expect(res.status).toBe(204);
    });

    it("Get a deleted object by id", async () => {
      const res = await req
        .get(`users/${id}`)
        .set("Accept", "application/json");

      expect(res.status).toBe(404);
      expect(res.text).toEqual(`User with such id - ${id} was not found`);
    });
  });
});