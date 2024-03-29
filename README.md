# CTS Client

Javascript client for CTS API (Compagnie des transports strasbourgeois). For more informations go to [CTS Portail Open Data](https://www.cts-strasbourg.eu/fr/portail-open-data/) and [API service](https://api.cts-strasbourg.eu/index.html)

## Installation

```console
npm install cts-client
```

or

```html
<script src="https://cdn.jsdelivr.net/gh/w-jerome/cts-client/dist/cts-client.min.js"></script>
```

## Usage

```javascript
import CTSClient from 'cts-client';

const cts_client = new CTSClient('my_api_key:');
```

**API key information**

The API key generated by the CTS portal looks something like this: `my-api-key`. But to use the Javascript client you need to add a colon at the end of the string, which makes `my-api-key:`

**Request timeout**

```javascript
const cts_client = new CTSClient('my_api_key:', 10000); // default: 10000ms
```

## Methods

Siri (tram and bus)
- [Estimated Timetable](#estimated-timetable)
- [Lines Discovery](#lines-discovery)
- [Stop Monitoring](#stop-monitoring)
- [Stop Points Discovery](#stop-points-discovery)

CTS
- [Park and Ride](#park-and-ride)
- [Retail Outlet](#retail-outlet)
- [Retail Outlet Types](#retail-outlet-types)
- [Veloparc](#veloparc)

Velhop
- [Velhop](#velhop)

### Estimated Timetable

Estimated Timetable service is used to inform interested schedule information systems of the current status of all known VEHICLE JOURNEYs. All VEHICLE JOURNEYs currently running and all those that start in the hour are returned.

```javascript
// ES6
cts_client.estimatedTimetable()
.then(estimated_timetables => {
  console.log(estimated_timetables);
})
.catch(error => {
  console.error(error);
});

cts_client.estimatedTimetable(vehicle_mode, line_ref, direction_ref);

// ES5
cts_client.estimatedTimetable(function(estimated_timetables, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(estimated_timetables);
});

cts_client.estimatedTimetable(function() {}, vehicle_mode, line_ref, direction_ref);
```

**Properties:**

| Property        | Type     | Require |
| :-------------- | :------- | :------ |
| `vehicle_mode`  | `string` | `false` |
| `line_ref`      | `string` | `false` |
| `direction_ref` | `string` | `false` |

### Lines Discovery

Returns a list of all lines.

```javascript
// ES6
cts_client.linesDiscovery()
.then(lines => {
  console.log(lines);
})
.catch(error => {
  console.error(error);
});

// ES5
cts_client.linesDiscovery(function(lines, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(lines);
});
```

### Stop Monitoring

Stop Monitoring service provides a stop-centric view of VEHICLE departures (in realtime) at a list of designated stops.

```javascript
// ES6
cts_client.stopMonitoring('233A')
.then(stop_monitoring => {
  console.log(stop_monitoring);
})
.catch(error => {
  console.error(error);
});

cts_client.stopMonitoring(monitoring_ref, vehicule_mode, preview_interval, start_time, line_ref, direction_ref, maximum_stop_visits, minimum_stop_visits_per_line);

// ES5
cts_client.stopMonitoring(function(stop_monitoring, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(stop_monitoring);
}, '233A');

cts_client.stopMonitoring(function() {}, monitoring_ref, vehicule_mode, preview_interval, start_time, line_ref, direction_ref, maximum_stop_visits, minimum_stop_visits_per_line);
```

**Properties:**

| Property                       | Type     | Require |
| :----------------------------- | :------- | :------ |
| `monitoring_ref`               | `string` | `true`  |
| `vehicule_mode`                | `string` | `false` |
| `preview_interval`             | `string` | `false` |
| `start_time`                   | `string` | `false` |
| `line_ref`                     | `string` | `false` |
| `direction_ref`                | `number` | `false` |
| `maximum_stop_visits`          | `number` | `false` |
| `minimum_stop_visits_per_line` | `number` | `false` |

### Stop Points Discovery

Returns a list of stop points.

```javascript
// ES6
cts_client.stopPointsDiscovery()
.then(stop_points => {
  console.log(stop_points);
})
.catch(error => {
  console.error(error);
});

cts_client.stopPointsDiscovery(latitude, longitude, distance);

// ES5
cts_client.stopPointsDiscovery(function(stop_points, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(stop_points);
});

cts_client.stopPointsDiscovery(function() {}, latitude, longitude, distance);
```

**Properties:**

| Property    | Type     | Require |
| :---------- | :------- | :------ |
| `latitude`  | `number` | `false` |
| `longitude` | `number` | `false` |
| `distance`  | `number` | `false` |

### Park and Ride

Returns a list of park and ride with available spots

```javascript
// ES6
cts_client.parkAndRide()
.then(parks => {
  console.log(parks);
})
.catch(error => {
  console.error(error);
});

// ES5
cts_client.parkAndRide(function(parks, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(parks);
});
```

### Retail Outlet

Returns a list of retail outlet

```javascript
// ES6
cts_client.retailOutlet()
.then(retails => {
  console.log(retails);
})
.catch(error => {
  console.error(error);
});

cts_client.retailOutlet(ticket_sales, badgeo_top_up, types, latitude, longitude, distance);

// ES5
cts_client.retailOutlet(function(retails, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(retails);
});

cts_client.retailOutlet(function() {}, ticket_sales, badgeo_top_up, types, latitude, longitude, distance);
```

**Properties:**

| Property        | Type      | Require |
| :-------------- | :-------  | :------ |
| `ticket_sales`  | `boolean` | `false` |
| `badgeo_top_up` | `boolean` | `false` |
| `types`         | `string`  | `false` |
| `latitude`      | `number`  | `false` |
| `longitude`     | `number`  | `false` |
| `distance`      | `number`  | `false` |

### Retail Outlet Types

Returns a list of retail outlet types.

```javascript
// ES6
cts_client.retailOutletTypes()
.then(retails_types => {
  console.log(retails_types);
})
.catch(error => {
  console.error(error);
});

// ES5
cts_client.retailOutletTypes(function(retails_types, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(retails_types);
});
```

### Veloparc

Returns a list of veloparc.

```javascript
// ES6
cts_client.veloparc()
.then(velo_parcs => {
  console.log(velo_parcs);
})
.catch(error => {
  console.error(error);
});

// ES5
cts_client.veloparc(function(velo_parcs, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(velo_parcs);
});
```

### Velhop

Returns a list of velhop automatic stations and stores.

```javascript
// ES6
cts_client.velhop()
.then(velhops => {
  console.log(velhops);
})
.catch(error => {
  console.error(error);
});

// ES5
cts_client.velhop(function(velhops, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(velhops);
});
```

## Version update

| CTS Client | REST API |
| :--------- | :------- |
| `2.0`      | `1.0`    |
| `1.0`      | `1.0`    |

## License

MIT, see [LICENSE](https://github.com/w-jerome/cts-client/blob/master/LICENSE) for details.
