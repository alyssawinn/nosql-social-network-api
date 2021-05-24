const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: [({ length }) => length >= 1 && length <= 280]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

/* ThoughtSchema.virtual('reactionCount').get(function () {
    return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1, 0);
}) */

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;