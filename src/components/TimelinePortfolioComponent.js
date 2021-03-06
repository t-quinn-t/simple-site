// @author Quinn Tao
// @last update on Dec 12, 2021

import React, {useEffect, useRef, useState} from 'react';
import TimelineCard from './TimelineCardComponent';
import "../style/TimelinePortfolioStyle.css";
import CONST from '../util';

/**
 * A Portfolio Component that renders a scrollable timeline
 * The timeline card data should be provided through props
 */
function TimelinePortfolio(props) {
    // console.log(props.data)
    const [timelineCardPool, setTimelineCardPool] = useState([]);
    const [timelineCardClassname, setTimelineCardClassname] = useState(""); 
    let timelineCardClassnameUpdateBit = 0;
    
    let upperPoolRef = useRef([]);
    let middlePoolRef = useRef([]);
    let lowerPoolRef = useRef(props.data);
    // Bind page scroll event 
    useEffect(() => {
        window.addEventListener("scroll", handleTimelineScroll);
        const initialTimelineDepth = CONST.PAGE_HERO_HEIGHT;
        while (lowerPoolRef.current.length > 0 && lowerPoolRef.current[0].termdateDepth < initialTimelineDepth) {
            middlePoolRef.current.push(lowerPoolRef.current.shift());
        }
        setTimelineCardPool(middlePoolRef.current);
        return () => {
            window.removeEventListener("scroll", handleTimelineScroll);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function handleTimelineScroll(event) {   
        
        // Toggle between fixed/flex state 
        if (window.scrollY > CONST.PAGE_HERO_HEIGHT && timelineCardClassnameUpdateBit === 0) {
            setTimelineCardClassname("fixed");
            timelineCardClassnameUpdateBit = 1;
        } else if (window.scrollY < CONST.PAGE_HERO_HEIGHT && timelineCardClassnameUpdateBit === 1) {
            setTimelineCardClassname("");
            timelineCardClassnameUpdateBit = 0;
        }

        // Update card pool upon scrolling
        let upperInitdate = upperPoolRef.current.length <= 0 ? 0 : upperPoolRef.current[upperPoolRef.current.length-1].initdateDepth;
        if (upperInitdate > 0 && window.scrollY < upperInitdate) {
            // When scrolling up, append next started card;
            middlePoolRef.current.unshift(upperPoolRef.current.pop());
            setTimelineCardPool([...middlePoolRef.current]);
            return;
        }

        let lowerInitdate = middlePoolRef.current.length <= 0 ? 0 : middlePoolRef.current[0].initdateDepth;
        if (lowerInitdate > 0 && window.scrollY > lowerInitdate) {
            // When scrolling down, remove unstarted card;
            upperPoolRef.current.push(middlePoolRef.current.shift());
            setTimelineCardPool([...middlePoolRef.current]);
            return;
        }

        let upperTermdate = middlePoolRef.current.length <= 0 ? 0 : middlePoolRef.current[middlePoolRef.current.length-1].termdateDepth;
        if (upperTermdate > 0 && window.scrollY < upperTermdate) {
            // When scrolling up, remove finished card;
            lowerPoolRef.current.unshift(middlePoolRef.current.pop());
            setTimelineCardPool([...middlePoolRef.current]);
            return;
        }

        let lowerTermdate = lowerPoolRef.current.length <= 0 ? 0 : lowerPoolRef.current[0].termdateDepth;
        if (lowerTermdate > 0 && window.scrollY > lowerTermdate) {
            // When scrolling down, append next unfinished card;
            middlePoolRef.current.push(lowerPoolRef.current.shift());
            setTimelineCardPool([...middlePoolRef.current]);
        }
    }

    function renderCardPool(carddata, index, type) {
        if (carddata.type === type) {
            return (
                <TimelineCard key={index}
                title={carddata.title}
                brief={carddata.brief}
                initdate={carddata.initdate}
                termdate={carddata.termdate}
                description={carddata.description}
                demolink={carddata.demolink}
                sourcelink={carddata.sourcelink}
                tags={carddata.tags} />
            )
        }
        return null;
    }

    function renderLine(totalHeight) {
        const blockHeight = CONST.DATE_TO_PIXEL_MULTIPLIER * 30.5;
        let month = new Date(Date.now());
        const options = {year: "numeric", month: "short"}
        
        let blocks = [];
        let count  = 0;
        while (totalHeight > 0) {
            let monthStr = " ";
            if (count === 3) {
                monthStr = new Intl.DateTimeFormat('en-GB', options).format(month)
                count = 0;
            } 
            month = month - 1000 * 60 * 60 * 24 * 30.5;
            
            blocks.push(
                <div className='timeline-block' key={totalHeight}
                style={{"height": blockHeight}}>
                    {monthStr}
                </div>
            );
            totalHeight-= blockHeight;
            ++count;
        }
        return (
            <div className='timeline-body'>
                {blocks}
            </div>
        )
    }

    return (
        <div className="timeline-container">
            {renderLine(props.totalheight)}   
            
            <div className={'timeline-cardpool-container project ' + timelineCardClassname}>
                <h1 className='timeline-column-header'>Project</h1>
                {timelineCardPool.map((carddata, index) => renderCardPool(carddata, index, "project"))}
            </div>

            <div className={'timeline-cardpool-container work ' + timelineCardClassname}>
                <h1 className='timeline-column-header'>Work</h1>
                {timelineCardPool.map((carddata, index) => renderCardPool(carddata, index, "work"))}
            </div>
                    
        </div>
    );
}

export default TimelinePortfolio;