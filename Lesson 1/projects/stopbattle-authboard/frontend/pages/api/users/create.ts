import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import UsersService from "../../../services/users.service";
import CreateUserModelRequest from "../../../models/requests/users/createUser.model";
import UserIdModelRequest from "../../../models/requests/users/userId.model";
import CreateUserModelResponse from "../../../models/responses/users/createUser.model";

const cors = initMiddleware(
    Cors({
        methods: ['POST', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CreateUserModelResponse>
) {
    await cors(req, res);

    let token = req.headers.authorization;
    if(token) {
        if(token.includes('Bearer') || token.includes('bearer')) {
            token = token.slice(7)
        }
    }

    let request = new CreateUserModelRequest();

    request.username = req.body.username;
    request.firstName = req.body.firstName;
    request.lastName = req.body.lastName;
    request.patronymic = req.body.patronymic;
    request.position = req.body.position;
    request.rank = req.body.rank;
    request.password = req.body.password;
    request.confirmPassword = req.body.confirmPassword;
    request.regionId = req.body.regionId;
    request.role = req.body.role;

    console.log('Create User Next API Token', token);
    console.log('Create User Next API Request', request);
    let response = await UsersService.createUser(request,token ? token : '');
    console.log('Create User Next API Response', response);
    res.status(200).send(response);
}
