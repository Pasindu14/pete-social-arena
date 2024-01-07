"use server";

import { supabase, supabaseCacheFreeClient } from "@/utils/server";
import ResponseHandler from "../models/response.model";

interface NotificationParams {
  notificationType: string;
  referenceId: string;
  referenceAuthorId: string;
  publisherId: string;
}

export async function createNotification({
  notificationType,
  referenceId,
  referenceAuthorId,
  publisherId,
}: NotificationParams) {
  const responseHandler = new ResponseHandler<any>();
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        notification_type: notificationType,
        reference_id: referenceId,
        reference_author_id: referenceAuthorId,
        publisher_id: publisherId,
      })
      .single();

    if (error != null) {
      return responseHandler.setError(
        `Oops! Something went wrong with the notification. Please try again!`,
        error.message
      );
    }
    return responseHandler.setSuccess("Notification created successfully.", {
      notification: data,
    });
  } catch (error: any) {
    return responseHandler.setError(
      `Oops! Something went wrong with the notification. Please try again!`,
      error.message
    );
  }
}

export async function fetchNotificationsByUser(userId: string) {
  try {
    let { data: comments, error } = await supabaseCacheFreeClient.rpc(
      "get_notifications_by_user",
      {
        ref_author_id: userId,
      }
    );
    return comments;
  } catch (error) {
    return [];
  }
}
