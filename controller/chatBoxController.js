const chatMessage = require("../model/chatBoxModel");


 
 


// 📩 User Sends Message
exports.sendMessageController = async (req, res) => {
  console.log("inside sendMessgeController");

  try {
    const { message, sender } = req.body;

    if (!message || !sender) {
      return res.status(400).json({ error: "Sender and message are required" });
    }

    // Save the message from user
    const newMessage = new chatMessage({ message, sender });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};


//admin reply


exports.replyMessageController = async (req, res) => {
  console.log("inside replyMessageController");

  const { messageId } = req.params;  
  const { reply, role } = req.body;  

  console.log("Received data:", { messageId, reply, role });

  try {
    // Validate role
    if (role !== "admin") {
      return res.status(403).json({ message: "Only admin can reply to messages." });
    }

    // Ensure messageId is valid
    if (!messageId) {
      return res.status(400).json({ message: "Invalid message ID." });
    }

    // Find the message and only update the "reply" field
    const updateMessage = await chatMessage.findByIdAndUpdate(
      messageId,  
      { $set: { reply } },  // ✅ Only update the reply field
      { new: true }  
    );

    if (!updateMessage) {
      return res.status(404).json({ message: "Message not found." });
    }

    console.log("Updated message:", updateMessage);

    res.status(200).json(updateMessage);
  } catch (err) {
    console.error("Error updating message:", err);
    res.status(500).json({ message: "Error updating message", error: err.message });
  }
};



// 📨 Fetch All Messages
exports.getAllMessagesController = async (req, res) => {
  console.log("inside allMessgeController");
  try {
    const messages = await chatMessage.find().sort({ timestamp: -1 }); // Latest first
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};



//delete messages







exports.removeMessgeController = async(req,res)=>{
  console.log("inside removeMessageController");
const {messageId}=req.params



  try{
      const deleteMessage = await chatMessage.findByIdAndDelete({_id:messageId})
      res.status(200).json(deleteMessage)
  }catch(err){
res.status(401).json(err)
  }
} 