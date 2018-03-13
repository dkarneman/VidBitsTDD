const { assert } = require("chai");
const request = require("supertest");
const { jsdom } = require("jsdom");

const app = require("../../app");
const Video = require("../../models/video");

const { parseTextFromHTML, buildVideoObject, findElementByAttribute } = require("../test-utils");
const {
  connectDatabase,
  disconnectDatabase
} = require("../database-utilities");

describe("Server path: /videos/create", () => {
  const vidToCreate = buildVideoObject();

  beforeEach(connectDatabase);

  afterEach(disconnectDatabase);

  describe("GET", () => {
    it("renders empty input fields", async () => {
      const response = await request(app).get("/videos/create");

      assert.equal(parseTextFromHTML(response.text, "input#title-input"), "");
      assert.equal(
        parseTextFromHTML(response.text, "textarea#description-input"),
        ""
      );
    });
  });

  describe("POST", () => {
    it("saves a Video document", async () => {
      
      const response = await request(app)
        .post("/videos/create")
        .type("form")
        .send(vidToCreate);
      const createdVideo = await Video.findOne(vidToCreate);
      assert.isOk(
        createdVideo,
        "Video was not created successfully in the database"
      );
      assert.include(createdVideo,vidToCreate);
    });

    it("redirects to the show page", async () => {
      const response = await request(app)
        .post("/videos/create")
        .type("form")
        .send(vidToCreate);

      const createdVideo = await Video.findOne(vidToCreate);
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, `/videos/${createdVideo._id}`);
    });
    it("will not save a video without a title", async () => {
      const invalidVideo = {description:'No Title Here',url:'http://www.google.com'};
      const response = await request(app)
        .post("/videos/create")
        .type("form")
        .send(invalidVideo);

      const allVids = await Video.find({});
      assert.equal(allVids.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, "form"), "required");
    });

    it("remembers the description and url when title fails validation", async () => {
      const invalidVideo = {description:'No Title Here',url:'http://www.google.com'};
      const response = await request(app)
        .post("/videos/create")
        .type("form")
        .send(invalidVideo);

      assert.include(
        parseTextFromHTML(response.text, "form"),
        invalidVideo.description
      );
      const vidElement = findElementByAttribute(response.text,'input','value',invalidVideo.url);
      assert.equal(vidElement.value, invalidVideo.url);
    });
  });
});
