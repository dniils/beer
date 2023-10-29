import '../styles/Search.scss';
import React, { Component } from 'react';

interface SearchComponentProps {
  onSearchTermUpdate: (searchTerm: string) => void;
}

interface SearchComponentState {
  inputValue: string;
}

class SearchComponent extends Component<
  SearchComponentProps,
  SearchComponentState
> {
  constructor(props: SearchComponentProps) {
    super(props);

    this.state = {
      inputValue: localStorage.getItem('searchTerm') || '',
    };
  }

  searchBeer = (e: React.FormEvent) => {
    e.preventDefault();
    const { onSearchTermUpdate } = this.props;
    const newSearchTerm = (e.target as HTMLFormElement).searchInput.value;
    this.setState({ inputValue: newSearchTerm });
    onSearchTermUpdate(newSearchTerm);
    localStorage.setItem('searchTerm', newSearchTerm);
  };

  render() {
    const { inputValue } = this.state;
    return (
      <form className="search" onSubmit={this.searchBeer}>
        <input
          type="text"
          name="searchInput"
          className="search__input"
          value={inputValue}
          onChange={(e) => this.setState({ inputValue: e.target.value })}
        />
        <button type="submit" className="search__button">
          🍺
        </button>
      </form>
    );
  }
}

export default SearchComponent;
