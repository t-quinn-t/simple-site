// @author Quinn Tao
// @last update on Dec 4, 2021

import React from 'react';
import PropTypes from 'prop-types';
import "../style/TimelineCardStyle.css";

/**
 * A Card that renders details of a timeline event
 */
function TimelineCard(props) {
    return(
        <div className="timeline-card-container">
            {_renderTime(props.initdate, props.termdate)}
            <h1 className="timeline-card-title">{props.title ? props.title : "Unamed Project"}</h1>
            {props.brief ? <p className="timeline-card-brief">{props.brief}</p> : null}
            {props.organization ? <p className="timeline-card-organization">{props.organization}</p> : null}
            {_renderTags(props.tags)}
            {_renderDescription(props.description)}
            {_renderLinks(props.demolink, props.sourcelink)}
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
// Very simple HTTP Url checker, may be expanded later ...
function _simpleHttpsVerifier(input) {
    if (input != null && !(/https:\/\/.*/.test(input))) {
        return new Error("Not a valid https URL");
    } 
}

function _renderTime(initdate, termdate) {
    return (
        <div className="timeline-card-time-container">
            <p>{initdate} to {termdate}</p>
        </div>
    )
}

// @returns description list in <li> form
function _renderDescription(description) {
    return null; // stub
}

// @returns rendered tech tags in array form
function _renderTags(tags) {
    return null; // stub
}

// @returns links in <a> form with specific icons
function _renderLinks(demolink, sourcelink) {
    return null; // stub
}

export default TimelineCard;