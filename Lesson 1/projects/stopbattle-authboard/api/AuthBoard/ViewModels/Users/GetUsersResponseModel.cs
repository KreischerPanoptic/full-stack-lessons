namespace AuthBoard.ViewModels.Users
{
    public class GetUsersResponseModel
    {
        public long Count { get; set; }
        public int Page { get; set; }
        public int Amount { get; set; }
        public GetUserResponseModel[] Users { get; set; }
    }
}
