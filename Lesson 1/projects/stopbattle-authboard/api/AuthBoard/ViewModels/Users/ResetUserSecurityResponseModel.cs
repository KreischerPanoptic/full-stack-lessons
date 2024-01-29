namespace AuthBoard.ViewModels.Users
{
    public class ResetUserSecurityResponseModel
    {
        public bool IsReset { get; set; }
        public string Error { get; set; }
        public GetUserResponseModel User { get; set; }
    }
}
