import React, { useState } from 'react';
import Select from 'react-select';
import { Modal } from '../'

import RangeSelect from './RangeSelect/RangeSelect';

import fetchCards from '../../api/fetchCards.js';
import data from '../../data';
import styles from './Search.module.css';

const Search = ({ setCards, setCurrentPage, searchTerm, setSearchTerm }) => {
  const [details, setDetails] = useState({ type: '', attribute: '', race: '', archetype: '', fromLevel: '', toLevel: '', fromAttack: '', toAttack: '', fromDefense: '', toDefense: '', sortBy: '', sortOrder: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { type, attribute, race, archetype, fromLevel, toLevel, fromAttack, toAttack, fromDefense, toDefense, sortBy, sortOrder} = details;
  const { select, button, container, containerContents, mainInput } = styles;
  
  const formatGroupLabel = data => (
    <div className={styles.groupStyles}>
      <span>{data.label}</span>
      <span className={styles.groupBadgeStyles}>{data.options.length}</span>
    </div>
  );


  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  const handleSubmit = async () => {
    setCards(await fetchCards({ searchTerm, ...details }));
    setCurrentPage(1);
    setIsModalOpen(false);
  }

  return (
    <>
      <Modal isModalOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <Select className={select} placeholder="Select an attribute" value={attribute} onChange={(attribute) => setDetails({...details,attribute})} options={data.attributeOptions} />
        <Select className={select} placeholder="Select a monster card type" value={type} onChange={(type) => setDetails({...details, type })} options={data.typeOptions} />
        <Select className={select} placeholder="Select a race" value={race} onChange={(race) => setDetails({...details,race})} options={data.groupedOptions} formatGroupLabel={formatGroupLabel} />
        <Select className={select} placeholder="Select an archetype" value={archetype} onChange={(archetype) => setDetails({...details,archetype})} options={data.archetypeOptions} />
        <div className={styles.range}>
          <RangeSelect className={styles.range} fromValue={fromAttack} toValue={toAttack} label="Attack" setDetails={setDetails} details={details} />
          <RangeSelect className={styles.range} fromValue={fromDefense} toValue={toDefense} label="Defense" setDetails={setDetails} details={details} />
          <RangeSelect className={styles.range} fromValue={fromLevel} toValue={toLevel} label="Level" setDetails={setDetails} details={details} />
        </div>
        <Select className={select} placeholder="Sort by" value={sortBy} onChange={(sortBy) => setDetails({...details, sortBy})} options={data.sortByOptions} />
        <Select className={select} placeholder="Sort by" value={sortOrder} onChange={(sortOrder) => setDetails({...details, sortOrder})} options={data.sortOrderOptions} />
        <button className={button} onClick={() => setIsModalOpen(false)}>Close</button>
        <button className={button} onClick={handleSubmit}>Filter</button>
      </Modal>
      <div className={container}>
        <div className={containerContents}>
          <input className={mainInput} placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={onKeyPress} />
          <button className={button} onClick={handleSubmit}>Submit</button>
          <button className={button} onClick={() => setIsModalOpen(true)}>Filters</button>
        </div>
      </div>
    </>
  )
};

export default Search;
