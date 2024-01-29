namespace AuthBoard.ViewModels.Regions
{
    public class GetRegionsResponseModel
    {
        public long Count { get; set; }
        public int Page { get; set; }
        public int Amount { get; set; }
        public GetRegionResponseModel[] Regions { get; set; }
    }
}
