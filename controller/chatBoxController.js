const chatMessage = require("../model/chatBoxModel");


 
 


// 📩 User Sends Message
/* exports.sendMessageController = async (req, res) => {
  console.log("inside sendMessgeController");
  const userId = req.userId
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: " message are required" });
    }

    // Save the message from user
    const newMessage = new chatMessage({ message,userId });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
 */
  exports.sendMessageController = async (req, res) => {
  console.log("inside sendMessageController");
  console.log("User ID:", req.userId);
  console.log("Role from JWT:", req.role); 
  const userId = req.userId;
  const role = req.role; // Assuming authentication middleware sets this

  try {
    const { message } = req.body; // Remove `role` from req.body (it's not needed)

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Determine sender based on role
    const sender = role === "admin" ? "admin" : "student"; 

    // Save the message with sender role
    const newMessage = new chatMessage({ message, sender, userId });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

 









//admin reply


 /* exports.replyMessageController = async (req, res) => {
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
  */


// 📨 Fetch All Messages
 /* exports.getAllMessagesController = async (req, res) => {
  console.log("inside allMessgeController");
  try {
    const messages = await chatMessage.find().sort({ timestamp: +1 }); // Latest first
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};
  */
 /*  exports.getAllMessagesController = async (req, res) => {
  console.log("Inside getAllMessagesController");
  try {
    const messages = await chatMessage.aggregate([
      { $sort: { timestamp: 1 } }, // Sort messages by time
      { 
        $group: { 
          _id: "$userId", // Group by student ID
          messages: { $push: "$$ROOT" } // Store all messages for that user
        } 
      }
    ]);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};
  */




/* exports.getAllMessagesController = async (req, res) => {
  console.log("Inside getAllMessagesController");
  console.log("Request Role:", req.role); // Log extracted role

  try {
    if (req.role !== "admin") {
      console.log("Access denied. Not an admin."); // Debugging log
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const messages = await chatMessage.aggregate([
      { $sort: { timestamp: 1 } }, // Sort messages by time
      { 
        $group: { 
          _id: "$userId", 
          messages: { $push: "$$ROOT" } 
        } 
      }
    ]);

    console.log("Messages fetched successfully.");
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
}; */


 exports.getAllMessagesController = async (req, res) => {
  console.log("Inside getAllMessagesController");
  console.log("Request Role:", req.role);

  try {
    if (req.role !== "admin") {
      console.log("Access denied. Not an admin.");
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const messages = await chatMessage.aggregate([
      // First, sort messages by timestamp
      { $sort: { timestamp: 1 } },  
    
      // Group messages by userId
      { 
        $group: { 
          _id: "$userId",
          messages: { $push: "$$ROOT" }, 
          lastMessageTime: { $last: "$timestamp" } // ✅ Keep track of last message time
        } 
      },
    
      // Convert userId to ObjectId for lookup
      {
        $addFields: {
          userIdObj: { $toObjectId: "$_id" }
        }
      },
    
      // Lookup user details from users collection
      {
        $lookup: {
          from: "users",
          localField: "userIdObj",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      
      { $unwind: "$userDetails" },
    
      // Project final output
      {
        $project: {
          _id: 1,
          username: "$userDetails.username",
          email: "$userDetails.email",
          messages: 1,
          lastMessageTime: 1  // ✅ Include last message time for sorting
        }
      },
    
      // ✅ Now sort based on last message timestamp (ensuring updated chats move to the end)
      { $sort: { lastMessageTime: 1 } }
    ]);
    
    // Debugging: Log the response as JSON
    console.log("Final Response Sent to Postman:", JSON.stringify(messages, null, 2));

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};






//delete messages


/*  exports.removeMessgeController = async (req, res) => {
  console.log("Inside removeMessageController");
  const { messageId } = req.params;

  try {
    const deleteMessage = await chatMessage.findByIdAndDelete(messageId);
    
    if (!deleteMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully", deleteMessage });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};  
 */
exports.removeMessgeController = async (req, res) => {
  console.log("Inside removeMessageController");
  const { messageId } = req.params;

  try {
    const message = await chatMessage.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // If message has a reply, keep the reply while removing the message
    if (message.reply) {
      await chatMessage.findByIdAndUpdate(messageId, { message: null }); // ✅ Clears only message
    } else {
      await chatMessage.findByIdAndDelete(messageId); // ✅ Deletes if no reply exists
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//reply remove
 /* exports.removeReplyController = async (req, res) => {
  console.log("Inside removeReplyController");
  const { messageId } = req.params;

  try {
    const message = await chatMessage.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Only update the reply field to null (or empty string) instead of deleting the message
    message.reply = null; // or message.reply = "";
    await message.save();

    res.status(200).json({ message: "Reply removed successfully", updatedMessage: message });
  } catch (err) {
    console.error("Error removing reply:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}; */
/* exports.removeReplyController = async (req, res) => {
  console.log("Inside removeReplyController");
  const { messageId } = req.params;

  try {
    const message = await chatMessage.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // ✅ Set reply to null while keeping the original message
    message.reply = null;
    await message.save();

    res.status(200).json({ message: "Reply removed successfully" });
  } catch (err) {
    console.error("Error removing reply:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}; */
exports.removeReplyController = async (req, res) => {
  console.log("Inside removeReplyController");
  const { messageId } = req.params;

  try {
    const message = await chatMessage.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (!message.reply) {
      return res.status(400).json({ error: "No reply exists to remove" });
    }

    // Remove the reply
    message.reply = null; 
    await message.save();

    res.status(200).json({ message: "Reply removed successfully", updatedMessage: message });
  } catch (err) {
    console.error("Error removing reply:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//usermessages
  exports.userMessageController = async (req, res) => {
    console.log("Inside userMessageController");
    const userId = req.userId; // Extract user ID from token
  
    try {
      const userMessages = await chatMessage.find({ userId }).sort({ timestamp: 1 }); // Fetch messages for this user
      res.status(200).json(userMessages);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch messages", details: err });
    }
  };
  
 //replymessage






 

 exports.replyMessageController = async (req, res) => {
   try {
     const { reply } = req.body;
     const { messageId } = req.params; // ✅ Get messageId from URL parameters
 
     if (!messageId || !reply) {
       return res.status(400).json({ error: "Message ID and reply are required." });
     }
 
     const message = await chatMessage.findById(messageId);
 
     if (!message) {
       return res.status(404).json({ error: "Message not found." });
     }
 
     // ✅ Update the original message with reply and timestamp
     message.reply = reply;
     message.replyTimestamp = new Date(); // Save timestamp for sorting
 
     await message.save();
 
     res.status(201).json({ message: "Reply sent successfully", updatedMessage: message });
   } catch (error) {
     console.error("Error replying to message:", error);
     res.status(500).json({ error: "Internal server error" });
   }
 };


 //remove
