import { observable, computed, action, configure } from 'mobx';
import { apiUrl, perPageAmounts } from './config';

configure({ enforceActions: true });

const filterRange = (filterType, pokemon, valueFrom, valueTo) => {
  const value = pokemon[filterType];
  if (valueFrom && valueTo && value >= valueFrom && value <= valueTo) {
    return true;
  }
  if (valueFrom && !valueTo && value >= valueFrom) {
    return true;
  }
  if (!valueFrom && valueTo && value <= valueTo) {
    return true;
  }
  return false;
}

const filterOne = (filterType, pokemon, value) =>
  pokemon[filterType].toLowerCase().indexOf(value.toLowerCase()) !== -1;
 
class PokemonStore {

  @observable pokemons = [];
  @observable filterType = 'name';
  @observable filter = '';
  @observable filter2 = '';
  @observable total = 0;
  @observable pageLimit = perPageAmounts[0];
  @observable page = 1;
  @observable pokemonsLoading = false;
  @observable typesMap = {};
  @observable typesFilter = [];
  @observable compare = [];
  @observable compareShown = false;
  @observable networkError = '';

  @computed get loading() {
    return this.pokemonsLoading;
  }

  @computed get filteredPokemons() {
    const { typesFilter, typesMap, filterType, pokemons, filter, filter2 } = this;

    const withCategory = typesFilter.length ? pokemons.filter(
      pokemon => pokemon.types.some(typeObj => typesMap[typeObj.type.name] === true)
    ) : pokemons;

    switch(filterType) {
      case "height":
      case "weight":
      case "base_experience":
        if (!filter && !filter2) {
          return withCategory;
        }
        return withCategory.filter(pokemon => {
          return filterRange(filterType, pokemon, filter, filter2);
        });
      default:
        if (!filter) {
          return withCategory;
        }
        return withCategory.filter(pokemon => {
          return filterOne(filterType, pokemon, filter);
        });
    }
  }

  @action getPokemons() {
    this.pokemonsLoading = true;
    const offset = (this.page - 1) * this.pageLimit;
    const limit = this.pageLimit;
    return fetch(`${apiUrl}/pokemon/?offset=${offset}&limit=${limit}`).then(
      res => res.json(),
      error => this.handleNetworkError()
    )
    .then(response => this.getPokemonData(response))
  }

  @action.bound getPokemonData(response) {
    this.total = response.count;
    const reFetch = response.results
      .map(({ url }) => fetch(url).then(res => res.json()))
    Promise.all(reFetch).then(
      results => this.saveResults(results),
      () => this.handleNetworkError()
    );
  }

  @action.bound saveResults(results) {
    this.pokemonsLoading = false;
    if (results.length) {
      this.pokemons.replace(results);
    }
  }

  @action.bound handleNetworkError() {
    this.pokemonsLoading = false
    this.networkError = 'There was an error while loading data';
  }

  @action updateFilter(name, value) {
    this[name] = value;
  }

  @action changeFilter(value) {
    this.filterType = value;
    this.filter = '';
    this.filter2 = '';
  }

  @action setPage(page) {
    this.page = page;
  }

  @action setPageItemLimit(limit) {
    this.pageLimit = limit;
  }

  @action.bound addTypeFilter(type) {
    this.typesMap[type] = true;
    this.typesFilter.replace(
      Object.keys(this.typesMap).filter(key => this.typesMap[key] === true)
    )
  }

  @action.bound removeTypeFilter(type) {
    this.typesMap[type] = false;
    this.typesFilter.replace(
      Object.keys(this.typesMap).filter(key => this.typesMap[key] === true)
    )
  }

  @action.bound addToCompare(pokemon) {
    if (this.compare.length === 2) return;
    this.compare.push(pokemon);
  }

  @action.bound removeFromCompare(idx) {
    this.compare.splice(idx, 1);
  }

  @action.bound launchCompare() {
    if (this.compare.length === 1) return;
    this.compareShown = true;
  }

  @action.bound hideCompare() {
    this.compareShown = false;
  }

};

export default new PokemonStore();
