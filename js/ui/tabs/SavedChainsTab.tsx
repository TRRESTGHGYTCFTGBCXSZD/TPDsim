import { h, Component } from "preact";

export class SavedChainsTab extends Component {
  render() {
    return (
      <div id="tab-saved-chains" className="tab-content">
        <div className="box-inner-header">
          <div className="input-group">
            <input
              type="text"
              id="save-chain-name"
              placeholder="Give this chain a title"
              maxLength={128}
            />
            <button id="save-chain-save">Save</button>
          </div>
        </div>
        <ul id="saved-chains-list" className="show-on-saved-chains"></ul>
        <div className="hide-on-saved-chains">
          <p className="tab-content-message">You have no saved chains.</p>
        </div>
      </div>
    );
  }
}
