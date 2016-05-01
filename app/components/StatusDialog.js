var React = require('react');
var PropTypes = React.PropTypes;
var Instructions = require('./Instructions');
var MessageActions = require('../actions/MessageActions');

var StatusDialog = React.createClass({
  propTypes: {
      isVisible: PropTypes.bool.isRequired,
      instructionsVisibility: PropTypes.bool.isRequired
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="instructions-container">
            <div className={this.props.instructionsVisibility ? "instructions-header" : null }>

              {this.props.instructionsVisibility
                ? <p className="instructions-text-header" onClick={this._onInstructionsToggle}>Hide Instructions
                    <span className="glyphicon glyphicon-menu-up" aria-hidden="true"></span>
                  </p>
              :  <p className="instructions-text-header"
              onClick={this._onInstructionsToggle}>Show Instructions
                  <span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                </p>}

              {this.props.isVisible
              ? <p className="instructions-text-header statusdialog-message">
              {this.props.statusDialogMessage}</p>
              : null}
            </div>

            <Instructions isVisible={this.props.instructionsVisibility} />
          </div>
        </div>
      </div>
    )
  },
  _onInstructionsToggle: function() {
    MessageActions.toggleInstructions();
  }
});

module.exports = StatusDialog;
