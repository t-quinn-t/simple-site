// @author Quinn Tao
// @last update on Dec 4, 2021

import React, {useEffect, useRef, useState} from 'react';
import TimelineCard from './TimelineCardComponent';
import "../style/TimelinePortfolioStyle.css";
import CONST from '../util';

/**
 * A Portfolio Component that renders a scrollable timeline
 * The timeline card data should be provided through props
 */
function TimelinePortfolio(props) {

    const [timelineCardPool, setTimelineCardPool] = useState([]);
    
    let upperPoolRef = useRef([]);
    let middlePoolRef = useRef([]);
    let lowerPoolRef = useRef(props.data);

    // Bind page scroll event 
    useEffect(() => {
        
        window.addEventListener("scroll", handleTimelineScroll);
        const initialTimelineDepth = CONST.PAGE_HERO_HEIGHT;
        while (lowerPoolRef.current.length > 0 && lowerPoolRef.current[0].termdate < initialTimelineDepth) {
            middlePoolRef.current.push(lowerPoolRef.current.shift());
        }
        setTimelineCardPool(middlePoolRef.current);
        return () => {
            window.removeEventListener("scroll", handleTimelineScroll);
        }
    }, []);

    function handleTimelineScroll(event) {
        
        let upperInitdate = upperPoolRef.current.length <= 0 ? 0 : upperPoolRef.current[upperPoolRef.current.length-1].initdate;
        if (upperInitdate > 0 && window.scrollY < upperInitdate) {
            // When scrolling up, append next started card;
            middlePoolRef.current.unshift(upperPoolRef.current.pop());
            setTimelineCardPool(middlePoolRef.current);
            return;
        }
        let lowerInitdate = middlePoolRef.current.length <= 0 ? 0 : middlePoolRef.current[0].initdate;
        if (lowerInitdate > 0 && window.scrollY > lowerInitdate) {
            // When scrolling down, remove unstarted card;
            upperPoolRef.current.push(middlePoolRef.current.shift());
            setTimelineCardPool(middlePoolRef.current);
            return;
        }
        let upperTermdate = middlePoolRef.current.length <= 0 ? 0 : middlePoolRef.current[middlePoolRef.current.length-1].termdate;
        if (upperTermdate > 0 && window.scrollY+CONST.PAGE_HERO_HEIGHT < upperTermdate) {
            // When scrolling up, remove finished card;
            lowerPoolRef.current.unshift(middlePoolRef.current.pop());
            setTimelineCardPool(middlePoolRef.current);
            return;
        }
        let lowerTermdate = lowerPoolRef.current.length <= 0 ? CONST.PAGE_HERO_HEIGHT : lowerPoolRef.current[0].termdate;
        if (lowerTermdate > CONST.PAGE_HERO_HEIGHT && window.scrollY+CONST.PAGE_HERO_HEIGHT > lowerTermdate) {
            // When scrolling down, append next unfinished card;
            middlePoolRef.current.push(lowerPoolRef.current.shift());
            setTimelineCardPool(middlePoolRef.current);
        }
        
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