import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import LoginModelResponse from "../../../models/responses/auth/login.model";
import AuthService from "../../../services/auth.service";
import LoginModelRequest from "../../../models/requests/auth/login.model";

const cors = initMiddleware(
    Cors({
        methods: ['POST', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LoginModelResponse>
) {
    await cors(req, res);
    let request = new LoginModelRequest();
    request.username = req.body.username;
    request.password = req.body.password;
    request.code = req.body.code;
    request.rememberMe = req.body.rememberMe;
    console.log('Login Next API Request', request);
    let response = await AuthService.login(request);
    console.log('Login Next API Response', response);
    res.status(200).send(response);
}
