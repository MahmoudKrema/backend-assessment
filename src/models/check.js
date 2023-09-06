import mongoose from 'mongoose';

// Define the check schema
const checkSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },

    interval: {
        type: Number,
        required: true,
        default: 10
    },

    timeout: {
        type: Number,
        required: true,
        default: 5
    },

    threshold: {
        type: Number,
        required: true,
        default: 1
    },

    tags: [{

        type: String,
    }],

    authentication: {
        username: {
            type: String,
        },
        password: {
            type: String,
        }
    },
    path: {
        type: String,
        required: true,
        default: "/"
    },
    ignoreSSL: {
        type: Boolean,
        required: true,
        default: false,
    },

    assert: {
        statusCode: {
            type: Number,
            default: 0
        },
    },

    httpHeaders: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },

    webhook: {
        type: String,
        default: null
    },


    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    polling: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Polling',
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Check model using the check schema
const Check = mongoose.model('Check', checkSchema);

export default Check;