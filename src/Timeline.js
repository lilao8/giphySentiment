import firebase from "firebase";
import { useState, useEffect } from "react";

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const Timeline = () => {
  const [timeLine, setTimeLine] = useState([]);
  const dbRef = firebase.database().ref();
  //   dbRef.remove();
  useEffect(() => {
    dbRef.on("value", (snapshot) => {
      const myData = snapshot.val();
      const newArray = [];
      for (let propName in myData) {
        const moodObject = {
          key:propName,
          url: myData[propName].url,
          date: myData[propName].date,
          emotion: myData[propName].emotion,
          id: myData[propName].emotion,
          alt: myData[propName].alt,
        };
        newArray.push(moodObject);
        // console.log(moodObject);
      }
      setTimeLine(newArray);
    });
  },[]);

  const handleDelete=(moodToRemove)=>{
     const dbRef = firebase.database().ref();
     dbRef.child(moodToRemove).remove();
  }

  return (
    <ul className="timeline">
      {timeLine.map((mood) => {
        // console.log(mood);
        return (
          // <li key={mood.key}>
          <li key={mood.key}>
            <VerticalTimeline>
              <VerticalTimelineElement>
              <h3 className="vertical-timeline-element-title">{mood.emotion}</h3>
              <h3 className="vertical-timeline-element-title">{mood.date}</h3>
              <img src={mood.url} alt={mood.alt} className="timelineImg" />
              <button onClick={()=>{handleDelete(mood.key)}}>🗑</button>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </li>
        );
      })}
    </ul>
  );
};

export default Timeline;