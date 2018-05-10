import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './styles.css';

class CompareLauncher extends Component {

  constructor() {
    super();
    this.removeFromCompare = this.removeFromCompare.bind(this);
  }

  removeFromCompare(event) {
    const li = event.target.parentNode;
    const ul = li.parentNode;
    const index = Array.prototype.indexOf.call(ul.children, li);
    this.props.store.removeFromCompare(index);
  }

  render() {

    const { compare, launchCompare } = this.props.store;
    return (
      <div id="compare-launcher">
        <ul id="compare-launcher-list">
          <li className="compare-launcher-item">
            <img src={compare[0].sprites.front_default} alt={compare[0].name}/>
            <div className="compare-launcher-item-remove" onClick={this.removeFromCompare}>&#10006;</div>
          </li>
          {
            compare.length === 2 &&
            <li className="compare-launcher-item">
              <img src={compare[1].sprites.front_default} alt={compare[1].name}/>
              <div className="compare-launcher-item-remove" onClick={this.removeFromCompare}>&#10006;</div>
            </li>
          }
        </ul>
        <button onClick={launchCompare}>Compare</button>
      </div>
    );
  }

}

CompareLauncher.propTypes = {
  store: PropTypes.shape({
    compare: PropTypes.object.isRequired,
    launchCompare: PropTypes.func.isRequired
  })
}

export default inject('store')(observer(CompareLauncher));
