import React from 'react';
import styles from './Countdown.module.css';

const Countdown = ({ questionTimer }) => (
    <h2 className={styles.timer}>{questionTimer}</h2>
)

export default Countdown;