import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import AuthService from "../../../services/auth.service";
import RefreshModelResponse from "../../../models/responses/auth/refresh.model";
import RefreshModelRequest from "../../../models/requests/auth/refresh.model";

const cors = initMiddleware(
    Cors({
        methods: ['POST', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RefreshModelResponse>
) {
    await cors(req, res);
    let request = new RefreshModelRequest();
    request.username = req.body.username;
    request.token = req.body.token;
    request.isRefreshNeeded = req.body.isRefreshNeeded;
    console.log('Refresh Next API Request', request);
    let response = await AuthService.refresh(request);
    console.log('Refresh Next API Response', response);
    res.status(200).send(response);
}
