import React, { Component } from "react";
import type { EntryCardProps } from "./interfaces";
import EntryCard from "./EntryCard";

interface DictionaryProps {
  entryCardsList: string[][];
}

interface DictionaryState {
  dictEntryCards: EntryCardProps[];
}

class Dictionary extends Component<DictionaryProps, DictionaryState> {
  constructor(props: DictionaryProps) {
    super(props);
    this.state = {
      dictEntryCards: props.entryCardsList.map((el, i) => {
        return {
          disabled: false,
          definition: el[0],
          meaning: el[1],
          id: i,
          entryClickHandler: this.entryClickHandler.bind(this),
        };
      }),
    };
  }

  entryClickHandler(isDisabled: boolean, id: number): void {
    const newEntryCardsData = this.state.dictEntryCards.map((el) => {
      if (el.id === id) {
        el.disabled = isDisabled;
        return el;
      }

      return el;
    });

    this.setState({
      dictEntryCards: newEntryCardsData,
    });
  };

  render() {
    const cardsCompList = this.state.dictEntryCards.map((el) => {
      return (
        <EntryCard
          disabled={el.disabled}
          definition={el.definition}
          meaning={el.meaning}
          entryClickHandler={el.entryClickHandler}
          id={el.id}
          key={el.id}
        />
      );
    });

    return cardsCompList;
  }
}

export default Dictionary;
