import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Pagination from '../Pagination';
import Filter from '../Filter';
import PokemonTypes from '../PokemonTypes';
import CompareLauncher from '../CompareLauncher';
import Compare from '../Compare';
import MiddleBar from '../MiddleBar';
import PokemonTable from '../PokemonTable';
import './style.css';

class PokemonList extends Component {
  constructor() {
    super();
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageLimitChange = this.handlePageLimitChange.bind(this);
  }

  componentDidMount() {
    this.props.store.getPokemons();
  }

  handlePageChange(page) {
    this.props.store.setPage(page);
    this.props.store.getPokemons();
  }

  handlePageLimitChange(event) {
    this.props.store.setPageItemLimit(+event.target.value);
    this.props.store.getPokemons();
  }

  renderRefreshIndicator() {
    return <div className="refresh-container">
      <RefreshIndicator
        size={50}
        top={0}
        left={0}
        loadingColor="#FF9800"
        status="loading"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'
        }}
      />
    </div>;
  }

  render() {
    const {
      loading,
      pageLimit,
      page,
      total,
      compare,
      compareShown,
      networkError,
    } = this.props.store;
    const compareLauncher = compare.length !== 0 && <CompareLauncher />
    const compareComponent = compareShown && <Compare />
    const errorMessage =  networkError.length ?
      <div id="network-error">{networkError}</div> : null;

    return (
      <div id="pokemon-list-container">
        {errorMessage}
        {loading ? this.renderRefreshIndicator() : null}
        {compareComponent}
        <div id="pokemon-list-header">
          <Filter />
          <PokemonTypes />
        {compareLauncher}
        </div>
        <MiddleBar
          pageLimit={pageLimit}
          handlePageLimitChange={this.handlePageLimitChange}
        />
        <PokemonTable />
        <Pagination
          margin={2}
          page={page}
          total={total}
          perPage={pageLimit}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

PokemonList.propTypes = {
  store: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    pageLimit: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    compare: PropTypes.object.isRequired,
    compareShown: PropTypes.bool.isRequired,
    networkError: PropTypes.string
  })
};

export default inject('store')(observer(PokemonList));
