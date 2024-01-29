export default class GenerateTOTPModelResponse {
    generated: boolean | undefined | null;
    success: boolean = false;
    error: string | undefined | null;
    key: string | undefined | null;
    qrCode: string | undefined | null;
}
