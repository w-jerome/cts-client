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

// parkAndRide
cts_client.parkAndRide()
.then(parks => {
  console.group('parkAndRide');
  console.log(parks);
  console.groupEnd();
})
.catch(error => {
  console.error(error);
});

// retailOutlet
cts_client.retailOutlet()
.then(retails => {
  console.group('retailOutlet');
  console.log(retails);
  console.groupEnd();
})
.catch(error => {
  console.error(error);
});

// retailOutletTypes
cts_client.retailOutletTypes()
.then(retails_types => {
  console.group('retailOutletTypes');
  console.log(retails_types);
  console.groupEnd();
})
.catch(error => {
  console.error(error);
});

// veloparc
cts_client.veloparc()
.then(velo_parcs => {
  console.group('veloparc');
  console.log(velo_parcs);
  console.groupEnd();
})
.catch(error => {
  console.error(error);
});

// velhop
cts_client.velhop()
.then(velhops => {
  console.group('velhop');
  console.log(velhops);
  console.groupEnd();
})
.catch(error => {
  console.error(error);
});
