var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    description: {
        type: String,
        default: ''
    },
    category: {
      type: String,
      default: 'general',
    },
    notes: {
     type: String,
     default:'what',
    },
    due_date: {
      type: Date,
      default: new Date()
    },
    status: {
      type: String,
      default: 'pending',
    },
    priority: {
      type: String,
      default: 'Low'
    }
    
    
});
