import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import { getVisited } from '../services/chartService';
import '../components/Chart.css';
import DateTimePicker from 'react-datetime-picker';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [dataChartAttractions, setDataAttractions] = useState();
  const [labelsAttractions, setLabelsAttractions] = useState();
  const [dataChartLocations, setDataLocations] = useState();
  const [labelsLocations, setLabelsLocations] = useState();
  const [dataChartMonths, setDataMonths] = useState();
  const [labelsMonths, setLabelsMonths] = useState();
  const [year] = useState(new Date().getFullYear());
  const [dataChartHours, setDataHours] = useState();
  const [labelsHours, setLabelsHours] = useState();
  const [day, setDay] = useState(new Date().toISOString().split('T')[0]);
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();

  const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const attractionsGraph = async () => {
    let app = await getVisited();
    const attractionsName = [];
    const values = [];
    for (const elem of app) {
      attractionsName.push(elem.attraction.name);
    }
    const distinctAttractionsName = attractionsName.filter(distinct);
    for (const elem of distinctAttractionsName) {
      let val = attractionsName.filter((v) => v === elem).length;
      values.push(val);
    }
    setLabelsAttractions(distinctAttractionsName);
    setDataAttractions(values);
  };

  const locationsGraph = async () => {
    let app = await getVisited();
    const attractionsLocation = [];
    const values = [];
    for (const elem of app) {
      attractionsLocation.push(elem.attraction.location);
    }
    const distinctAttractionsLocation = attractionsLocation.filter(distinct);
    for (const elem of distinctAttractionsLocation) {
      let val = attractionsLocation.filter((v) => v === elem).length;
      values.push(val);
    }
    setLabelsLocations(distinctAttractionsLocation);
    setDataLocations(values);
  };

  const monthsGraph = async (year) => {
    let app = await getVisited();
    app = app.filter(
      (elem) => Number(elem.timestamp.substring(0, 4)) === Number(year)
    );
    const months = [];
    let values = new Array(12).fill(0);
    for (const elem of app) {
      months.push(elem.timestamp.substring(5, 7));
    }
    const distinctMonths = months.filter(distinct);
    for (const elem of distinctMonths) {
      let val = months.filter((v) => v === elem).length;
      values[Number(elem) - 1] = val;
    }
    const labels = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    setLabelsMonths(labels);
    setDataMonths(values);
  };

  const hoursGraph = async (day) => {
    let app = await getVisited();
    app = app.filter((elem) => elem.timestamp.substring(0, 10) === day);
    const hours = [];
    let values = new Array(24).fill(0);
    for (const elem of app) {
      hours.push(elem.timestamp.substring(11, 13));
    }
    const distinctHours = hours.filter(distinct);
    for (const elem of distinctHours) {
      let val = hours.filter((v) => v === elem).length;
      values[Number(elem)] = val;
    }
    const labels = [];
    for (let i = 0; i < 24; i++) {
      labels.push(i);
    }
    setLabelsHours(labels);
    setDataHours(values);
  };

  useEffect(() => {
    //go to attraction if user doesn't have the Admin role
    if (localStorage.getItem('role') !== '0') {
      navigate('/attractions');
      window.location.reload();
    }

    attractionsGraph();
    locationsGraph();
    monthsGraph(year);
    hoursGraph(day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDay(date.toISOString().split('T')[0]);
  }, [date]);

  useEffect(() => {
    hoursGraph(day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  return (
    <>
      <section className="chart">
        <Chart
          chartValues={dataChartAttractions}
          labels={labelsAttractions}
          name="Attractions"
          color="orange"
        />
      </section>
      <section className="chart">
        <Chart
          chartValues={dataChartLocations}
          labels={labelsLocations}
          name="Locations"
          color="green"
        />
      </section>
      <section className="chart">
        <Chart
          chartValues={dataChartMonths}
          labels={labelsMonths}
          name="Months"
          color="aquamarine"
        />
      </section>
      <section className="picker">
        <DateTimePicker onChange={setDate} value={date} />
      </section>
      <section className="chart">
        <Chart
          chartValues={dataChartHours}
          labels={labelsHours}
          name="Hours"
          color="red"
        />
      </section>
    </>
  );
};

export default AdminPage;
