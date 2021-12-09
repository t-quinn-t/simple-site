// @author Quinn Tao
// @last update on Dec 4, 2021

import React, {useEffect, useState} from 'react';
import TimelineCard from './TimelineCardComponent';
import "../style/TimelinePortfolioStyle.css";

/**
 * A Portfolio Component that renders a scrollable timeline
 * The timeline card data should be provided through props
 */
function TimelinePortfolio(props) {

    const [currScrollDepth, setCurrScrollDepth] = useState(0);

    // Bind page scroll event 
    useEffect(() => {
        window.addEventListener("scroll", handleTimelineScroll);
        return () => {
            // stub
        }
    }, []);

    function handleTimelineScroll(event) {
        console.log(window.scrollY);
    }

    return (
        <div className="timeline-container">
            <div className="linebody" style={{
                height: props.length
            }}></div>
        </div>
    );
}

export default TimelinePortfolio;