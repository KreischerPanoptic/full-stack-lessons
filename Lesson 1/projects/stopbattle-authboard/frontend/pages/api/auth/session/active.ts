import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import AuthService from "../../../../services/auth.service";
import IsSessionActiveModelResponse from "../../../../models/responses/auth/isSessionActive.model";

const cors = initMiddleware(
    Cors({
        methods: ['GET', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IsSessionActiveModelResponse>
) {
    await cors(req, res);
    let token = req.headers.authorization;
    if(token) {
        if(token.includes('Bearer') || token.includes('bearer')) {
            token = token.slice(7)
        }
    }
    console.log('Refresh Token Active Next API Token', token);
    let response = await AuthService.isSessionActive(token ? token : '');
    console.log('Refresh Token Active Next API Response', response);
    res.status(200).send(response);
}
