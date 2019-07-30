
export default class CTSClient {

  /**
   * CTS client Constructor
   *
   * @param {string} API key
   * @param {number} [n="10000"] Fetch Timeout
   * @return {CTSClient} Client Object
   *
   * @example
   *
   *     new CTSClient('my_client_key')
   */
  constructor(key, timeout_delay) {
    if (typeof key != 'string' || !key) {
      return this;
    }

    this.key = key;
    this.api_headers = null;
    this.timeout_delay = (typeof timeout_delay === 'number' && timeout_delay > 0) ? timeout_delay : 10000;

    this.setHeader();

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
  getUtf8ToBase64(string) {
    return window.btoa(unescape(encodeURIComponent(string)));
  }

  /**
   * Init HTTP header
   *
   * @private
   */
  setHeader() {
    this.api_headers = new Headers();
    this.api_headers.set('Authorization', `Basic ${this.getUtf8ToBase64(this.key)}`);
    this.api_headers.append('Content-Type', 'application/json');
  }

  /**
   * Call API
   *
   * @private
   */
  async request(request, params) {
    if (!this.api_headers) {
      return Promise.reject(Error(`API key missing`));
    }

    if (typeof request !== 'string' || !request) {
      return Promise.reject(Error(`Request missing`));
    }

    params = (Array.isArray(params) && params.length) ? params : [];

    if (params.length) {
      let request_params = [];

      for (var i = 0; i < params.length; i++) {
        let key = Object.keys(params[i])[0];

        if (typeof key === 'string' && params[i][key]) {
          let value = params[i][key];

          request_params.push(`${key}=${encodeURIComponent(value)}`);
        }
      }

      request = `${request}?${request_params.join('&')}`;
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout`))
      }, this.timeout_delay)
      fetch(request, {
        method: 'get',
        headers: this.api_headers,
        mode: 'cors',
        redirect: 'follow',
      }).then(resolve, reject)
    })
    .then(response => {
      if (response.status != 200) {
        return Promise.reject(Error(`API connexion fail`));
      }

      return response.json().catch(error => {
        return Promise.reject(Error(`JSON invalid: ${error.message}`));
      });
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      return Promise.reject(Error(error));
    });
  }

  /**
   * Get Estimated Timetable
   *
   * @param {string} [n] vehicle_mode
   * @param {string} [n] line_ref
   * @param {number} [n] direction_ref
   * @return {object} Results
   *
   * @example
   *
   *     my_client.estimatedTimetable()
   */
  async estimatedTimetable(vehicle_mode, line_ref, direction_ref) {

    let params = [];

    if (typeof vehicle_mode === 'string') {
      params.push({VehicleMode: vehicle_mode});
    }

    if (typeof line_ref === 'string') {
      params.push({LineRef: line_ref});
    }

    if (typeof direction_ref === 'number') {
      params.push({DirectionRef: direction_ref});
    }

   return this.request('https://api.cts-strasbourg.eu/v1/siri/2.0/estimated-timetable', params)
     .then(data => {
       return data.ServiceDelivery.EstimatedTimetableDelivery;
     })
     .catch(error => {
       return Promise.reject(Error(error));
     });
  }

  /**
   * Get Lines Discovery
   *
   * @return {object} Results
   *
   * @example
   *
   *     my_client.linesDiscovery()
   */
  async linesDiscovery() {
   return this.request('https://api.cts-strasbourg.eu/v1/siri/2.0/lines-discovery')
     .then(data => {
       return data.LinesDelivery.AnnotatedLineRef;
     })
     .catch(error => {
       return Promise.reject(Error(error));
     });
  }

  /**
   * Get Stop Monitoring
   *
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
  async stopMonitoring(monitoring_ref, vehicule_mode, preview_interval, start_time, line_ref, direction_ref, maximum_stop_visits, minimum_stop_visits_per_line) {
   if (typeof monitoring_ref !== 'string' || !monitoring_ref) {
     return Promise.reject(Error(`Settings missing`));
   }

   let params = [
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

   return this.request('https://api.cts-strasbourg.eu/v1/siri/2.0/stop-monitoring', params)
     .then(data => {
       let list = [];

       if (!Array.isArray(data.ServiceDelivery.StopMonitoringDelivery)) {
         return list;
       }

       for (var delivery_i = 0; delivery_i < data.ServiceDelivery.StopMonitoringDelivery.length; delivery_i++) {
         if (!Array.isArray(data.ServiceDelivery.StopMonitoringDelivery[delivery_i].MonitoredStopVisit)) {
           continue;
         }

         for (var stop_i = 0; stop_i < data.ServiceDelivery.StopMonitoringDelivery[delivery_i].MonitoredStopVisit.length; stop_i++) {
           list.push(data.ServiceDelivery.StopMonitoringDelivery[delivery_i].MonitoredStopVisit[stop_i].MonitoredVehicleJourney);
         }
       }

       return list;
     })
     .catch(error => {
       return Promise.reject(Error(error));
     });
  }

  /**
   * Get Stop Points Discovery
   * @param {number} [n] latitude
   * @param {number} [n] longitude
   * @param {number} [n] distance
   * @return {object} Results
   *
   * @example
   *
   *     my_client.stopPointsDiscovery()
   */
  async stopPointsDiscovery(latitude, longitude, distance) {

    let params = [];

    if (typeof latitude === 'number') {
      params.push({latitude: latitude});
    }

    if (typeof longitude === 'number') {
      params.push({longitude: longitude});
    }

    if (typeof distance === 'number') {
      params.push({distance: distance});
    }

   return this.request('https://api.cts-strasbourg.eu/v1/siri/2.0/stoppoints-discovery', params)
     .then(data => {
       return data.StopPointsDelivery.AnnotatedStopPointRef;
     })
     .catch(error => {
       return Promise.reject(Error(error));
     });
  }
}
