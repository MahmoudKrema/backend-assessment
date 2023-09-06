import mongoose from 'mongoose';

// Define the check schema
const pollingSchema = new mongoose.Schema({
    
    pollingsNumber: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    availability: {
        type: Number,
        required: true
    },
    outages: {
        type: Number,
        required: true
    },
    downtime: {
        type: Number,
        required: true
    },
    uptime: {
        type: Number,
        required: true
    },
    responseTime: {
        type: Number,
        required: true
    },
    history: [
        {
            type: Date,
            required: false
        }
    ],

    check: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Check',
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    updatedAt: {
        type: Date,
        default: Date.now
      }
});

// Create the Check model using the check schema
const Polling = mongoose.model('Polling', pollingSchema);

export default Polling;