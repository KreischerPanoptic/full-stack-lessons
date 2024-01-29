import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import RegionsService from "../../../../services/regions.service";
import RegionIdModelRequest from "../../../../models/requests/regions/regionId.model";
import UpdateRegionModelResponse from "../../../../models/responses/regions/updateRegion.model";
import CreateUpdateRegionModelRequest from "../../../../models/requests/regions/createUpdateRegion.model";
import SetUserSecurityModelResponse from "../../../../models/responses/users/setUserSecurity.model";

const cors = initMiddleware(
    Cors({
        methods: ['PATCH', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UpdateRegionModelResponse>
) {
    await cors(req, res);

    let token = req.headers.authorization;
    if(token) {
        if(token.includes('Bearer') || token.includes('bearer')) {
            token = token.slice(7)
        }
    }

    let idreq = new RegionIdModelRequest();

    if (req.query) {
        try {
            const {id} = req.query;
            if(!id) {
                let resp = new UpdateRegionModelResponse();
                resp.success = false;
                resp.error = 'ID не передано';
                res.status(500).send(resp);
            }
            idreq.id = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
        }
        catch (e) {
            console.log('Query not available');
            let resp = new UpdateRegionModelResponse();
            resp.success = false;
            resp.error = 'ID не передано';
            res.status(500).send(resp);
        }
    }

    let request = new CreateUpdateRegionModelRequest();
    request.name = req.body.name;

    console.log('Update Region Next API Token', token);
    console.log('Update Region Next API ID', idreq);
    console.log('Update Region Next API Request', request);
    let response = await RegionsService.updateRegion(idreq, request, token ? token : '');
    console.log('Update Region Next API Response', response);
    res.status(200).send(response);
}
