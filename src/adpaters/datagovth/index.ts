import fetch from 'node-fetch';
import { config } from '../../config';

const dataGovHost = 'https://opendata.data.go.th';

export class DataGovTHService {


    private get apiKey() {
        return config.dataGovTHApiKey;
    }

    constructor() {

    }


    public async retrieveCovidTotalInflected(): Promise<number> {

        const url = `/api/3/action/datastore_search_sql?sql=SELECT%20COUNT(*)%20from%20%2224ac8406-0cf9-4f8e-a55e-b53cf6766d1a%22%20LIMIT%205`;
        const resp = await fetch(`${dataGovHost}${url}`);
        const respbody = await resp.json();
        return respbody.result.records[0].count;


    }

}