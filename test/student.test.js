const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const connectDB = require("../dbinit");

describe("Students API endpoints", () => {
  beforeAll(async () => {
    await connectDB;
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  let studentId;

  it("should create a new student", async () => {
    const res = await request(app).post("/students").send({
      first_name: "Patricio",
      last_name: "Tamés",
      email: "pattames@hotmail.com",
    });
    studentId = res.body.data._id;
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });

  it("should return all students", async () => {
    const res = await request(app).get("/students");
    // console.log("is the data an array?", res.body);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should return one student", async () => {
    const res = await request(app).get(`/students/${studentId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data).toHaveProperty("first_name");
    expect(res.body.data).toHaveProperty("last_name");
    expect(res.body.data).toHaveProperty("email");
  });
});
