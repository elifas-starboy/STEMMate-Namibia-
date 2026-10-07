import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { activities } from "../data/activities";
import { filterActivities } from "../utils/filterActivities";
import ActivityFilters from "../components/ActivityFilters";
import ActivityCard from "../components/ActivityCard";

export default function Browse() {
  const { filters, updateFilter, savedIds } = useApp();
  const navigate = useNavigate();
  const results = useMemo(() => filterActivities(activities, filters), [filters]);

  return (
    <>
      <h1>Browse activities</h1>
      <ActivityFilters filters={filters} onFilterChange={updateFilter} />
      <p className="sec" aria-live="polite">
        {results.length} activit{results.length === 1 ? "y" : "ies"} found
      </p>
      {results.length > 0 ? (
        results.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} isSaved={savedIds.includes(activity.id)} onOpen={(id) => navigate(`/activity/${id}`)} />
        ))
      ) : (
        <div className="summary" role="alert">
          <b>No activities match.</b> Try “Any” for one of the filters.
        </div>
      )}
    </>
  );
}
