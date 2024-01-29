import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import {AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL} from "../../../../config/config";
import {NextApiRequest, NextApiResponse} from "next";
import AuthService from "../../../../services/auth.service";
import InstallTOTPModelResponse from "../../../../models/responses/auth/installTOTP.model";
import InstallTOTPModelRequest from "../../../../models/requests/auth/installTOTP.model";

const cors = initMiddleware(
    Cors({
        methods: ['POST', 'OPTIONS'],
        //origin: [AUTH_URL, MANAGMENT_URL, SEARCH_URL, API_URL, ]
    })
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<InstallTOTPModelResponse>
) {
    await cors(req, res);

    let token = req.headers.authorization;
    if(token) {
        if(token.includes('Bearer') || token.includes('bearer')) {
            token = token.slice(7)
        }
    }

    let request = new InstallTOTPModelRequest();
    request.username = req.body.username;
    request.code = req.body.code;
    console.log('Install TOTP Next API Token', token);
    console.log('Install TOTP Next API Request', request);
    let response = await AuthService.installTOTP(request, token ? token : '');
    console.log('Install TOTP Next API Response', response);
    res.status(200).send(response);
}
