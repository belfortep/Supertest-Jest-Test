const app = require('../src/app')
const request = require('supertest')
describe('GET /tasks',()=>{

    test('Should respond with 200 status code',async ()=>{

        const response = await request(app)
            .get('/tasks')
            .send()

        expect(response.statusCode).toBe(200)


    });

    test('Should respond with an array', async()=>{

        const response = await request(app)
            .get('/tasks')
            .send()
        
        expect(response.body).toBeInstanceOf(Array)

    })

})

describe('POST /tasks', ()=>{

    describe('given title and description', ()=>{

        const task = {
            title: 'test title',
            description: 'test description'
        }

        test('Should respond with status 200', async()=>{

            const response = await request(app)
                .post('/tasks')
                .send(task)
            expect(response.statusCode).toBe(200)
    
        })
    
        test('Should respond with task ID', async()=>{
            
            const response = await request(app)
                .post('/tasks')
                .send(task)
            expect(response.body.id).toBeDefined();
    
        })
    })

    describe('when no title or description', ()=>{

        test('should respond with 400 status', async()=>{

            const fields = [
                {},
                {title:'test title'},
                {description: 'test description'}  
            ]

            for(const body of fields){
                const response= await request(app)
                .post('/tasks')
                .send(body)
            expect(response.statusCode).toBe(400)
            }
        })

    })
    
})