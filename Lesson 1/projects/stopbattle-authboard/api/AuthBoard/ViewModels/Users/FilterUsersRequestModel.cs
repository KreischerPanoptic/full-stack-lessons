namespace AuthBoard.ViewModels.Users
{
    public class FilterUsersRequestModel
    {
        public string[] Usernames { get; set; }
        public string[] Regions { get; set; }
        public string[] Roles { get; set; }
        public string[] LastNames { get; set; }
        public string[] FirstNames { get; set; }
    }
}
