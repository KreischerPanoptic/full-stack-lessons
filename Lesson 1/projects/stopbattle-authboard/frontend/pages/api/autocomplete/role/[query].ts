import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import AutocompleteService from "../../../../services/autocomplete.service";
import GetHintsModelResponse from "../../../../models/responses/autocomplete/getHints.model";
import GetHintsModelRequest from "../../../../models/requests/autocomplete/getHints.model";

const cors = initMiddleware(
    Cors({
        methods: ['GET', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetHintsModelResponse>
) {
    await cors(req, res);

    let token = req.headers.authorization;
    if(token) {
        if(token.includes('Bearer') || token.includes('bearer')) {
            token = token.slice(7)
        }
    }

    let request = new GetHintsModelRequest();

    if (req.query) {
        try {
            const { query } = req.query;
            if(!query) {
                let resp = new GetHintsModelResponse();
                resp.success = false;
                resp.error = 'Запит не передано';
                res.status(500).send(resp);
            }
            request.query = Array.isArray(query) ? query[0] : query;
        }
        catch (e) {
            console.log('Query not available');
            let resp = new GetHintsModelResponse();
            resp.success = false;
            resp.error = 'Запит не передано';
            res.status(500).send(resp);
        }
    }
    console.log('Get Role Hints Next API Token', token);
    console.log('Get Role Hints Next API Request', request);
    let response = await AutocompleteService.getRoleHints(request, token ? token : '');
    console.log('Get Role Hints Next API Response', response);
    res.status(200).send(response);
}
