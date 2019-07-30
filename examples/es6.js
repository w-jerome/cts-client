import CTSClient from 'cts-client';

const cts_client = new CTSClient('my_api_key');

// estimatedTimetable
cts_client.estimatedTimetable()
  .then(estimated_timetables => {
    console.group('estimatedTimetable');
    console.log(estimated_timetables);
    console.groupEnd();
  })
  .catch(error => {
    console.error(error);
  });

// linesDiscovery
cts_client.linesDiscovery()
  .then(lines => {
    console.group('linesDiscovery');
    console.log(lines);
    console.groupEnd();
  })
  .catch(error => {
    console.error(error);
  });

// stopMonitoring
cts_client.stopMonitoring('233A')
  .then(stop_monitoring => {
    console.group('stopMonitoring: 233A');
    console.log(stop_monitoring);
    console.groupEnd();
  })
  .catch(error => {
    console.error(error);
  });

// stopPointsDiscovery
cts_client.stopPointsDiscovery()
  .then(stop_points => {
    console.group('stopPointsDiscovery');
    console.log(stop_points);
    console.groupEnd();
  })
  .catch(error => {
    console.error(error);
  });
