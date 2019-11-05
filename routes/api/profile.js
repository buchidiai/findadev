const express = require('express');
const router = express.Router();
const passport = require('passport')
const mongoose = require('mongoose')


const { validateProfile } = require('../../helper/validation')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route 			GET api/profile
// @description		GET current user profile
// @access 			private


router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const errors = {};
	//destructure id from passwport which is in req.body
	const { id } = req.user
	try {
		//check if user data exists to return profile data *including name & avatar
		const profileData = await Profile.findOne({ user: id }).populate('user', ['name', 'avatar']);

		if (!profileData) {
			//if not data, add error to error object and send to client
			errors.profile = 'There is no profile for this user';
			return res.status(404).json(errors)
		}
		//send profile data to client
		res.json(profileData)
	} catch (error) {
		res.status(404).json(error)
	}

})





// @route 			GET api/profile/all
// @description		GET all profiles
// @access 			Public

router.get('/all', async (req, res) => {
	const errors = {};

	try {
		//retrieve all profile information
		const allProfiles = await Profile.find().populate('user', ['name', 'avatar'])

		if (!allProfiles) {
			//no profile information return error
			errors.profile = 'There are no profiles'
			return res.status(404).json(errors)
		}

		//send profile data to client
		res.json(allProfiles)
	} catch (error) {
		errors.profile = 'There are no profiles'
		res.status(404).json(errors)
	}

})









// @route 			GET api/profile/handle/:handle
// @description		GET profile by handle
// @access 			Public

router.get('/handle/:handle', async (req, res) => {
	const errors = {};
	const { handle } = req.params

	try {
		//retrieve profile information
		const getProfile = await Profile.findOne({ handle: handle }).populate('user', ['name', 'avatar'])

		if (!getProfile) {
			//no profile information return error
			errors.profile = 'There is no profile for this user'
			return res.status(404).json(errors)
		}

		//send profile data to client
		res.json(getProfile)
	} catch (error) {
		res.status(404).json(error)
	}

})




// @route 			GET api/profile/user/:user_id
// @description		GET profile by handle
// @access 			Public

router.get('/user/:user_id', async (req, res) => {
	const errors = {};
	const { user_id } = req.params

	try {
		//retrieve profile information
		const getUser = await Profile.findOne({ user: user_id }).populate('user', ['name', 'avatar'])

		if (!getUser) {
			//no profile information return error
			errors.profile = 'There is no profile for this user'
			return res.status(404).json(errors)
		}

		//send profile data to client
		res.json(getUser)
	} catch (error) {
		errors.profile = 'No profile was found for this user'
		res.status(404).json(error)
	}

})


// @route 			Post api/profile
// @description		Create or Edit user profile
// @access 			private

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	//empty object for user profile
	const userProfile = {};
	const { id } = req.user
	//validate request
	const { errors, isValid } = validateProfile(req.body)

	//destructing object being sent via POST by client to create profile
	const { handle, company, website, location, bio, status, githubusername, skills, facebook, twitter, instagram, youtube, linkedin } = req.body



	//if req is not valid send status 400
	if (!isValid) {
		return res.status(400).json(errors)
	}



	//append to userprofile object
	userProfile.user = id
	if (handle) userProfile.handle = handle;
	if (company) userProfile.company = company;
	if (website) userProfile.website = website;
	if (location) userProfile.location = location;
	if (bio) userProfile.bio = bio;
	if (status) userProfile.status = status;
	if (githubusername) userProfile.githubusername = githubusername;

	//skills - split into array because data will come in with csv format
	if (typeof skills !== 'undefined') {
		userProfile.skills = skills.split(',')

	};

	//social - initialize object before assignment
	userProfile.social = {};

	if (youtube) userProfile.social.youtube = youtube;
	if (twitter) userProfile.social.twitter = twitter;
	if (facebook) userProfile.social.facebook = facebook;
	if (linkedin) userProfile.social.linkedin = linkedin;
	if (instagram) userProfile.social.instagram = instagram;

	try {
		//check if profile exists by id
		const existingProfile = await Profile.findOne({ user: id });

		if (existingProfile) {
			//update existing profile information with data being sent
			const updateExistingProfile = await Profile.findOneAndUpdate({ user: id }, { $set: userProfile }, { new: true });

			//if update is successfull sent resoponse to client
			if (updateExistingProfile) res.json(existingProfile)

		} else {
			//create profile if existing profile not found

			const createProfile = await Profile.findOne({ handle: userProfile.handle })

			//send error if profile handle exits
			if (createProfile) {
				errors.profile = 'That handle already exisits'
				res.status(400).json(errors)
			}

			//save profile to database
			const saveProfile = await new Profile(userProfile).save()
			if (saveProfile) res.json(saveProfile)
		}



	} catch (error) {
		res.status(404).json(error)
	}

})













module.exports = router;
