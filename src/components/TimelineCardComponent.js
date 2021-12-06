// @author Quinn Tao
// @last update on Dec 4, 2021

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "../style/TimelineCardStyle.css";

/**
 * A Card that renders details of a timeline event
 */
function TimelineCard(props) {

    const [cardToggleFlag, setCardToggleFlag] = useState(false); // false when folded;

    return(
        <div className="timeline-card-container">
            <h1 className="timeline-card-title">{props.title ? props.title : "Unamed Project"}</h1>
            {_renderTime(props.initdate, props.termdate)}
            {
                cardToggleFlag ? (
                    <div>
                        {props.brief ? <p className="timeline-card-brief">{props.brief}</p> : null}
                        {props.organization ? <p className="timeline-card-organization">{props.organization}</p> : null}
                        <hr></hr>
                        {_renderTags(props.tags)}
                        <hr></hr>
                        {_renderDescription(props.description)}
                        <hr></hr>
                        {_renderLinks(props.demolink, props.sourcelink)}
                        
                    </div>
                ) : null
            }
            <div className="timeline-card-toggler">
                <button id="toggler-btn" onClick={()=>setCardToggleFlag(!cardToggleFlag)}>{
                    cardToggleFlag ? "Show less" : "Learn more"
                }</button>
            </div>
        </div>
    );
}

// Props specification 
TimelineCard.propTypes = {
    title:          PropTypes.string,
    brief:          PropTypes.string,
    organization:   PropTypes.string, 
    initdate:       PropTypes.string,                       // Project initiation date
    termdate:       PropTypes.string,                       // Project termination date
    tags:           PropTypes.arrayOf(PropTypes.string),    // Tech tags 
    description:    PropTypes.arrayOf(PropTypes.string),    // a list of one-sentence description 
    demolink:       function(props, propname) {return _simpleHttpsVerifier(props[propname])},
    sourcelink:     function(props, propname) {return _simpleHttpsVerifier(props[propname])}
}

/* ============================= Helper Functions =============================== */

/**
 * Very simple HTTP Url checker, may be expanded later ...
 */
function _simpleHttpsVerifier(input) {
    if (input != null && !(/https:\/\/.*/.test(input))) {
        return new Error("Not a valid https URL");
    } 
}

/**
 * @returns a time widget floating on the top left corner
 */
function _renderTime(initdate, termdate) {
    return (
        <div className="timeline-card-time-container">
            <p>{initdate} to {termdate}</p>
        </div>
    )
}

/**
 * @returns description list in <li> form
 */
function _renderDescription(description) {
    return (
        <ul className="timeline-card-description-container">
            {description.map((description, index) => {
                return (
                    <li key={index}>{description}</li>
                )
            })}
        </ul>
    );
}

/**
 * @returns a list of in line styled tech tags
 */
function _renderTags(tags) {
    return (
        <div className="timeline-card-tags-row">
            {
                tags.map((tag, index) => {
                    return (
                        <p className="timeline-card-tags" key={index}>{tag}</p>
                    )
                })
            }
        </div>
    )
}

/**
 * @returns links in <a> form with specific icons
 */ 
function _renderLinks(demolink, sourcelink) {
    return (
        <div className="timeline-card-links-container">
            <div>
                <i className="fas fa-link"></i>
                <a href={demolink}>{demolink}</a>
            </div>
            <div>
                <i className="fas fa-code"></i>
                <a href={sourcelink}>{sourcelink}</a>
            </div>
        </div>
    );
}

export default TimelineCard;