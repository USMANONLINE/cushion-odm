import { BaseQuery } from "../interfaces/BaseQuery";
import { Schema } from "../modules/schema";
import { Cushion } from "../modules/cushion";
import { CreatedDocumentResponse } from "../interfaces/CreatedDocResponse";

export class Repository<T extends Schema> implements BaseQuery<T> {
    private readonly api: PouchDB.Database<any> = Cushion.dataSourceConnection;

    async create (doc: T) :Promise<T | unknown> {
        const queryKeyId = String(doc.constructor.name).toLowerCase();
        doc._id = `${queryKeyId}:${new Date().toISOString()}`

        if (doc.cushion_meta === undefined) {
            doc.cushion_meta = { __stores: queryKeyId, createdAt: new Date(), lastModifiedAt: new Date() }
        }

        try {
            const createdDoc: CreatedDocumentResponse = await this.api.put(doc);
            doc._rev = createdDoc.rev
            return doc
        } catch (err) {
            return err
        }
    };

    async findById (docId: string): Promise<T | unknown> {
        return await this.api.get(docId);
    }

    async findAll (): Promise<Array<T> | unknown> {
        try {
            const queriedDocs = await this.api.allDocs({ include_docs: true })
            if (queriedDocs.rows.length === 0) {
                return []
            }
            const formattedDocs = queriedDocs.rows.map(docs => docs.doc)
            return formattedDocs;
        } catch (error) {
            return error
        }
    }
}