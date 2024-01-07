import NotificationCard from "@/components/ui/notifications/notification-card";
import { Separator } from "@/components/ui/separator";
import { fetchNotificationsByUser } from "@/lib/server-actions/notification-actions";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const Notifications = async () => {
  const user = await currentUser();
  const notifications = await fetchNotificationsByUser(user?.id!);
  return (
    <div className="my-5">
      <h1 className="md:text-2xl text-lg">Notifications</h1>
      <Separator className="mt-2" />

      {notifications.map((notification: any) => {
        return (
          <NotificationCard notification={notification} key={notification.id} />
        );
      })}
    </div>
  );
};

export default Notifications;
