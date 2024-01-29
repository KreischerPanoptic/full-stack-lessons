import Cors from 'cors'
import initMiddleware from '../../../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import ValidateService from "../../../../../services/validate.service";
import ValidationModelResponse from "../../../../../models/responses/validate/validation.model";
import ValidationUsernameModelRequest from "../../../../../models/requests/validate/validationUsername.model";

const cors = initMiddleware(
    Cors({
        methods: ['POST', 'OPTIONS'],
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

    let request = new ValidationUsernameModelRequest();

    request.username = req.body.username;
    console.log('Is Username Unique Next API Token', token);
    console.log('Is Username Unique Next API Request', request);
    let response = await ValidateService.isUsernameUnique(request, token ? token : '');
    console.log('Is Username Unique Next API Response', response);
    res.status(200).send(response);
}
