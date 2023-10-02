import React from 'react';
import {Weekday, Date} from "../types";
import { Weekdays } from '../../configs/weekdays';

export const Calendar: React.FC<{}> = ({}) => 
{
    return (
        <div className="calendar-container">
            <div className="datepicker-container">
            </div>
            <div className="weekdays-container">
                {Weekdays.map(day => (
                    <div className="week-day">{day}</div>
                ))}
                


            </div>
            <div className="calendar">
            </div>



        </div>
        
    )
        

} 