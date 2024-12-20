import Notification from "../models/notifModel.js";

export async function getNotifications(req, res) {
  const id = req.user._id;
  try {
    const notifications = await Notification.find({ userId: id });

    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ message: "No notifications found for the user" });
    }

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving notifications" });
  }
}

export async function deleteNotification(req, res) {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.sendStatus(404);
    }

    await Notification.deleteOne({ _id: id });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
}
