// stress test = type of load test to determine limits of the system
  // verify the stability and reliabiltiy of the sys under extreme conditions

import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// test with last 10%
const product_id = Math.floor(Math.random() * (1000011 - 900010) + 900010);

// test options
export let options = {
  stages: [
    { duration: '15s', target: 300 },
    { duration: '15s', target: 300 },
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 1500 },
    { duration: '2m', target: 2000 },
    { duration: '2m', target: 3000 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    // 95% of requests should be below 150ms
    http_req_duration: [{ threshold: 'p(95) < 150', abortOnFail: true }],
    // http errors should be less than 1%
    http_req_failed: [{ threshold: 'rate < 0.01', abortOnFail: true }]
  }
};

const API_BASE_URL = 'http://localhost:3000';

// function that will be executed during the test
export default () => {
  http.get(`${API_BASE_URL}/db/reviews?product_id=${product_id}`)
  sleep(1);
};

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}