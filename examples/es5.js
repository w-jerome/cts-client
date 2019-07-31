const cts_client = new CTSClient('my_api_key');

// estimatedTimetable
cts_client.estimatedTimetable(function(estimated_timetables, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.group('estimatedTimetable');
  console.log(estimated_timetables);
  console.groupEnd();
});

// linesDiscovery
cts_client.linesDiscovery(function(lines, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.group('linesDiscovery');
  console.log(lines);
  console.groupEnd();
});

// stopMonitoring
cts_client.stopMonitoring(function(stop_monitoring, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.group('stopMonitoring: 233A');
  console.log(stop_monitoring);
  console.groupEnd();
}, '233A');

// stopPointsDiscovery
cts_client.stopPointsDiscovery(function(stop_points, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.group('stopPointsDiscovery');
  console.log(stop_points);
  console.groupEnd();
});

// parkAndRide
cts_client.parkAndRide(function(parks, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.group('parkAndRide');
  console.log(parks);
  console.groupEnd();
});

// retailOutlet
cts_client.retailOutlet(function(retails, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.group('retailOutlet');
  console.log(retails);
  console.groupEnd();
});

// retailOutletTypes
cts_client.retailOutletTypes(function(retails_types, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.group('retailOutletTypes');
  console.log(retails_types);
  console.groupEnd();
});

// veloparc
cts_client.veloparc(function(velo_parcs, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.group('veloparc');
  console.log(velo_parcs);
  console.groupEnd();
});

// velhop
cts_client.velhop(function(velhops, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.group('velhop');
  console.log(velhops);
  console.groupEnd();
});
