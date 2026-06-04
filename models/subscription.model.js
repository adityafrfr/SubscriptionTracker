import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'name is required'], trim: true, minLength: 2, maxLength: 20},

    price: {
        type: Number,
        required: [true, 'price is required'],
        min: [0, 'price must be greater than 0'],
        max: [100, 'price must be smaller than 100']
    },

    currency: {
        type: String,
        enum: ['USD', 'INR', 'GBP', 'AUD'],
        default: 'USD',
        required: [true, 'No currency is specified']
    },

    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        required: [true, 'no frequency is specified']
    },

    category: {type: String, enum: ['sports', 'news', 'lifestyle']},

    paymentMethod: {type: String, required: true, trim: true},

    status: {type: String, enum: ['active', 'cancelled', 'expired'], default: 'active'},

    startDate: {
        type: Date, required: true, validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date cant be in past'
        }
    },

    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: 'renewal date cant be older than start date'
        }
    }

}, {timestamps: true})