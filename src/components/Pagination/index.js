import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.css';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPageChange = this.onPageChange.bind(this);
    this.goFirstPage = this.goFirstPage.bind(this);
    this.goLastPage = this.goLastPage.bind(this);
    this.goPrevPage = this.goPrevPage.bind(this);
    this.goNextPage = this.goNextPage.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps === this.props) return;
    const { margin, page, perPage, total } = newProps;
    const count = Math.ceil(total / perPage);
    const startPage = page > margin ? page - margin : 1;
    const endPage = page + margin > count ? count : page + margin;
    this.setState({ startPage, endPage, count });
  }

  onPageChange(event) {
    const index =
      Array.prototype.indexOf.call(event.target.parentNode.children, event.target);
    this.props.onPageChange(index + this.state.startPage);
  }

  goFirstPage() {
    this.props.onPageChange(1);
  }

  goLastPage() {
    this.props.onPageChange(this.state.count);
  }

  goPrevPage() {
    this.props.onPageChange(this.props.page - 1);
  }

  goNextPage() {
    this.props.onPageChange(this.props.page + 1);
  }

  render() {
    const { startPage, endPage, count } = this.state;
    if (count === 0) return null;
    const { page, margin } = this.props;
    const pages = [];
    if (count === 1) return null;

    const firstPage = page - margin > 1 ?
          <div
            className={classnames({
              "pagination-button": true,
              "pagination-go-first": true,
              "pagination-ellipsis": page - margin > 2
            })}
            onClick={this.goFirstPage}
          >1</div> :
          null;

    const lastPage = page + margin < count ?
          <div
            className={classnames({
              "pagination-button": true,
              "pagination-go-last": true,
              "pagination-ellipsis": page + margin < count - 1
            })}
            onClick={this.goLastPage}
          >{count}</div> :
          null;
    const prevPage = page === 1 ? null :
          <div
            className="pagination-button pagination-prev"
            onClick={this.goPrevPage}
          >prev</div>;
    const nextPage = page === count ? null :
          <div
            className="pagination-button pagination-next"
            onClick={this.goNextPage}
          >next</div>;


    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          onClick={this.onPageChange}
          className={classnames('pagination-list-item', 'pagination-button', {
            'pagination-active': i === this.props.page
          })}
        >
          {i}
        </li>
      );
    }

    return (
      <div id="pagination-container">
        <div id="pagination">
          {prevPage}
          {firstPage}
          <ul id="pagination-list">
            {pages}
          </ul>
          {lastPage}
          {nextPage}
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  margin: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination;
