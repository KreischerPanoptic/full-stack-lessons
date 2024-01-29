namespace AuthBoard.ViewModels.Authentication
{
    public class GenerateTOTPResponseModel
    {
        public bool IsGenerated { get; set; }
        public string Error { get; set; }
        public string Key { get; set; }
        public string QRCode { get; set; }
    }
}
