import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../server';


chai.should();
chai.config.includeStack = true;

describe('## Bookmark APIs', () => {
  let bookmark = {
    name: 'Stack overflow',
    url: 'http://stackoverflow.com/',
    description: 'a bookmark for tests',
    category: 'Testing',
    favicon: 'http://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico?v=4f32ecc8f43d'
  }

  describe('# POST /api/bookmarks', () => {
    it('should create a new bookmark', (done) => {
      request(app)
        .post('/api/bookmarks')
        .send(bookmark)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK)
        .then((res) => {
          res.body.should.have.property('_id');
          expect(res.body.name).to.equal(bookmark.name);
          expect(res.body.url).to.equal(bookmark.url);
          expect(res.body.description).to.equal(bookmark.description);
          expect(res.body.category).to.equal(bookmark.category);
          bookmark = res.body;
          done();
        });
    });

    it('should create a new bookmark without optional parameters', (done) => {
      let bookmarkTemp = Object.assign({}, bookmark);
      bookmarkTemp.description = '';
      bookmarkTemp.favicon = '';
      request(app)
        .post('/api/bookmarks')
        .send(bookmarkTemp)
        .expect('Content-Type', /json/)
        .expect(httpStatus.OK)
        .then((res) => {
          res.body.should.have.property('_id');
          expect(res.body.name).to.equal(bookmarkTemp.name);
          expect(res.body.url).to.equal(bookmarkTemp.url);
          expect(res.body.description).to.equal(bookmarkTemp.description);
          expect(res.body.category).to.equal(bookmarkTemp.category);
          done();
        });
    });
  });

  describe('# GET /api/bookmarks/:bookmark_id', () => {
    it('should get bookmark details', (done) => {
      request(app)
        .get(`/api/bookmarks/${bookmark._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(bookmark.name);
          expect(res.body.url).to.equal(bookmark.url);
          expect(res.body.description).to.equal(bookmark.description);
          expect(res.body.category).to.equal(bookmark.category);
          done();
        });
    });

    it('should report error with message - Not Found, when bookmark does not exists', (done) => {
      request(app)
        .get('/api/bookmarks/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });
  });

  describe('# PUT /api/bookmarks/:id_bookmark', () => {
    it('should update bookmark details', (done) => {
      bookmark.name = 'A new stack';
      request(app)
        .put(`/api/bookmarks/${bookmark._id}`)
        .send(bookmark)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('A new stack');
          expect(res.body.url).to.equal(bookmark.url);
          done();
        });
    });
  });

  describe('# GET /api/bookmarks', () => {
    it('should get all bookmarks', (done) => {
      request(app)
        .get('/api/bookmarks')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('# DELETE /api/bookmarks', () => {
    it('should delete bookmark', (done) => {
      request(app)
        .delete(`/api/bookmarks/${bookmark._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          res.body.should.have.property('message').equal('Bookmark Successfully Removed');
          done();
        });
    });
  });


});
