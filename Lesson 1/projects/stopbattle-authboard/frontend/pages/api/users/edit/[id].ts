import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import UsersService from "../../../../services/users.service";
import UpdateUserModelResponse from "../../../../models/responses/users/updateUser.model";
import EditUserModelRequest from "../../../../models/requests/users/editUser.model";
import SetUserSecurityModelResponse from "../../../../models/responses/users/setUserSecurity.model";

const cors = initMiddleware(
    Cors({
        methods: ['PATCH', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UpdateUserModelResponse>
) {
    await cors(req, res);

    let token = req.headers.authorization;
    if(token) {
        if(token.includes('Bearer') || token.includes('bearer')) {
            token = token.slice(7)
        }
    }

    let request = new EditUserModelRequest();

    if (req.query) {
        try {
            const {id} = req.query;
            if(!id) {
                let resp = new UpdateUserModelResponse();
                resp.success = false;
                resp.error = 'ID не передано';
                res.status(500).send(resp);
            }
            request.id = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
        }
        catch (e) {
            console.log('Query not available');
            let resp = new UpdateUserModelResponse();
            resp.success = false;
            resp.error = 'ID не передано';
            res.status(500).send(resp);
        }
    }
    request.firstName = req.body.firstName;
    request.lastName = req.body.lastName;
    request.patronymic = req.body.patronymic;
    request.position = req.body.position;
    request.rank = req.body.rank;
    request.password = req.body.password;
    request.newPassword = req.body.newPassword;
    request.confirmPassword = req.body.confirmPassword;

    console.log('Edit User Next API Token', token);
    console.log('Edit User Next API Request', request);
    let response = await UsersService.editUser(request, token ? token : '');
    console.log('Edit User Next API Response', response);
    res.status(200).send(response);
}
