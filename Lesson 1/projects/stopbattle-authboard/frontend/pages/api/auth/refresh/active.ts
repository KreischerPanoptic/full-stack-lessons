import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import AuthService from "../../../../services/auth.service";
import IsTokenActiveModelResponse from "../../../../models/responses/auth/isTokenActive.model";
import IsTokenActiveModelRequest from "../../../../models/requests/auth/isTokenActive.model";

const cors = initMiddleware(
    Cors({
        methods: ['POST', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IsTokenActiveModelResponse>
) {
    await cors(req, res);
    let request = new IsTokenActiveModelRequest();
    request.username = req.body.username;
    request.token = req.body.token;
    console.log('Refresh Token Active Next API Request', request);
    let response = await AuthService.isRefreshTokenActive(request);
    console.log('Refresh Token Active Next API Response', response);
    res.status(200).send(response);
}
