import React from "react";

const EngagementCounter = ({
  likeText,
  commentText,
}: {
  likeText: string;
  commentText: string;
}) => {
  return (
    <div>
      <div className="flex justify-between gap-4 mt-2">
        <h4 className="text-xs">{likeText}</h4>
        <h4 className="text-xs">{commentText}</h4>
      </div>
    </div>
  );
};

EngagementCounter.propTypes = {};

export default EngagementCounter;
