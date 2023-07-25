using FerryRide.Models;
using System.Collections.Generic;

namespace FerryRide.Repositories
{
    public interface IFerryScheduleRepository
    {
        List<FerrySchedule> GetFerrySchedules();
        FerrySchedule CreateFerrySchedule(FerrySchedule newSchedule);
    }

}
