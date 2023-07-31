using FerryRide.Models;
using System.Collections.Generic;

namespace FerryRide.Repositories
{
    public interface ISavedFerryDepartureRepository
    {
        SavedFerryDeparture SaveDeparture(SavedFerryDeparture newDeparture);
        List<SavedFerryDeparture> GetSavedDepartures();
        void DeleteDeparture(int id);
    }
}
