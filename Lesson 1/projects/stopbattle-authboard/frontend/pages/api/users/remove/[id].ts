import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import UsersService from "../../../../services/users.service";
import UserIdModelRequest from "../../../../models/requests/users/userId.model";
import DeleteUserModelResponse from "../../../../models/responses/users/deleteUser.model";
import SetUserSecurityModelResponse from "../../../../models/responses/users/setUserSecurity.model";

const cors = initMiddleware(
    Cors({
        methods: ['DELETE', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DeleteUserModelResponse>
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
                let resp = new DeleteUserModelResponse();
                resp.success = false;
                resp.error = 'ID не передано';
                res.status(500).send(resp);
            }
            request.id = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
        }
        catch (e) {
            console.log('Query not available');
            let resp = new DeleteUserModelResponse();
            resp.success = false;
            resp.error = 'ID не передано';
            res.status(500).send(resp);
        }
    }
    console.log('Delete User Next API Token', token);
    console.log('Delete User Next API Request', request);
    let response = await UsersService.removeUser(request, token ? token : '');
    console.log('Delete User Next API Response', response);
    res.status(200).send(response);
}
