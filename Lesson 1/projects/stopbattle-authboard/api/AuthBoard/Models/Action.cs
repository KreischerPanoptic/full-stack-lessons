namespace AuthBoard.Models
{
    public enum Action
    {
        Create = 0,
        Update = 1,
        Delete = 2,
        Login = 3,
        Logout = 4,
        Refresh = 5,
        LockoutEnable = 6,
        LockoutDisable = 7,
        TOTPEnable = 8,
        TOTPDisable = 9,
        Role = 10
    }
}
