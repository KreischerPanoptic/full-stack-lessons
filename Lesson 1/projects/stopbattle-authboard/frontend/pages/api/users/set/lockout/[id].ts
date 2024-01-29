import Cors from 'cors'
import initMiddleware from '../../../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import UsersService from "../../../../../services/users.service";
import SetUserSecurityModelResponse from "../../../../../models/responses/users/setUserSecurity.model";
import UserIdModelRequest from "../../../../../models/requests/users/userId.model";
import GetUserModelResponse from "../../../../../models/responses/users/getUser.model";

const cors = initMiddleware(
    Cors({
        methods: ['GET', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SetUserSecurityModelResponse>
) {
    await cors(req, res);

    let token = req.headers.authorization;
    if(token) {
        if(token.includes('Bearer') || token.includes('bearer')) {
            token = token.slice(7)
        }
    }

    let request = new UserIdModelRequest();

    if (req.query) {
        try {
            const {id} = req.query;
            if(!id) {
                let resp = new SetUserSecurityModelResponse();
                resp.success = false;
                resp.error = 'ID не передано';
                res.status(500).send(resp);
            }
            request.id = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
        }
        catch (e) {
            console.log('Query not available');
            let resp = new SetUserSecurityModelResponse();
            resp.success = false;
            resp.error = 'ID не передано';
            res.status(500).send(resp);
        }
    }
    console.log('Set Lockout Next API Token', token);
    console.log('Set Lockout Next API Request', request);
    let response = await UsersService.setUserLockout(request, token ? token : '');
    console.log('Set Lockout Next API Response', response);
    res.status(200).send(response);
}
