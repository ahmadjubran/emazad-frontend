# Routes and Keys

Bid:

Routes:
router.get("/bid", getBid);
router.get("/bid/:id", getOneBid);
router.post("/bid", createBid);

Keys:
userId
itemId
bidprice

---

Chat:

Routes:
router.get("/chat/:senderId/:receiverId", getChat);
router.post("/chat", sendChat);

Keys:
senderId
receiverId
message

---

Comment:

Routes:
router.get("/comment", getComments);
router.post("/comment", createComment);
router.put("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);

Keys:
userId
itemId
comment

---

Favorite:

Routes:
router.get("/favorite", getFavorites);
router.get("/favorite/:id", getFavoriteById);
router.post("/favorite", createFavorite);
router.delete("/favorite/:id", deleteFavorite);
router.get("/userFavorite/:id", userFavorites);

Key:
userId
itemId

---

Item:

Routes:
router.post("/item", uploadItemImg, addItem);
router.put("/item/:id", uploadItemImg, updateItem);
router.delete("/item/:id", deleteItem);
router.put("/itemhide/:id", hideItem);

// get items by category and status
router.get("/items", getItems);
router.get("/items/:status", getItems);
router.get("/items/:status/:category", getItems);
router.get("/items/:status/:category/:subCategory", getItems);
router.get("/item/:id", getOneItem);

Keys:
itemTitle
itemDescription
itemImage
category
subCategory
itemCondition
userId
initialPrice
latestBid
startDate
endDate
status

---

Notifications:

Routes:
router.get("/notif", getNotifications);
router.get("/notif/:id", getNotifications);
router.get("/usernotif/:id", getUserNotifications);
router.post("/notif", createNotification);
router.put("/notif/:id", updateNotification);
router.delete("/notif/:id", deleteNotification);

Keys:
userId
itemId
commentId
replyId
bidId
ratingId
reportId
notiMessage
status

---

Rating:

Routes:
router.get("/rating", getRatings);
router.get("/rating/:id", getRatingById);
router.post("/rating", createRating);
router.put("/rating/:id", updateRating);
router.delete("/rating/:id", deleteRating);
router.get("/userRating/:id", getUserRating);

Keys:
rating
userId
ratedId

---

Reply:

Routes:
router.get("/reply", getReplies);
router.post("/reply", createReply);
router.put("/reply/:id", updateReply);
router.delete("/reply/:id", deleteReply);

Keys:
userId
commentId
reply

---

Report:

Routes:
router.get("/report", getReport);
router.post("/report", createReport);
router.delete("/report/:id", deleteReport);
router.get("/report/:id", getOneReport);

Keys:
reportTitle
reportMessage
reportReason
userId
itemId

---

User:

Routes:
router.post("/signup", uploadUserImg, basicAuth, signup);
router.post("/login", login);
router.get("/users", bearerAuth, allUsers);
router.post('/verification/:id', verification);

router.get("/profile/:id", bearerAuth, getUserProfile);
router.put("/profile/:id", uploadUserImg, bearerAuth, updateUserProfile);

router.get("/userActiveItems/:id", bearerAuth, userActiveItems);
router.get("/userStandByItems/:id", bearerAuth, userStandByItems);
router.get("/userSoldItems/:id", bearerAuth, userSoldItems);
router.get("/userWonItems/:id", bearerAuth, userWonItems);
router.get("/userEngagedItems/:id", bearerAuth, userEngagedItems);

Keys:
userName
fullName
email
password
confirmed
phoneNumber
gender
birthDate
image
status
token
role
capabilities
