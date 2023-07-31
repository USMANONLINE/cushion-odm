import PouchDB from 'pouchdb';
import { Cushion } from './modules/cushion';
import { Schema } from './modules/schema';
import { Repository } from './repository/repository';

const connection = new PouchDB('http://127.0.0.1:5984/cushion');
Cushion.dataSourceConnection = connection;

class Author extends Schema {
    name: string;
    age: number;
    married: boolean;
}

const sample = new Author();
sample.name = 'Usman Kida'
sample.age = 12
sample.married = true

class AuthorRepository extends Repository<Author> {

}

const authorRepository = new AuthorRepository();

authorRepository.create(sample).then(response => {
    console.log(response)
}).catch(error => {
    console.log(error)
})


// function DocumentCollection(): (target: typeof Author, context: ClassDecoratorContext<typeof Author>) => void | typeof Author {
//     throw new Error('Function not implemented.');
// }
