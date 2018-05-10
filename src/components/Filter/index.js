import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './styles.css';

class Filter extends Component {
  constructor() {
    super();
    this.updateFilter = this.updateFilter.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  changeFilter(event) {
    this.props.store.changeFilter(event.target.value);
  }

  updateFilter(event) {
    const { name, value } = event.target;
    this.props.store.updateFilter(name, value);
  }

  renderFilter() {
    let element;
    const { filterType, filter, filter2 } = this.props.store;
    switch(filterType) { // eslint-disable-line default-case
      case "name":
        element = <input
          type="text"
          name="filter"
          value={filter}
          onChange={this.updateFilter}
        />;
        break;
      case "height":
      case "weight":
      case "base_experience":
        element = <div className="filter-container">
          <label className="filter-input-label">
            <span className="filter-input-label-text">From</span>
            <input
              type="number"
              name="filter"
              value={filter}
              onChange={this.updateFilter}
            />
          </label>
          <label className="filter-input-label">
            <span className="filter-input-label-text">To</span>
            <input
              type="number"
              name="filter2"
              value={filter2}
              onChange={this.updateFilter}
            />
          </label>
        </div>
    }
    return <div>
      {element}
    </div>
  }

  render() {
    const { filterType } = this.props.store;
    return (
      <div id="filter-container">
        <div id="filter-label">Filter:</div>
        <select id="filter-type-select" onChange={this.changeFilter} value={filterType}>
          <option value="name">Name</option>
          <option value="height">Height</option>
          <option value="weight">Weight</option>
          <option value="base_experience">Base Experience</option>
        </select>
        {this.renderFilter()}
      </div>
    );
  }

}

Filter.propTypes = {
  store: PropTypes.shape({
    filterType: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    filter2: PropTypes.string.isRequired,
    changeFilter: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired
  })
}

export default inject('store')(observer(Filter));
