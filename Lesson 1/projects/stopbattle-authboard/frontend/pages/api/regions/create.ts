import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import RegionsService from "../../../services/regions.service";
import CreateRegionModelResponse from "../../../models/responses/regions/createRegion.model";
import CreateUpdateRegionModelRequest from "../../../models/requests/regions/createUpdateRegion.model";

const cors = initMiddleware(
    Cors({
        methods: ['POST', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CreateRegionModelResponse>
) {
    await cors(req, res);

    let token = req.headers.authorization;
    if(token) {
        if(token.includes('Bearer') || token.includes('bearer')) {
            token = token.slice(7)
        }
    }

    let request = new CreateUpdateRegionModelRequest();
    request.name = req.body.name;

    console.log('Create Region Next API Token', token);
    console.log('Create Region Next API Request', request);
    let response = await RegionsService.createRegion(request, token ? token : '');
    console.log('Create Region Next API Response', response);
    res.status(200).send(response);
}
