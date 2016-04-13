var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var _messages = [];
var _questionsEditState = {};
var _responsesEditState = {};
var _messagesDeleteState = {};

var MessageStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllMessages: function() {
    return _messages;
  },

  getQuestionsEditState: function() {
    return _questionsEditState;
  },

  getResponsesEditState: function() {
    return _responsesEditState;
  },

  getMessagesDeleteState: function() {
    return _responsesEditState;
  }

});

Dispatcher.register(function(action) {
  switch (action.actionType) {

    case Constants.MESSAGES_RECEIVED:
      setMessages(action.messages);
      setInitialMessagesState(action.messages);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_CREATE:

      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_TOGGLEALTERNATIVE:
      toggleMessageIsAlternative(action.message);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_DELETE:
      deleteMessage(action.objectId);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_DELETE_SUCCESS:
      deleteMessage(action.objectId);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_DELETE_FAIL:
      deleteMessage(action.objectId);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_EDIT:
      toggleMessageEditState(action.objectId, action.messageType);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_UPDATE:

      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_ALERTDELETE:
      toggleMessageDeleteState(action.objectId);
      MessageStore.emitChange();
      break;

    default:

  }
});


function setMessages(messages) {
  _messages = messages;
}

function setInitialMessagesState(messages) {
  messages.map(function (message) {
    _questionsEditState[message._id] = false;
    _responsesEditState[message._id] = false;
    _deleteMessageState[message._id] = false;
  });
}

function setMessageText(message) {

}

function createMessage(conv_id) {

}

function toggleMessageIsAlternative(message) {

}

function deleteMessage(objectId) {
  _messages.every(function(msg, index) {
    if (msg._id === objectId) {
      _messages.splice(index, 1);
      delete _questionsEditState[msg._id];
      delete _responsesEditState[msg._id];
      console.log('msg deleted');
      return false;
    } else {
      return true;
    }
  });
}

function deleteMessageSuccess(result) {
  console.log('dlt msg success, result', result);
}

function deleteMessageFail(result) {
  console.log('dlt msg fail, result', result);
}

function toggleMessageEditState(objectId, messageType) {
  _messages.every(function(msg) {
    if (msg._id === objectId) {
      if (messageType === 'question') {
          _questionsEditState[msg._id] = !_questionsEditState[msg._id];
      } else if (messageType === 'response') {
        _responsesEditState[msg._id] = !_responsesEditState[msg._id];
      }
      return false;
    } else {
      return true;
    }
  });
}

function toggleMessageDeleteState(objectId) {
  _messages.every(function(msg) {
    if (msg._id === objectId) {
      _messagesDeleteState[msg._id] = !_messagesDeleteState[msg._id];
      return false;
    } else {
      return true;
    }
  });
}

module.exports = MessageStore;
