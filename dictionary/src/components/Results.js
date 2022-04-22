import React from 'react';
import { useState, useEffect } from 'react';
import { getDefinition } from '../utils/api';
import SearchBar from './SearchBar';

const Results = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getDefinition(searchTerm).then((definition) => {
            setResults(definition);
            setIsLoading(false);
        });
    }, [searchTerm]);

    if (isLoading === true) {
        return (
            <div>
                <SearchBar setSearchTerm={setSearchTerm} />
                <p>... loading</p>
            </div>
        )
    } else {
        return (
            <>
                <SearchBar setSearchTerm={setSearchTerm} />
                <div className='results' key='results'>
                {results.map((result) => {
                    return (
                        <div key={`${result.word}.container${Math.random()}`}>
                            <h2 key={result.word}>WORD: {result.word}</h2>
                            {(() => {
                                if (result.phonetics.findIndex((element) => element.hasOwnProperty('audio') === true) !== -1) {
                                    return (
                                        <p key={`${result.word.type}.audio`}>Audio: {result.phonetics[result.phonetics.findIndex((element) => element.hasOwnProperty('audio') === true)].audio}</p>
                                    )
                                } 
                                else if (result.phonetics.findIndex((element) => element.hasOwnProperty('audio') === true) === -1) {
                                    return (
                                        <p key={`${result.word.type}.no_audio`}>Audio: no audio here</p>
                                    )
                                }  
                            })()}
                            {(() => {
                                if (result.phonetics.findIndex((element) => element.hasOwnProperty('text') === true) !== -1) {
                                    return (
                                        <p key={`${result.word.type}.text`}>Text: {result.phonetics[result.phonetics.findIndex((element) => element.hasOwnProperty('text') === true)].text}</p>
                                    )
                                } 
                                else if (result.phonetics.findIndex((element) => element.hasOwnProperty('text') === true) === -1) {
                                    return (
                                        <h1 key={`${result.word.type}.no_text`}>Text: no text here</h1>
                                    )
                                } 
                            })()}
                            {result.meanings.map((element) => {
                                return (
                                    <div key={`${result.word}-${Math.random()}`}>
                                        <h2>Type: {`${element.partOfSpeech}`}</h2>
                                        {element.definitions.map((definition) => {
                                            if (definition.hasOwnProperty('example')) {
                                                return (
                                                    <div key={`${result.word}${String(Math.random())}`}>
                                                        <p>Definition: {definition.definition}</p>
                                                        <p>Example: {definition.example}</p>
                                                    </div>
                                                )
                                            }
                                            return (
                                                <div key={`${result.word.type}${Math.random()}`}>
                                                    <p>Definition: {definition.definition}</p>
                                                </div>
                                            )
                                        })}
                                        {(() => {
                                            if (element.synonyms.length > 0) {
                                                return (
                                                    <>
                                                        <h3>Synonyms:</h3>
                                                        {element.synonyms.map((syn) => {
                                                            return (
                                                                <div>
                                                                    <h4>{syn}</h4>
                                                                </div>
                                                            )
                                                        })}
                                                    </>
                                                )
                                            }
                                        })()}
                                        {(() => {
                                            if (element.antonyms.length > 0) {
                                                return (
                                                    <>
                                                        <h3>Antonyms:</h3>
                                                        {element.antonyms.map((ant) => {
                                                            return (
                                                                <div>
                                                                    <h4>{ant}</h4>
                                                                </div>
                                                            )
                                                        })}
                                                    </>
                                                )
                                            } 
                                        })()}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
                </div>  
            </>
        )
            
    }
    
}

export default Results;