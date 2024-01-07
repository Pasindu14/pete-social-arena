import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

import Link from "next/link";
import {
  getFormattedDateTime,
  getInitials,
  getNotificationType,
} from "@/lib/utils";

const NotificationCard = ({ notification }: { notification: any }) => {
  return (
    <Link href={`/post/${notification.reference_id}`}>
      <div className="p-4 hover:bg-slate-100/5 cursor-pointer rounded-xl mt-2 border-solid border-[1px]  border-slate-200/10">
        <div className="flex items-center space-x-3">
          <div>
            <Avatar>
              <AvatarImage
                src={notification.publisher_profile_picture_url}
                alt="@usertag"
              />
              <AvatarFallback>
                {getInitials(notification.publisher_name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <p className="font-bold">{notification.publisher_name}</p>

          <p className="">
            {getNotificationType(notification.notification_type)}
          </p>

          {notification.created_at && (
            <h4 className="text-[10px]">
              {getFormattedDateTime(notification.created_at)}
            </h4>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
