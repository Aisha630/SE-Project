import Notification from "../models/notifModel.js";

export default async function deleteNotification(req, res) {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await Notification.deleteOne({ _id: id });
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification" });
  }
}
