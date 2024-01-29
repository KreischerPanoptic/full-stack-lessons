import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import UsersService from "../../../services/users.service";
import GetUsersModelResponse from "../../../models/responses/users/getUsers.model";
import GetUsersModelRequest from "../../../models/requests/users/getUsers.model";
import ValidationModelResponse from "../../../models/responses/validate/validation.model";

const cors = initMiddleware(
    Cors({
        methods: ['GET', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetUsersModelResponse>
) {
    await cors(req, res);

    let token = req.headers.authorization;
    if(token) {
        if(token.includes('Bearer') || token.includes('bearer')) {
            token = token.slice(7)
        }
    }

    let request = new GetUsersModelRequest();
    if (req.query) {
        const {active} = req.query;
        const { archived } = req.query;
        const { page } = req.query;
        const { amount } = req.query;
        if(active) {
            request.active = Array.isArray(active) ? active[0] === 'true' : active === 'true';
        }
        if(archived) {
            request.archived = Array.isArray(archived) ? archived[0] === 'true' : archived === 'true';
        }
        if(page) {
            request.page = Array.isArray(page) ? parseInt(page[0]) : parseInt(page);
        }
        if(amount) {
            request.amount = Array.isArray(amount) ? parseInt(amount[0]) : parseInt(amount);
        }
    }
    console.log('Get Users Next API Token', token);
    console.log('Get Users Next API Request', request);
    let response = await UsersService.getUsers(request, token ? token : '');
    console.log('Get Users Next API Response', response);
    res.status(200).send(response);
}
