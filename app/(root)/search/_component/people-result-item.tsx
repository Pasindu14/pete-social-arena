import UserActivityCard from "@/components/common/user-activity-card";
import React from "react";

interface PeopleResultItemProps {
  person: any;
}

const PeopleResultItem = ({ person }: { person: any }) => {
  return (
    <div className="mb-4 p-2">
      <UserActivityCard
        full_name={person.full_name}
        profile_picture_url={person.profile_picture_url}
        user=""
      />
    </div>
  );
};

export default PeopleResultItem;
