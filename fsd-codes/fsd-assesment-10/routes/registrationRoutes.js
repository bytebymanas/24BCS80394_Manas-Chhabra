const express = require('express');
const mongoose = require('mongoose');
const Registration = require('../models/registration');

const router = express.Router();

function getFinalAmount(price, code) {
    if (!code) return price;

    if (code === 'CAMPUS50') return price * 0.5;
    if (code === 'EARLYBIRD') return Math.max(price - 100, 0);

    return null;
}

router.post('/registrations', async function (req, res) {
    try {
        const registrationInfo = req.body;
        let discountCode = registrationInfo.discountCode;

        if (discountCode) {
            discountCode = discountCode.toUpperCase().trim();

            if (discountCode !== 'CAMPUS50' && discountCode !== 'EARLYBIRD') {
                return res.status(400).json({ success: false, message: 'Invalid discount code' });
            }
        }

        registrationInfo.finalAmount = getFinalAmount(registrationInfo.ticketPrice, discountCode);

        const registration = new Registration(registrationInfo);
        const savedRegistration = await registration.save();

        res.status(201).json({ success: true, message: 'Registration successful', data: savedRegistration });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: 'This email is already registered for the event' });
        }

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(function (item) {
                return item.message;
            });

            return res.status(400).json({ success: false, errors: errors });
        }

        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/registrations', async function (req, res) {
    try {
        const filter = {};

        if (req.query.eventType) filter.eventType = req.query.eventType;
        if (req.query.status) filter.status = req.query.status;

        const registrations = await Registration.find(filter);
        res.status(200).json({ success: true, data: registrations });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/registrations/:id', async function (req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid registration ID format' });
        }

        const registration = await Registration.findById(id);

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        res.status(200).json({ success: true, data: registration });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.put('/registrations/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const registrationInfo = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid registration ID format' });
        }

        if (registrationInfo.discountCode) {
            registrationInfo.discountCode = registrationInfo.discountCode.toUpperCase().trim();

            if (registrationInfo.discountCode !== 'CAMPUS50' && registrationInfo.discountCode !== 'EARLYBIRD') {
                return res.status(400).json({ success: false, message: 'Invalid discount code' });
            }
        }

        const oldRegistration = await Registration.findById(id);

        if (!oldRegistration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        const eventType = registrationInfo.eventType || oldRegistration.eventType;
        const teamSize = registrationInfo.teamSize === undefined ? oldRegistration.teamSize : registrationInfo.teamSize;

        if (eventType === 'AI_WORKSHOP' && teamSize !== 1) {
            return res.status(400).json({ success: false, errors: ['AI Workshop only permits individual registrations'] });
        }

        const price = registrationInfo.ticketPrice === undefined ? oldRegistration.ticketPrice : registrationInfo.ticketPrice;
        let code = oldRegistration.discountCode || null;

        if (registrationInfo.discountCode !== undefined) {
            code = registrationInfo.discountCode || null;
        }

        registrationInfo.finalAmount = getFinalAmount(price, code);

        const updatedRegistration = await Registration.findByIdAndUpdate(id, registrationInfo, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, message: 'Registration updated', data: updatedRegistration });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: 'This email is already registered for the event' });
        }

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(function (item) {
                return item.message;
            });

            return res.status(400).json({ success: false, errors: errors });
        }

        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/registrations/:id', async function (req, res) {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid registration ID format' });
        }

        const registration = await Registration.findByIdAndDelete(id);

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        res.status(200).json({ success: true, message: 'Registration deleted', data: registration });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
