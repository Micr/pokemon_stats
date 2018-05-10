import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Avatars from './Avatars';
import Types from './Types';
import Names from './Names';
import Weight from './Weight';
import Height from './Height';
import BaseExperience from './BaseExperience';
import './styles.css';

class Compare extends Component {

  render() {
    const { hideCompare, compare } = this.props.store;
    const [ pokemon1, pokemon2 ] = compare;
    return (
      <div id="compare-modal-container">
        <div id="compare-modal">
          <div id="compare-area">
            <table>
              <thead>
                <tr>
                  <th>First Pokemon</th>
                  <th>Comparison</th>
                  <th>Second Pokemon</th>
                </tr>
              </thead>
              <tbody>
                <Avatars pokemon1={pokemon1} pokemon2={pokemon2}/>
                <Names pokemon1={pokemon1} pokemon2={pokemon2}/>
                <Types
                  pokemon1={pokemon1}
                  pokemon2={pokemon2}
                  types="types"
                  single="type"
                />
                <Types
                  pokemon1={pokemon1}
                  pokemon2={pokemon2}
                  types="abilities"
                  single="ability"
                />
                <Height pokemon1={pokemon1} pokemon2={pokemon2}/>
                <Weight pokemon1={pokemon1} pokemon2={pokemon2}/>
                <BaseExperience pokemon1={pokemon1} pokemon2={pokemon2}/>
              </tbody>
            </table>
          </div>
          <div id="compare-close" onClick={hideCompare}>&#10006;</div>
        </div>
      </div>
    );
  }

}

Compare.propTypes = {
  store: PropTypes.shape({
    compare: PropTypes.object.isRequired,
    hideCompare: PropTypes.func.isRequired
  }).isRequired
}

export default inject('store')(observer(Compare));
