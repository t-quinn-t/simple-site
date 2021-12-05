// @author Quinn Tao
// @last update on Dec 4, 2021

import React from 'react';
import PropTypes, { func } from 'prop-types';

/**
 * A Card that renders details of a timeline event
 */
function TimelineCard(props) {

}

TimelineCard.prototype = {
    title:          PropTypes.string,
    brief:          PropTypes.string,
    organization:   PropTypes.string, 
    tags:           PropTypes.arrayOf(PropTypes.string),    // Tech tags 
    description:    PropTypes.arrayOf(PropTypes.string),    // a list of one-sentence description 
    demolink:       function(props, propname) {return simpleHTTPSVerifier(props[propname])},
    sourcelink:     function(props, propname) {return simpleHTTPSVerifier(props[propname])}
}

// Very simple HTTP Url checker,
//   may be expanded later ...
function simpleHTTPSVerifier(input) {
    if (!(/https:\/\/.*/.test(input))) {
        return new Error("Not a valid https URL");
    } 
}

export default TimelineCard;