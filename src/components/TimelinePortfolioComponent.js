// @author Quinn Tao
// @last update on Dec 4, 2021

import React from 'react';
import TimelineCard from './TimelineCardComponent';


/**
 * A Portfolio Component that relies on timelineData.json to render 
 */
function TimelinePortfolio(props) {
    return (
        <TimelineCard 
            title="This Website"
            brief="A simple personal static portfolio website built with React"
            tags={["ReactJS"]}
            demolink="https://ggbond.com"
        ></TimelineCard>
    );
}

export default TimelinePortfolio;