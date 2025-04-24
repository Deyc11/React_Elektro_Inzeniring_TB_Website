// KoledarPage.jsx – Firestore z vizualnim označevanjem dni z dogodki
import React, { useState, useEffect } from "react";
import "../styles/Koledar.css";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

const months = [
  "Januar", "Februar", "Marec", "April", "Maj", "Junij",
  "Julij", "Avgust", "September", "Oktober", "November", "December"
];

const customWeekdays = {
  Mon: "PON", Tue: "TOR", Wed: "SRE", Thu: "ČET",
  Fri: "PET", Sat: "SOB", Sun: "NED"
};

const Koledar = () => {
  const today = new Date();
  const [activeDay, setActiveDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [dayEvents, setDayEvents] = useState([]);
  const [isAddEventActive, setIsAddEventActive] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", timeFrom: "", timeTo: "" });
  const [daysWithEvents, setDaysWithEvents] = useState([]);

  const docId = `${year}-${String(month + 1).padStart(2, '0')}-${String(activeDay).padStart(2, '0')}`;

  const fetchDayEvents = async () => {
    const docRef = doc(db, "events", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDayEvents(docSnap.data().events);
    } else {
      setDayEvents([]);
    }
  };

  const fetchMonthEventDays = async () => {
    const q = query(collection(db, "events"), where("month", "==", month + 1), where("year", "==", year));
    const querySnapshot = await getDocs(q);
    const days = [];
    querySnapshot.forEach((doc) => {
      days.push(doc.data().day);
    });
    setDaysWithEvents(days);
  };

  useEffect(() => {
    fetchDayEvents();
    fetchMonthEventDays();
  }, [year, month, activeDay]);

  const handleDayClick = (day) => {
    setActiveDay(day);
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prev => prev + 1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  const toggleAddEvent = () => {
    setIsAddEventActive(!isAddEventActive);
  };

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.timeFrom || !newEvent.timeTo) {
      alert("Prosim, izpolnite vsa polja.");
      return;
    }
    const timeFrom = formatTime(newEvent.timeFrom);
    const timeTo = formatTime(newEvent.timeTo);

    const docRef = doc(db, "events", docId);
    const docSnap = await getDoc(docRef);

    let newEvents = [{ title: newEvent.title, time: `${timeFrom} - ${timeTo}` }];

    if (docSnap.exists()) {
      newEvents = [...docSnap.data().events, ...newEvents];
    }

    await setDoc(docRef, {
      day: activeDay,
      month: month + 1,
      year,
      events: newEvents
    });

    setDayEvents(newEvents);
    setNewEvent({ title: "", timeFrom: "", timeTo: "" });
    setIsAddEventActive(false);
    fetchMonthEventDays(); // osveži vizualno označene dneve
  };

  const handleEventComplete = async (index) => {
    const docRef = doc(db, "events", docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;

    const updatedEvents = [...docSnap.data().events];
    updatedEvents.splice(index, 1);

    if (updatedEvents.length === 0) {
      await deleteDoc(docRef);
    } else {
      await updateDoc(docRef, { events: updatedEvents });
    }

    setDayEvents(updatedEvents);
    fetchMonthEventDays(); // osveži vizualno označene dneve
  };

  const formatTime = (time) => {
    let formattedTime = time.replace(/[^0-9:]/g, "");
    if (formattedTime.length === 2 && !formattedTime.includes(":")) formattedTime += ":";
    if (formattedTime.length > 5) formattedTime = formattedTime.slice(0, 5);
    return formattedTime;
  };

  const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;
    let days = [];

    for (let x = day; x > 0; x--) {
      days.push(<div key={`prev-${x}`} className="day prev-date">{prevDays - x + 1}</div>);
    }

    for (let i = 1; i <= lastDate; i++) {
      const isToday =
        i === today.getDate() &&
        year === today.getFullYear() &&
        month === today.getMonth();
      const isActive = i === activeDay;
      const hasEvent = daysWithEvents.includes(i);

      days.push(
        <div
          key={`current-${i}`}
          className={`day ${isToday ? "today" : ""} ${isActive ? "active" : ""} ${hasEvent ? "event" : ""}`}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </div>
      );
    }

    for (let j = 1; j <= nextDays; j++) {
      days.push(<div key={`next-${j}`} className="day next-date">{j}</div>);
    }

    return days;
  };

  return (
    <div className="koledar-page">
      <div className="container">
        <div className="calendar">
          <div className="month">
            <i className="fas fa-angle-left prev" onClick={prevMonth}></i>
            <div className="date">{months[month]} {year}</div>
            <i className="fas fa-angle-right next" onClick={nextMonth}></i>
          </div>
          <div className="weekdays">
            {"Ned Pon Tor Sre Čet Pet Sob".split(" ").map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          <div className="days">{initCalendar()}</div>
        </div>

        <div className="right">
          <div className="today-date">
            <div className="event-day">
              {customWeekdays[
                new Date(year, month, activeDay).toLocaleDateString("en-US", { weekday: "short" })
              ]}
            </div>
            <div className="event-date">
              {activeDay} {months[month]} {year}
            </div>
          </div>

          <div className="events">
            {dayEvents.map((event, index) => (
              <div key={index} className="event" onClick={() => handleEventComplete(index)}>
                <div className="title">
                  <i className="fas fa-circle"></i>
                  <h3 className="event-title">{event.title}</h3>
                </div>
                <div className="event-time">
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
            {dayEvents.length === 0 && (
              <div className="no-event">
                <h3>Ni dogodkov</h3>
              </div>
            )}
          </div>

          <div className={`add-event-wrapper ${isAddEventActive ? "active" : ""}`}>
            <div className="add-event-header">
              <div className="title">Dodaj Dogodek</div>
              <i className="fas fa-times close" onClick={toggleAddEvent}></i>
            </div>
            <div className="add-event-body">
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Ime Dogodka"
                  className="event-name"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Čas Dogodka Od"
                  className="event-time-from"
                  value={newEvent.timeFrom}
                  onChange={(e) => setNewEvent({ ...newEvent, timeFrom: formatTime(e.target.value) })}
                />
              </div>
              <div className="add-event-input">
                <input
                  type="text"
                  placeholder="Čas Dogodka Do"
                  className="event-time-to"
                  value={newEvent.timeTo}
                  onChange={(e) => setNewEvent({ ...newEvent, timeTo: formatTime(e.target.value) })}
                />
              </div>
            </div>
            <div className="add-event-footer">
              <button className="add-event-btn" onClick={handleAddEvent}>Dodaj</button>
            </div>
          </div>
          <button className="add-event" onClick={toggleAddEvent}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Koledar;
