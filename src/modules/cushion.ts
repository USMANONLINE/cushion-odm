export class Cushion {
    static dataSourceConnection: PouchDB.Database<any>;

    setDataSource (dataSourceConnection: PouchDB.Database<any>) {
        Cushion.dataSourceConnection = dataSourceConnection;
    }

    getDataSource () {
        return Cushion.dataSourceConnection;
    }
}