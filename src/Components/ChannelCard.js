import React from 'react';
import firebase from '../Firebase';


export default function ChannelCard(props) {
    return (
        <div className="ccard-container">
            <h1>{props.Title}</h1>
            <h2>{props.Desc}</h2>
        </div>
    )
}
