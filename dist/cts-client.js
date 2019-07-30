/**
 * CTS Client Constructor
 *
 * @param {string} API key
 * @param {number} [n="10000"] Fetch Timeout
 * @return {CTSClient} Client Object
 *
 * @example
 *
 *     new CTSClient('my_client_key')
 */
function CTSClient(key, timeout_delay) {
  if (typeof key != 'string' || !key) {
    return this;
  }

  this.key = key;
  this.timeout_delay = (typeof timeout_delay === 'number' && timeout_delay > 0) ? timeout_delay : 10000;

  return this;
}

/**
 * Return the base64 of string
 *
 * @private
 * @param {string} string
 * @return {string} String in base64
 *
 * @example
 *
 *     my_client.getUtf8ToBase64('my_string')
 */
CTSClient.prototype.getUtf8ToBase64 = function(string) {
  return window.btoa(unescape(encodeURIComponent(string)));
};

/**
 * Call API
 *
 * @private
 */
CTSClient.prototype.request = function(request, params, callback) {
  callback = (typeof callback === 'function') ? callback : function() {};
  if (!this.key) {
    callback(null, Error(`API key missing`));
    return this;
  }

  if (typeof request !== 'string' || !request) {
    callback(null, Error(`Request missing`));
    return this;
  }

  params = (Array.isArray(params) && params.length) ? params : [];

  if (params.length) {
    var request_params = [];

    for (var i = 0; i < params.length; i++) {
      var key = Object.keys(params[i])[0];

      if (typeof key === 'string' && params[i][key]) {
        var value = params[i][key];

        request_params.push(`${key}=${encodeURIComponent(value)}`);
      }
    }

    request = `${request}?${request_params.join('&')}`;
  }

  var http_request = new XMLHttpRequest();
  http_request.open('GET', request, true);
  http_request.overrideMimeType('application/json');
  http_request.setRequestHeader('Authorization', `Basic ${this.getUtf8ToBase64(this.key)}`);
  http_request.timeout = this.timeout_delay;

  http_request.onload = function() {
    if (this.status != 200) {
      callback(null, Error(`API connexion fail`));
      return this;
    }

    try {
      var json = JSON.parse(this.response);
      callback(json, null);
    } catch (error) {
      callback(null, Error(`JSON invalid: ${error.message}`));
    }
  };

  http_request.onerror = function() {
    callback(null, Error(`API error`));
  };

  http_request.send();
}

/**
 * Get Estimated Timetable
 *
 * @param {function} [n] callback
 * @param {string} [n] vehicle_mode
 * @param {string} [n] line_ref
 * @param {number} [n] direction_ref
 * @return {object} Results
 *
 * @example
 *
 *     my_client.estimatedTimetable()
 */
CTSClient.prototype.estimatedTimetable = function(callback, vehicle_mode, line_ref, direction_ref) {
  callback = (typeof callback === 'function') ? callback : function() {};

  var params = [];

  if (typeof vehicle_mode === 'string') {
    params.push({VehicleMode: vehicle_mode});
  }

  if (typeof line_ref === 'string') {
    params.push({LineRef: line_ref});
  }

  if (typeof direction_ref === 'number') {
    params.push({DirectionRef: direction_ref});
  }

  this.request('https://api.cts-strasbourg.eu/v1/siri/2.0/estimated-timetable', params, function(data, error) {
    if (!error && data) {
      data = data.ServiceDelivery.EstimatedTimetableDelivery;
    }

    callback(data, error);
  });
}

/**
 * Get Lines Discovery
 *
 * @param {function} [n] callback
 * @return {object} Results
 *
 * @example
 *
 *     my_client.linesDiscovery()
 */
CTSClient.prototype.linesDiscovery = function(callback) {
  callback = (typeof callback === 'function') ? callback : function() {};

  this.request('https://api.cts-strasbourg.eu/v1/siri/2.0/lines-discovery', null, function(data, error) {
    if (!error && data) {
      data = data.LinesDelivery.AnnotatedLineRef;
    }

    callback(data, error);
  });
}

/**
 * Get Stop Monitoring
 *
 * @param {function} [n] callback
 * @param {string} monitoring_ref
 * @param {string} [n] vehicule_mode
 * @param {string} [n] preview_interval
 * @param {string} [n] start_time
 * @param {string} [n] line_ref
 * @param {number} [n] direction_ref
 * @param {number} [n] maximum_stop_visits
 * @param {number} [n] minimum_stop_visits_per_line
 * @return {object} Results
 *
 * @example
 *
 *     my_client.stopMonitoring('my_monitoring_ref')
 */
CTSClient.prototype.stopMonitoring = function(callback, monitoring_ref, vehicule_mode, preview_interval, start_time, line_ref, direction_ref, maximum_stop_visits, minimum_stop_visits_per_line) {
  callback = (typeof callback === 'function') ? callback : function() {};

  if (typeof monitoring_ref !== 'string' || !monitoring_ref) {
    callback(null, Error(`Settings missing`));
    return this;
  }

  var params = [
    {
      MonitoringRef: monitoring_ref,
    },
  ];

  if (typeof vehicule_mode === 'string') {
    params.push({VehicleMode: vehicule_mode});
  }

  if (typeof preview_interval === 'string') {
    params.push({PreviewInterval: preview_interval});
  }

  if (typeof start_time === 'string') {
    params.push({StartTime: start_time});
  }

  if (typeof line_ref === 'string') {
    params.push({LineRef: line_ref});
  }

  if (typeof direction_ref === 'number') {
    params.push({DirectionRef: direction_ref});
  }

  if (typeof maximum_stop_visits === 'number') {
    params.push({MaximumStopVisits: maximum_stop_visits});
  }

  if (typeof minimum_stop_visits_per_line === 'number') {
    params.push({MinimumStopVisitsPerLine: minimum_stop_visits_per_line});
  }

  this.request('https://api.cts-strasbourg.eu/v1/siri/2.0/stop-monitoring', params, function(data, error) {
    if (!error && data) {
      var list = [];

      if (Array.isArray(data.ServiceDelivery.StopMonitoringDelivery)) {
        for (var delivery_i = 0; delivery_i < data.ServiceDelivery.StopMonitoringDelivery.length; delivery_i++) {
          if (!Array.isArray(data.ServiceDelivery.StopMonitoringDelivery[delivery_i].MonitoredStopVisit)) {
            continue;
          }

          for (var stop_i = 0; stop_i < data.ServiceDelivery.StopMonitoringDelivery[delivery_i].MonitoredStopVisit.length; stop_i++) {
            list.push(data.ServiceDelivery.StopMonitoringDelivery[delivery_i].MonitoredStopVisit[stop_i].MonitoredVehicleJourney);
          }
        }
      }

      data = list;
    }

    callback(data, error);
  });
}

/**
 * Get Stop Points Discovery
 *
 * @param {function} [n] callback
 * @param {number} [n] latitude
 * @param {number} [n] longitude
 * @param {number} [n] distance
 * @return {object} Results
 *
 * @example
 *
 *     my_client.stopPointsDiscovery()
 */
CTSClient.prototype.stopPointsDiscovery = function(callback, latitude, longitude, distance) {
  callback = (typeof callback === 'function') ? callback : function() {};

  var params = [];

  if (typeof latitude === 'number') {
    params.push({latitude: latitude});
  }

  if (typeof longitude === 'number') {
    params.push({longitude: longitude});
  }

  if (typeof distance === 'number') {
    params.push({distance: distance});
  }

  this.request('https://api.cts-strasbourg.eu/v1/siri/2.0/stoppoints-discovery', params, function(data, error) {
    if (!error && data) {
      data = data.StopPointsDelivery.AnnotatedStopPointRef;
    }

    callback(data, error);
  });
}
