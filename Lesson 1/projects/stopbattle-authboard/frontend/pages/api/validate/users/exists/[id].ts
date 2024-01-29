import Cors from 'cors'
import initMiddleware from '../../../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import ValidateService from "../../../../../services/validate.service";
import ValidationModelResponse from "../../../../../models/responses/validate/validation.model";
import ValidationUserExistsModelRequest from "../../../../../models/requests/validate/validationUserExists.model";

const cors = initMiddleware(
    Cors({
        methods: ['GET', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ValidationModelResponse>
) {
    await cors(req, res);

    let token = req.headers.authorization;
    if(token) {
        if(token.includes('Bearer') || token.includes('bearer')) {
            token = token.slice(7)
        }
    }

    let request = new ValidationUserExistsModelRequest();
    if (req.query) {
        try {
            const {id} = req.query;
            const {active} = req.query;
            if(!id) {
                let resp = new ValidationModelResponse();
                resp.success = false;
                resp.error = 'ID не передано';
                res.status(500).send(resp);
            }
            request.id = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
        }
        catch (e) {
            console.log('Query not available');
            let resp = new ValidationModelResponse();
            resp.success = false;
            resp.error = 'ID не передано';
            res.status(500).send(resp);
        }
    }
    console.log('Is User Exists Next API Token', token);
    console.log('Is User Exists Next API Request', request);
    let response = await ValidateService.isUserExists(request, token ? token : '');
    console.log('Is User Exists Next API Response', response);
    res.status(200).send(response);
}
