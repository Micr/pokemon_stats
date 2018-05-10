import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class CategoryTagClose extends Component {
  constructor() {
    super();
    this.removeTypeFilter = this.removeTypeFilter.bind(this)
  }

  removeTypeFilter() {
    this.props.removeTypeFilter(this.props.type);
  }

  render() {
    return (
      <div
        className="category-tag-filter-close"
        onClick={this.removeTypeFilter}
      >&#10006;</div>
    );
  }

}

CategoryTagClose.propTypes = {
  removeTypeFilter: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default CategoryTagClose;
