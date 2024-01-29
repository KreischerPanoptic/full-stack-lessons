namespace AuthBoard.ViewModels.Users
{
    public class SetUserSecurityResponseModel
    {
        public bool IsSet { get; set; }
        public string Error { get; set; }
        public GetUserResponseModel User { get; set; }
    }
}
