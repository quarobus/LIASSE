import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './event.module.scss';

const Event = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/pfa1/my-app/public/getApi.php")
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.log(error));
      }, []);

    const sortedData = data.sort((a, b) => b.id - a.id);

    return (
        <div className={styles.root}>
            {sortedData.map(event => (
                <div className={styles.eventDes} key={event.id}>
                    <hr className={styles.line} />
                    <div className={styles.containerDiv}>
                        <h3>{event.eventName}</h3>
                        <p>{event.description}</p>
                        <h6>{event.date}</h6>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Event;
