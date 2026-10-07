import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { findActivityById } from "../utils/activityHelpers";
import ActivityCard from "../components/ActivityCard";
import EmptyState from "../components/EmptyState";

export default function Saved() {
  const { savedIds, removeActivity } = useApp();
  const navigate = useNavigate();
  // Ignore saved ids whose activity no longer exists in the data file.
  const savedActivities = useMemo(() => savedIds.map(findActivityById).filter(Boolean), [savedIds]);

  return (
    <>
      <h1>Saved offline</h1>
      {savedActivities.length > 0 ? (
        savedActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} isSaved onOpen={(id) => navigate(`/activity/${id}`)} openLabel="Open" onRemove={removeActivity} />
        ))
      ) : (
        <EmptyState icon="download" title="Nothing saved yet" text="Save an activity and it will open without internet." actionLabel="Browse activities" onAction={() => navigate("/browse")} />
      )}
    </>
  );
}
