const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing}= require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");//use to parse the file data

const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });//and store it in uploads folder 
//now we are saving in uploads afterwards it is going save using third party servers



//Index route and Create route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
    
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );
    
    

//New Route
router.get("/new", isLoggedIn,listingController.renderNewForm);

//Show Route ,Update Route and Delete Route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete( 
        isLoggedIn, 
        isOwner, 
        wrapAsync(listingController.destroyListing)
    );

//Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//Show Route ,Update Route and Delete Route
router.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));



module.exports = router;