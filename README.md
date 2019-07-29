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

const cts_client = new CTSClient('my_api_key');
```

**set request timeout**

```javascript
const cts_client = new CTSClient('my_api_key', 10000);
```

## Methods

### Estimated Timetable

```javascript
// ES6
cts_client.estimatedTimetable()
  .then(estimated_timetables => {
    console.log(estimated_timetables);
  })
  .catch(error => {
    console.error(error);
  });

// ES5
cts_client.estimatedTimetable(function(estimated_timetables, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(estimated_timetables);
});
```

**Configuration properties:**

| Property | Type | Require | Description |
|:---------|:-----|:-----|:------------|
| `vehicle_mode` | `string` | `false` | vehicle_mode |
| `line_ref` | `string` | `false` | line_ref |
| `direction_ref` | `string` | `false` | direction_ref |

**Example:**

```javascript
// ES6
cts_client.estimatedTimetable(vehicle_mode, line_ref, direction_ref)

// ES5
cts_client.estimatedTimetable(function() {}, vehicle_mode, line_ref, direction_ref)
```

### Stop Monitoring

```javascript
// ES6
cts_client.stopMonitoring('233A')
  .then(stop_monitoring => {
    console.log(stop_monitoring);
  })
  .catch(error => {
    console.error(error);
  });

// ES5
cts_client.stopMonitoring(function(stop_monitoring, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(stop_monitoring);
}, '233A');
```

**Configuration properties:**

| Property | Type | Require | Description |
|:---------|:-----|:-----|:------------|
| `monitoring_ref` | `string` | `true` | monitoring_ref |
| `vehicule_mode` | `string` | `false` | vehicule_mode |
| `preview_interval` | `string` | `false` | preview_interval |
| `start_time` | `string` | `false` | start_time |
| `line_ref` | `string` | `false` | line_ref |
| `direction_ref` | `number` | `false` | direction_ref |
| `maximum_stop_visits` | `number` | `false` | maximum_stop_visits |
| `minimum_stop_visits_per_line` | `number` | `false` | minimum_stop_visits_per_line |

**Example:**

```javascript
// ES6
cts_client.stopMonitoring(monitoring_ref, vehicule_mode, preview_interval, start_time, line_ref, direction_ref, maximum_stop_visits, minimum_stop_visits_per_line)

// ES5
cts_client.stopMonitoring(function() {}, monitoring_ref, vehicule_mode, preview_interval, start_time, line_ref, direction_ref, maximum_stop_visits, minimum_stop_visits_per_line)
```

### Stop Points Discovery

```javascript
// ES6
cts_client.stopPointsDiscovery()
  .then(stop_points => {
    console.log(stop_points);
  })
  .catch(error => {
    console.error(error);
  });

// ES5
cts_client.stopPointsDiscovery(function(stop_points, error) {
  if (error) {
    console.error(error);
    return false;
  }

  console.log(stop_points);
});
```

**Configuration properties:**

| Property | Type | Require | Description |
|:---------|:-----|:-----|:------------|
| `latitude` | `number` | `false` | latitude |
| `longitude` | `number` | `false` | longitude |
| `distance` | `number` | `false` | distance |

**Example:**

```javascript
// ES6
cts_client.stopPointsDiscovery(latitude, longitude, distance)

// ES5
cts_client.stopPointsDiscovery(function() {}, latitude, longitude, distance)
```

### Lines Discovery

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

## Version update

| CTS Client | REST API     |
|:-----------|:-------------|
| `1.0`      | `1.0`        |

## License

MIT, see [LICENSE](https://github.com/w-jerome/cts-client/blob/master/LICENSE) for details.
