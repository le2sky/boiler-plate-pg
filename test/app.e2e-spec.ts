import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('App 컨트롤러(e2e)', () => {
  let app: INestApplication

  //testing을 실행하기 전 가장 먼저 실행되는 함수
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('typeorm in nest, just coding')
  })

  describe('Users 컨트롤러(e2e)', () => {
    it('/users (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/users')
      expect(res.statusCode).toBe(401)
    })

    it('/users (POST)', async () => {
      const res = await request(app.getHttpServer()).post('/users').send({
        email: 'test1234@naver.com',
        password: 'test1234',
        username: 'test',
      })
      expect(res.statusCode).toBe(201)
    })

    it('/users/login (POST)', async () => {
      const res = await request(app.getHttpServer()).post('/users/login').send({
        email: 'test1234@naver.com',
        password: 'test1234',
      })
      expect(res.statusCode).toBe(200)
    })
  })
})
